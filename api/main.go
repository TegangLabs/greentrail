package main

import (
	"github.com/TegangLabs/greentrail/cmd"
	"github.com/TegangLabs/greentrail/conf"
)

func init() {
	if err := conf.Init(); err != nil {
		panic(err)
	}
}

func main() {
	cmd.Execute()
}
