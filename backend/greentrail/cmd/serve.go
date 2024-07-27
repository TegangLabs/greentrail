package cmd

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/TegangLabs/greentrail/conf"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Execute main greentrail server",
	RunE:  serve,
}

func init() {
	rootCmd.AddCommand(serveCmd)
}

func serve(cmd *cobra.Command, args []string) error {
	e := echo.New()
	e.Use(middleware.Recover())

	r := e.Group("api")
	r.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	if err := http.ListenAndServe(fmt.Sprintf("%s:%s", conf.C.Server.Host, conf.C.Server.Port), e); err != nil {
		return err
	}

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	return nil
}
