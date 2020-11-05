package robots

import (
	"fmt"
	"strings"
	"sync"
)

//RestaurantInventory represent the current inventory
type RestaurantInventory struct {
	AvailableCheeses  map[CheeseKind]uint
	AvailablePotatoes map[PotatoKind]uint
	AvailableCardbox  uint
	//TODO: right now we assume unlimited sccops of gravy...its the chef secret's sauce after all!
}

var inventoryMut = &sync.Mutex{}

func (i *RestaurantInventory) Check(o *PoutineOrder) error {
	inventoryMut.Lock()
	defer inventoryMut.Unlock()

	template := o.Size.Template()
	if i.AvailableCheeses[o.Cheese]-template.CurdsCount < 0 {
		return fmt.Errorf("not enough cheese %s. (want: %d, got: %d)", o.Cheese, template.CurdsCount, i.AvailableCheeses[o.Cheese])
	} else {
		i.AvailableCheeses[o.Cheese] -= template.CurdsCount
	}

	if i.AvailablePotatoes[o.Potato]-template.PotatoCount < 0 {
		return fmt.Errorf("not enough potatoes %s. (want: %d, got: %d)", o.Potato, template.PotatoCount, i.AvailablePotatoes[o.Potato])
	} else {
		i.AvailablePotatoes[o.Potato] -= template.PotatoCount
	}

	if i.AvailableCardbox-1 < 0 {
		return fmt.Errorf("not enough cardbox (want: 1, got: %d)", i.AvailableCardbox)
	} else {
		i.AvailableCardbox--
	}

	return nil
}

//PoutineOrder is one order to we need to deliver promptly
type PoutineOrder struct {
	ID        string        `json:"id,omitempty"`
	Status    OrderStatus   `json:"status,omitempty"`
	Size      PoutineSize   `json:"size,omitempty"`
	Potato    PotatoKind    `json:"potato,omitempty"`
	PotatoCut PotatoCutSize `json:"potato_cut,omitempty"`
	Cheese    CheeseKind    `json:"cheese,omitempty"`
	Oil       FryingOilKind `json:"oil,omitempty"`
	Gravy     GravyKind     `json:"gravy,omitempty"`

	ingredients []Ingredient
	poutine     Poutine
}

type OrderStatus string

const (
	StatusOrdered   = "ordered"
	StatusCompleted = "completed"
	StatusError     = "error"
)

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

func (p Poutine) String() string {
	var parts []string
	for _, i := range p {
		parts = append(parts, i.Description())
	}
	return fmt.Sprintf("Poutine(\n%s\n)", strings.Join(parts, "\n"))
}

//CheeseKind is the current list of supported cheeses
type CheeseKind string

const (
	//CouicCouicCheese is the best kind of cheese for poutine
	CouicCouicCheese CheeseKind = "couic-couic"
	//NotSoGoodCheese is the weird cheese that people outside Montreal use to do poutine
	NotSoGoodCheese CheeseKind = "not-so-good"
)

//CheeseCurds is a handful of cheese curd
type CheeseCurds struct {
	Kind     CheeseKind `json:"kind,omitempty"`
	Quantity uint       `json:"quantity,omitempty"`
	Squeezed bool       `json:"squeezed,omitempty"`
}

func (cc CheeseCurds) Description() string {
	return fmt.Sprintf("%d curds of %s cheese", cc.Quantity, cc.Kind)
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

//PotatoCutSize represent the dynamic size of potato's cut
type PotatoCutSize string

const (
	//SmallCut 1x1 inch potatos
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

type FriedPotatoes struct {
	Kind      PotatoKind    `json:"kind,omitempty"`
	CutSize   PotatoCutSize `json:"cut_size,omitempty"`
	FryingOil FryingOilKind `json:"frying_oil,omitempty"`
	Quantity  uint          `json:"quantity,omitempty"`
}

func (fp FriedPotatoes) Description() string {
	return fmt.Sprintf("%d %s potatoes cutted in %s and fried with %s", fp.Quantity, fp.Kind, fp.CutSize, fp.FryingOil)
}

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

func (gs GravyScoops) Description() string {
	return fmt.Sprintf("%d scoops of %s sauce", gs.Quantity, gs.Kind)
}
