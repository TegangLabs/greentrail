package service

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/TegangLabs/greentrail/repository"
	"github.com/TegangLabs/greentrail/utils/account"
	httputil "github.com/TegangLabs/greentrail/utils/http"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/olivere/elastic/v7"
)

type UpdateWaste struct {
	Status string `json:"status,omitempty"`
}

type AddWaste struct {
	FirstName string             `json:"first_name,omitempty"`
	LastName  string             `json:"last_name,omitempty"`
	Email     string             `json:"email,omitempty"`
	Phone     string             `json:"phone,omitempty"`
	ImageURL  string             `json:"image_url,omitempty"`
	Type      []string           `json:"type,omitempty"`
	Address   repository.Address `json:"address,omitempty"`
	Metric    repository.Metric  `json:"metric,omitempty"`
}

type WasteService struct {
	citizenRepo citizenRepo
	wasteRepo   wasteRepo
}

type citizenRepo interface {
	Search(ctx context.Context, query elastic.Query) ([]*repository.Citizen, error)
	Save(ctx context.Context, citizen repository.Citizen) error
}

type wasteRepo interface {
	Get(ctx context.Context, id string) (*repository.Waste, error)
	Save(ctx context.Context, waste repository.Waste) error
	Search(ctx context.Context, query elastic.Query) ([]*repository.Waste, error)
}

func NewWasteService(citizenRepo citizenRepo, wasteRepo wasteRepo) *WasteService {
	return &WasteService{citizenRepo: citizenRepo, wasteRepo: wasteRepo}
}

func (r *WasteService) Register(group *echo.Group) {
	g := group.Group("/waste")

	g.POST("/", r.AddWaste, httputil.AuthMiddleware())
	g.GET("/", r.GetWaste, httputil.AuthMiddleware())
	g.PUT("/:id", r.UpdateWaste, httputil.AuthMiddleware())
}

func (r *WasteService) AddWaste(c echo.Context) error {
	user := c.Get("users").(httputil.CustomClaims)
	userAcc := account.ParseVolunteerAccount(user.ID)

	var req AddWaste
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	var citizen repository.Citizen

	cQuery := elastic.NewTermQuery("email", req.Email)
	existingCitizens, err := r.citizenRepo.Search(context.Background(), cQuery)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	if len(existingCitizens) == 0 {
		// Create citizen
		citizen = repository.Citizen{
			ID:        uuid.NewString(),
			FirstName: req.FirstName,
			LastName:  req.LastName,
			Email:     req.Email,
			Phone:     req.Phone,
			Address:   req.Address,
		}

		if err := r.citizenRepo.Save(context.Background(), citizen); err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		citizen = *existingCitizens[0]
	}

	now := time.Now()
	waste := repository.Waste{
		ID:        uuid.NewString(),
		Submitter: citizen.ID,
		ImageURL:  req.ImageURL,
		Address:   req.Address,
		Type:      req.Type,
		Metric:    req.Metric,
		Status: []repository.Status{
			{
				Handler:   userAcc.ID,
				Stage:     int32(userAcc.Stage),
				Status:    "Success",
				HandledOn: &now,
			},
		},
	}

	if err := r.wasteRepo.Save(context.Background(), waste); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, req)
}

func (r *WasteService) GetWaste(c echo.Context) error {
	volunteer := c.Get("users").(httputil.CustomClaims)
	volunteerAcc := account.ParseVolunteerAccount(volunteer.ID)

	query := elastic.NewBoolQuery().Must(
		elastic.NewExistsQuery("status"),
		elastic.NewNestedQuery("status", elastic.NewTermQuery("handler", volunteerAcc.ID)),
	)

	wastes, err := r.wasteRepo.Search(context.Background(), query)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, wastes)
}

func (r *WasteService) UpdateWaste(c echo.Context) error {
	volunteer := c.Get("users").(httputil.CustomClaims)
	volunteerAcc := account.ParseVolunteerAccount(volunteer.ID)

	var req UpdateWaste
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "missing waste id param",
		})
	}

	waste, err := r.wasteRepo.Get(context.Background(), id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "waste not found"})
	}

	now := time.Now()
	waste.Status = append(waste.Status, repository.Status{
		Handler:   volunteerAcc.ID,
		Stage:     int32(volunteerAcc.Stage),
		Status:    req.Status,
		HandledOn: &now,
	})

	if err := r.wasteRepo.Save(context.Background(), *waste); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, waste)
}
