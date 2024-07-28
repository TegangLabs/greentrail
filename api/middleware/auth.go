package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func APIKeyAuth(apiKey string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			apiKeyRequest := c.Request().Header.Get("X-API-KEY")
			if apiKeyRequest != apiKey {
				return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
			}
			return next(c)
		}
	}
}