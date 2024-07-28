package cmd

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/TegangLabs/greentrail/conf"
	"github.com/TegangLabs/greentrail/email"
	mw "github.com/TegangLabs/greentrail/middleware"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/cobra"
)

type Payload struct {
	Type    string `json:"type"`
	To      string `json:"to"`
	Subject string `json:"subject,omitempty"`
	Body    string `json:"body"`
}

var integrationCmd = &cobra.Command{
	Use:   "integration",
	Short: "Execute main greentrail server",
	RunE:  integration,
}

func init() {
	rootCmd.AddCommand(integrationCmd)
}

func integration(cmd *cobra.Command, args []string) error {
	e := echo.New()
	e.Use(middleware.Recover())

	r := e.Group("integration")
	r.Use(mw.APIKeyAuth(conf.C.SendGrid.APIKey))
	r.POST("/send-email", func(c echo.Context) error {
		var payload Payload
		if err := c.Bind(&payload); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
		}

		if payload.Type != "email" {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unsupported message type"})
		}

		err := email.SendEmail(payload.To, payload.Subject, payload.Body)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}

		return c.JSON(http.StatusOK, map[string]string{"status": "Email sent successfully"})
	})

	if err := http.ListenAndServe(fmt.Sprintf("%s:%s", conf.C.Server["integration"].Host, conf.C.Server["integration"].Port), e); err != nil {
		return err
	}

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	return nil
}
