package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/TegangLabs/greentrail/repository"
	"github.com/TegangLabs/greentrail/utils/account"
	cryptutil "github.com/TegangLabs/greentrail/utils/crypt"
	httputil "github.com/TegangLabs/greentrail/utils/http"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type VolunteerRegister struct {
	FirstName string             `json:"first_name,omitempty"`
	LastName  string             `json:"last_name,omitempty"`
	Email     string             `json:"email,omitempty"`
	Password  string             `json:"password,omitempty"`
	Phone     string             `json:"phone,omitempty"`
	Stage     int                `json:"stage,omitempty"`
	Address   repository.Address `json:"address,omitempty"`
}

type VolunteerService struct {
	repo volunteerRepo
}

type LoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type volunteerRepo interface {
	Get(ctx context.Context, id string) (*repository.Volunteer, error)
	GetByEmail(ctx context.Context, email string) (*repository.Volunteer, error)
	Save(ctx context.Context, volunteer repository.Volunteer) error
}

func NewVolunteerService(repo volunteerRepo) *VolunteerService {
	return &VolunteerService{repo: repo}
}

func (r *VolunteerService) Register(group *echo.Group) {
	subgroup := group.Group("/volunteer")

	subgroup.POST("", r.RegisterVolunteer)
	subgroup.POST("/login", r.Login)
	subgroup.GET("/register", r.RegisterVolunteer)
	subgroup.GET("/search", r.Search, httputil.AuthMiddleware())
	subgroup.PUT("/:id", r.UpdateVolunteer, httputil.AuthMiddleware())
	subgroup.GET("/:id", r.GetVolunteer, httputil.AuthMiddleware())
}

func (r *VolunteerService) Login(c echo.Context) error {
	var resp LoginReq
	if err := json.NewDecoder(c.Request().Body).Decode(&resp); err != nil {
		return err
	}

	volunteer, err := r.repo.GetByEmail(context.Background(), resp.Email)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "account not found"})
	}

	if !cryptutil.CompareHash(resp.Password, volunteer.Password) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Incorrect password"})
	}

	// Generate token
	token, err := httputil.GenerateToken(fmt.Sprintf("%s_%d", volunteer.ID, volunteer.Stage))
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "cannot generate token"})
	}

	return c.JSON(http.StatusOK, token)
}

func (r *VolunteerService) GetVolunteer(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, "id is empty")
	}

	volunteer, err := r.repo.Get(context.Background(), id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, volunteer)
}

func (r *VolunteerService) Search(c echo.Context) error {
	return nil
}

func (r *VolunteerService) RegisterVolunteer(c echo.Context) error {
	var volunteerInput VolunteerRegister
	if err := c.Bind(&volunteerInput); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	existing, err := r.repo.GetByEmail(context.Background(), volunteerInput.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	if existing != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "account with such email is already registered"})
	}

	hashedPass, err := cryptutil.CreateHash(volunteerInput.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	volunteer := repository.Volunteer{
		ID:        uuid.NewString(),
		FirstName: volunteerInput.FirstName,
		LastName:  volunteerInput.LastName,
		Email:     volunteerInput.Email,
		Password:  hashedPass,
		Phone:     volunteerInput.Phone,
		Stage:     volunteerInput.Stage,
		Address:   volunteerInput.Address,
	}

	if err := r.repo.Save(context.Background(), volunteer); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, volunteer)
}

func (r *VolunteerService) UpdateVolunteer(c echo.Context) error {
	claims := c.Get("user").(httputil.CustomClaims)
	claimsAcc := account.ParseVolunteerAccount(claims.ID)

	var volunteer repository.Volunteer
	if err := c.Bind(&volunteer); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if volunteer.ID != claimsAcc.ID {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "only allowed to change owned data"})
	}

	err := r.repo.Save(context.Background(), volunteer)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, "")
}
