package resto

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
