package cmd

import (
	"github.com/TegangLabs/greentrail/conf"
	"github.com/TegangLabs/greentrail/repository"
	"github.com/TegangLabs/greentrail/utils/es"
	"github.com/olivere/elastic/v7"
	"github.com/olivere/elastic/v7/config"
	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Execute migration",
	RunE:  migrate,
}

func init() {
	rootCmd.AddCommand(migrateCmd)
}

func migrate(cmd *cobra.Command, args []string) error {
	esClient, err := elastic.NewClientFromConfig(&config.Config{
		URL:      conf.C.Elasticsearch.Host,
		Username: conf.C.Elasticsearch.Username,
		Password: conf.C.Elasticsearch.Password,
	})
	if err != nil {
		return err
	}

	if err := es.DeleteIndex(cmd.Context(), esClient, repository.VolunteerIndex); err != nil {
		return err
	}

	if err := es.CreateIndex(cmd.Context(), esClient, repository.VolunteerIndex, conf.C.Mappings["settings"]); err != nil {
		return err
	}

	if err := es.PutMapping(cmd.Context(), esClient, repository.VolunteerIndex, conf.C.Mappings["volunteer"]); err != nil {
		return err
	}

	return nil
}
