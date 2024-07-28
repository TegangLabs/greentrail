package es

import (
	"context"
	"os"

	"github.com/ghodss/yaml"
	"github.com/olivere/elastic/v7"
)

func CreateIndex(ctx context.Context, c *elastic.Client, index string, mappingFile string) error {
	mapping, err := readMapping(mappingFile)
	if err != nil {
		return err
	}

	_, err = c.CreateIndex(index).Body(mapping).Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func DeleteIndex(ctx context.Context, c *elastic.Client, index string) error {
	_, err := c.DeleteIndex(index).Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func PutMapping(ctx context.Context, c *elastic.Client, index string, mappingFile string) error {
	mapping, err := readMapping(mappingFile)
	if err != nil {
		return err
	}

	_, err = c.PutMapping().Index(index).BodyString(mapping).Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func readMapping(mappingFile string) (string, error) {
	data, err := os.ReadFile(mappingFile)
	if err != nil {
		return "", err
	}

	mapping, err := yaml.YAMLToJSON(data)
	if err != nil {
		return "", err
	}
	return string(mapping), nil
}
