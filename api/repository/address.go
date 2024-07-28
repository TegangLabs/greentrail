package repository

type Address struct {
	Street    string   `json:"street,omitempty"`
	RT        int8     `json:"rt,omitempty"`
	RW        int8     `json:"rw,omitempty"`
	Kelurahan string   `json:"kelurahan,omitempty"`
	Kecamatan string   `json:"kecamatan,omitempty"`
	City      string   `json:"city,omitempty"`
	Province  string   `json:"province,omitempty"`
	Location  Location `json:"_location,omitempty"`
}

type Location struct {
	Latitude  float32 `json:"lat"`
	Longitude float32 `json:"long"`
}
