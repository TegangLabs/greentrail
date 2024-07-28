package http

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewHandler() http.Handler {
	e := echo.New()
	e.Use(middleware.Recover())

	return e
}
