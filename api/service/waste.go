package service

import (
	"context"
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

type WasteService struct {
	repo wasteRepo
}

type wasteRepo interface {
	Get(ctx context.Context, id string) (*repository.Waste, error)
	Save(ctx context.Context, waste repository.Waste) error
	Search(ctx context.Context, query elastic.Query) ([]*repository.Waste, error)
}

func NewWasteService(repo wasteRepo) *WasteService {
	return &WasteService{repo: repo}
}

func (r *WasteService) Register(group *echo.Group) {
	g := group.Group("/waste")

	g.POST("/", r.AddWaste, httputil.AuthMiddleware())
	g.GET("/", r.GetWaste, httputil.AuthMiddleware())
	g.PUT("/:id", r.UpdateWaste, httputil.AuthMiddleware())
}

func (r *WasteService) AddWaste(c echo.Context) error {
	user := c.Get("users").(httputil.CustomClaims)

	var waste repository.Waste
	if err := c.Bind(&waste); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	waste.ID = uuid.New().String()
	waste.Submitter = user.ID

	if err := r.repo.Save(context.Background(), waste); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, waste)
}

func (r *WasteService) GetWaste(c echo.Context) error {
	volunteer := c.Get("users").(httputil.CustomClaims)
	volunteerAcc := account.ParseVolunteerAccount(volunteer.ID)

	query := elastic.NewBoolQuery().Must(
		elastic.NewExistsQuery("status"),
		elastic.NewNestedQuery("status", elastic.NewTermQuery("handler", volunteerAcc.ID)),
	)

	wastes, err := r.repo.Search(context.Background(), query)
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

	waste, err := r.repo.Get(context.Background(), id)
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

	if err := r.repo.Save(context.Background(), *waste); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, waste)
}
