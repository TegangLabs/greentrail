package repository

import (
	"context"
	"encoding/json"
	"time"

	"github.com/olivere/elastic/v7"
)

const (
	WasteIndex = "waste"
	scrollSize = 200
)

type Waste struct {
	ID        string   `json:"id,omitempty"`
	Submitter string   `json:"submitter,omitempty"`
	ImageURL  string   `json:"image_url,omitempty"`
	Address   Address  `json:"address,omitempty"`
	Type      []string `json:"type,omitempty"`
	Metric    Metric   `json:"metric,omitempty"`
	Status    []Status `json:"status,omitempty"`
}

type Metric struct {
	Weight int32 `json:"weight,omitempty"` // In grams
}

type Status struct {
	Handler   string     `json:"handler"`
	Stage     int32      `json:"stage"`
	Status    string     `json:"string"`
	HandledOn *time.Time `json:"handled_on"`
}

type ESWasteRepo struct {
	client *elastic.Client
}

func NewWasteRepository(client *elastic.Client) *ESWasteRepo {
	return &ESWasteRepo{client: client}
}
func (r *ESWasteRepo) Get(ctx context.Context, id string) (*Waste, error) {
	resp, err := r.client.Get().
		Index(WasteIndex).
		Id(id).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	var res Waste
	if err := json.Unmarshal(resp.Source, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *ESWasteRepo) Save(ctx context.Context, waste Waste) error {
	_, err := r.client.Update().
		Index(WasteIndex).
		Id(waste.ID).
		Refresh("wait_for").
		DocAsUpsert(true).
		Doc(waste).
		Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (r *ESWasteRepo) Search(ctx context.Context, query elastic.Query) ([]*Waste, error) {
	resp, err := r.client.Search(WasteIndex).
		Query(query).
		Size(scrollSize).
		Do(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]*Waste, 0, len(resp.Hits.Hits))
	for _, hit := range resp.Hits.Hits {
		var w Waste
		if err := json.Unmarshal(hit.Source, &w); err != nil {
			return nil, err
		}

		res = append(res, &w)
	}

	return res, nil
}
