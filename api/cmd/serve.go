package cmd

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/TegangLabs/greentrail/conf"
	"github.com/TegangLabs/greentrail/repository"
	"github.com/TegangLabs/greentrail/service"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/olivere/elastic/v7"
	"github.com/olivere/elastic/v7/config"
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

	esClient, err := elastic.NewClientFromConfig(&config.Config{
		URL:      conf.C.Elasticsearch.Host,
		Username: conf.C.Elasticsearch.Username,
		Password: conf.C.Elasticsearch.Password,
	})
	if err != nil {
		return err
	}

	// Repository
	volunteerRepo := repository.NewVolunteerRepo(esClient)
	wasteRepo := repository.NewWasteRepository(esClient)

	r := e.Group("/api")
	r.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// Service
	volunteerService := service.NewVolunteerService(volunteerRepo)
	wasteService := service.NewWasteService(wasteRepo)
	volunteerService.Register(r)
	wasteService.Register(r)

	if err := http.ListenAndServe(fmt.Sprintf("%s:%s", conf.C.Server.Host, conf.C.Server.Port), e); err != nil {
		return err
	}

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	return nil
}
