package robots

import (
	"strings"
	"time"
)

//RestaurantInventory represent the current inventory
type RestaurantInventory struct {
	CheeseBoxes map[CheeseKind][]*CheeseBox
	PotatoBags  map[PotatoKind][]*PotatoBag
	Cardbox     uint
	//TODO: right now we assume unlimited sccops of gravy...its the chef secret's sauce after all!
}

//PoutineOrder is one order to we need to deliver promptly
type PoutineOrder struct {
	ID        string
	Size      PoutineSize
	Potato    PotatoKind
	PotatoCut PotatoCutSize
	Cheese    CheeseKind
	Oil       FryingOilKind
	Gravy     GravyKind
}

//PoutineSize represent the size of a poutine
type PoutineSize string

//Template returns a template for a give poutine size
func (ps PoutineSize) Template() PoutineSizeTemplate {
	switch strings.ToLower(string(ps)) {
	case "small":
		return PoutineSizeTemplate{PotatoCount: 4, CurdsCount: 25, ScoopsCount: 2}
	case "large":
		return PoutineSizeTemplate{PotatoCount: 8, CurdsCount: 75, ScoopsCount: 5}
	case "medium":
		fallthrough
	default:
		return PoutineSizeTemplate{PotatoCount: 6, CurdsCount: 50, ScoopsCount: 3}
	}
}

//PoutineSizeTemplate define how much of everything is needed for a given size
type PoutineSizeTemplate struct {
	PotatoCount uint
	CurdsCount  uint
	ScoopsCount uint
}

//Poutine represent the sum of all its ingredients
type Poutine []Ingredient

//CheeseKind is the current list of supported cheeses
type CheeseKind string

const (
	//CouicCouicCheese is the best kind of cheese for poutine
	CouicCouicCheese CheeseKind = "couic-couic"
	//NotSoGoodCheese is the weird cheese that people outside Montreal use to do poutine
	NotSoGoodCheese CheeseKind = "not-so-good"
)

//CheeseBox represent a cheese box
type CheeseBox struct {
	Brand         CheeseKind
	CurdsQuantity uint
	Expiration    time.Time
}

//CheeseCurds is a handful of cheese curd
type CheeseCurds struct {
	Brand    CheeseKind
	Quantity uint
	Squeezed bool
}

//PotatoKind is the current list of supported potatoes
type PotatoKind string

const (
	//YellowPotato kind
	YellowPotato PotatoKind = "yellow"
	//RedPotato kind
	RedPotato PotatoKind = "red"
	//WhitePotato kind
	WhitePotato PotatoKind = "white"
	//SweetPotato kind
	SweetPotato PotatoKind = "sweet"
)

//PotatoBag represent a potato bag
type PotatoBag struct {
	Brand      PotatoKind
	Quantity   uint
	Expiration time.Time
}

//PotatoCutSize represent the dynamic size of potato's cut
type PotatoCutSize string

const (
	//SmallCut 1x1 inche potatos
	SmallCut PotatoCutSize = "1x1"
	//MediumCut 2x2 inches potatos
	MediumCut PotatoCutSize = "2x2"
	//LargeCut 3x3 inches potatos
	LargeCut PotatoCutSize = "3x3"
)

//PotatoSoftness is the level of softness when boiled
type PotatoSoftness string

const (
	//Raw PotatoSoftness
	Raw PotatoSoftness = "raw"
	//Softish PotatoSoftness
	Softish PotatoSoftness = "softish"
	//Mushy PotatoSoftness
	Mushy PotatoSoftness = "mushy"
)

//FryingOilKind is the type of frying oid
type FryingOilKind string

const (
	//Sunflower FyingOilKind
	Sunflower FryingOilKind = "sunflower"
	//Olive FyingOilKind
	Olive FryingOilKind = "olive"
	//Valvoline FyingOilKind
	Valvoline FryingOilKind = "valvoline"
)

//GravyKind is the kind of gravy
type GravyKind string

const (
	//Secret GravyKind
	Secret GravyKind = "secret"
)

//GravyScoops represent some gravy sccops
type GravyScoops struct {
	Kind     GravyKind
	Quantity uint
}
