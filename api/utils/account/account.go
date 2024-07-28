package account

import (
	"strconv"
	"strings"
)

type VolunteerAccount struct {
	ID    string
	Stage int
}

func ParseVolunteerAccount(id string) VolunteerAccount {
	part := strings.Split(id, "_")
	stage, _ := strconv.Atoi(part[1])
	return VolunteerAccount{
		ID:    part[0],
		Stage: stage,
	}
}
