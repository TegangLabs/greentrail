package http

import (
	"time"

	"github.com/TegangLabs/greentrail/conf"
	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

type CustomClaims struct {
	jwt.Claims

	ID string `json:"id"`
}

type TokenResponse struct {
	AccessToken string `json:"access_token"`
}

func GenerateToken(id string) (*TokenResponse, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte(conf.C.Token.Secret))
	if err != nil {
		return nil, err
	}

	return &TokenResponse{
		AccessToken: tokenString,
	}, nil
}

func AuthMiddleware() echo.MiddlewareFunc {
	return echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(conf.C.Token.Secret),
	})
}
