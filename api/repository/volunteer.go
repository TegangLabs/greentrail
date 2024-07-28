package repository

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/olivere/elastic/v7"
)

const VolunteerIndex = "volunteer"

type Volunteer struct {
	ID        string  `json:"id,omitempty"`
	FirstName string  `json:"first_name,omitempty"`
	LastName  string  `json:"last_name,omitempty"`
	Email     string  `json:"email,omitempty"`
	Password  string  `json:"password,omitempty"`
	Phone     string  `json:"phone,omitempty"`
	ImageURL  string  `json:"image_url,omitempty"`
	Stage     int     `json:"stage,omitempty"`
	Address   Address `json:"address,omitempty"`
}

type ESVolunteerRepo struct {
	client *elastic.Client
}

func NewVolunteerRepo(client *elastic.Client) *ESVolunteerRepo {
	return &ESVolunteerRepo{client: client}
}

func (r *ESVolunteerRepo) Get(ctx context.Context, id string) (*Volunteer, error) {
	resp, err := r.client.Get().
		Index(VolunteerIndex).
		Id(id).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	var res Volunteer
	if err := json.Unmarshal(resp.Source, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *ESVolunteerRepo) GetByEmail(ctx context.Context, email string) (*Volunteer, error) {
	resp, err := r.client.Search().
		Index(VolunteerIndex).
		Query(elastic.NewTermQuery("email", email)).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	if len(resp.Hits.Hits) > 1 {
		return nil, errors.New("multiple entry found")
	}

	if len(resp.Hits.Hits) == 0 {
		return nil, nil
	}

	var res Volunteer
	if err := json.Unmarshal(resp.Hits.Hits[0].Source, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *ESVolunteerRepo) Save(ctx context.Context, volunteer Volunteer) error {
	_, err := r.client.Update().
		Index(VolunteerIndex).
		Id(volunteer.ID).
		Refresh("wait_for").
		DocAsUpsert(true).
		Doc(volunteer).
		Do(ctx)
	if err != nil {
		return err
	}

	return nil
}
