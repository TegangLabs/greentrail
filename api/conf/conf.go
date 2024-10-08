package conf

import (
	"os"

	"gopkg.in/yaml.v3"
)

var C AppConfig

type AppConfig struct {
	Server        map[string]ServerConf `yaml:"server"`
	SendGrid      SendGridConf          `yaml:"sendGrid"`
	Elasticsearch ElasticsearchConf
	Token         TokenConf
	Mappings      map[string]string
}

type ElasticsearchConf struct {
	Host     string `yaml:"host"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

type TokenConf struct {
	Secret string
}
type SendGridConf struct {
	APIKey       string `yaml:"apiKey"`
	EmailAPIKey  string `yaml:"emailKey"`
	EmailAddress string `yaml:"emailAddress"`
}

type ServerConf struct {
	Host string `yaml:"host"`
	Port string `yaml:"port"`
}

func Init() error {
	var fpath string
	switch os.Getenv("ENV") {
	case "local":
		fpath = "conf/config.yml"
	default:
		fpath = "/etc/greentrail/config.yml"
	}

	f, err := os.ReadFile(fpath)
	if err != nil {
		return err
	}

	return yaml.Unmarshal(f, &C)
}
