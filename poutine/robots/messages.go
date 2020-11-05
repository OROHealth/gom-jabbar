package robots

import "encoding/json"

type SqueezedCheeseCurdsReady struct {
	OrderID     string `json:"order_id,omitempty"`
	CheeseCurds `json:",inline"`
}

type GravyScoopsReady struct {
	OrderID     string `json:"order_id,omitempty"`
	GravyScoops `json:",inline"`
}

type FriedPotatoesReady struct {
	OrderID       string `json:"order_id,omitempty"`
	FriedPotatoes `json:",inline"`
}

func ToJSON(i interface{}) string {
	b, _ := json.Marshal(i)
	return string(b)
}

func FromJSON(dst interface{}, val string) {
	json.Unmarshal([]byte(val), &dst)
}
