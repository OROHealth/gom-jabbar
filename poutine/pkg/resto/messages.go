package resto

type SqueezedCheeseCurdsReady struct {
	OrderID             string `json:"order_id,omitempty"`
	SqueezedCheeseCurds `json:",inline"`
}

type GravyScoopsReady struct {
	OrderID     string `json:"order_id,omitempty"`
	GravyScoops `json:",inline"`
}

type CuttedPotatoesReady struct {
	OrderID        string `json:"order_id,omitempty"`
	CuttedPotatoes `json:",inline"`
}

type DippedPotatoesReady struct {
	OrderID        string `json:"order_id,omitempty"`
	DippedPotatoes `json:",inline"`
}

type BoiledPotatoesReady struct {
	OrderID        string `json:"order_id,omitempty"`
	BoiledPotatoes `json:",inline"`
}

type FriedPotatoesReady struct {
	OrderID       string `json:"order_id,omitempty"`
	FriedPotatoes `json:",inline"`
}
