package repository

import (
	"context"
	"encoding/json"

	"github.com/olivere/elastic/v7"
)

const CitizenIndex = "citizen"

type Citizen struct {
	ID        string  `json:"id,omitempty"`
	FirstName string  `json:"first_name,omitempty"`
	LastName  string  `json:"last_name,omitempty"`
	Email     string  `json:"email,omitempty"`
	Phone     string  `json:"phone,omitempty"`
	Address   Address `json:"address,omitempty"`
}

type ESCitizenRepo struct {
	client *elastic.Client
}

func NewCitizenRepo(client *elastic.Client) *ESCitizenRepo {
	return &ESCitizenRepo{client: client}
}

func (r *ESCitizenRepo) Get(ctx context.Context, id string) (*Citizen, error) {
	resp, err := r.client.Get().
		Index(CitizenIndex).
		Id(id).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	var res Citizen
	if err := json.Unmarshal(resp.Source, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *ESCitizenRepo) Save(ctx context.Context, citizen Citizen) error {
	_, err := r.client.Update().
		Index(CitizenIndex).
		Id(citizen.ID).
		Refresh("wait_for").
		DocAsUpsert(true).
		Doc(citizen).
		Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (r *ESCitizenRepo) Search(ctx context.Context, query elastic.Query) ([]*Citizen, error) {
	resp, err := r.client.Search().
		Index(VolunteerIndex).
		Size(200).
		Query(query).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	if len(resp.Hits.Hits) == 0 {
		return nil, nil
	}

	var res []*Citizen
	for _, hit := range resp.Hits.Hits {
		var c Citizen
		if err := json.Unmarshal(hit.Source, &c); err != nil {
			return nil, err
		}

		res = append(res, &c)
	}

	return res, nil
}
