package resto

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

const NumberOfIngredientsInPoutine = 3
const OrderTimeout = 30 * time.Second //an order should never take more than 30 seconds to process

//Inventory represent the current inventory
type Inventory struct {
	AvailableCheeses  map[CheeseKind]uint
	AvailablePotatoes map[PotatoKind]uint
	AvailableCardbox  uint
	//TODO: right now we assume unlimited sccops of gravy...its the chef secret's sauce after all!
}

var inventoryMut = &sync.Mutex{}

func (i *Inventory) Deduct(o *PoutineOrder) error {
	inventoryMut.Lock()
	defer inventoryMut.Unlock()

	template := o.Size.Template()
	if i.AvailableCheeses == nil || int(i.AvailableCheeses[o.Cheese])-int(template.CurdsCount) < 0 {
		return fmt.Errorf("not enough cheese %s. (want: %d, got: %d)", o.Cheese, template.CurdsCount, i.AvailableCheeses[o.Cheese])
	} else {
		i.AvailableCheeses[o.Cheese] -= template.CurdsCount
	}

	if i.AvailablePotatoes == nil || int(i.AvailablePotatoes[o.Potato])-int(template.PotatoCount) < 0 {
		return fmt.Errorf("not enough potatoes %s. (want: %d, got: %d)", o.Potato, template.PotatoCount, i.AvailablePotatoes[o.Potato])
	} else {
		i.AvailablePotatoes[o.Potato] -= template.PotatoCount
	}

	if int(i.AvailableCardbox)-1 < 0 {
		return fmt.Errorf("not enough cardbox (want: 1, got: %d)", i.AvailableCardbox)
	} else {
		i.AvailableCardbox--
	}

	return nil
}

//PoutineOrder is one order to we need to deliver promptly
type PoutineOrder struct {
	ID                  string        `json:"id,omitempty"`
	Received            time.Time     `json:"received,omitempty"`
	Status              OrderStatus   `json:"status,omitempty"`
	Size                PoutineSize   `json:"size,omitempty"`
	Potato              PotatoKind    `json:"potato,omitempty"`
	PotatoCut           PotatoCutSize `json:"potato_cut,omitempty"`
	Cheese              CheeseKind    `json:"cheese,omitempty"`
	Oil                 FryingOilKind `json:"oil,omitempty"`
	Gravy               GravyKind     `json:"gravy,omitempty"`
	PoutineDelivered    Poutine       `json:"poutine_delivered,omitempty"`
	ReceivedIngredients []Ingredient  `json:"received_ingredients,omitempty"`

	ingredientsMutex sync.Mutex
}

func (p *PoutineOrder) ValidateAndSetDefault() {
	//TODO: validate given values and ensure they are good, else default
	if p.Size == "" {
		p.Size = "large"
	}
	if p.Potato == "" {
		p.Potato = YellowPotato
	}
	if p.PotatoCut == "" {
		p.PotatoCut = SmallCut
	}
	if p.Cheese == "" {
		p.Cheese = CheeseKindCouicCouic
	}
	if p.Oil == "" {
		p.Oil = OilKindSunflower
	}
	if p.Gravy == "" {
		p.Gravy = GravyKindSecret
	}
}

func (p *PoutineOrder) AppendIngredient(i Ingredient) {
	p.ingredientsMutex.Lock()
	defer p.ingredientsMutex.Unlock()
	p.ReceivedIngredients = append(p.ReceivedIngredients, i)
}

type OrderStatus string

const (
	OrderStatusPending   OrderStatus = "pending"
	OrderStatusError     OrderStatus = "error"
	OrderStatusDelivered OrderStatus = "delivered"
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
	return fmt.Sprintf("Poutine(\n\t%s\n)", strings.Join(parts, "\n\t"))
}

//CheeseKind is the current list of supported cheeses
type CheeseKind string

const (
	//CheeseKindCouicCouic is the best kind of cheese for poutine
	CheeseKindCouicCouic CheeseKind = "couic-couic"
	//CheeseKindNotSoGood is the weird cheese that people outside Montreal use to do poutine
	CheeseKindNotSoGood CheeseKind = "not-so-good"
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
	//SoftnessRaw PotatoSoftness
	SoftnessRaw PotatoSoftness = "raw"
	//SoftnessSoftish PotatoSoftness
	SoftnessSoftish PotatoSoftness = "softish"
	//SoftnessMushy PotatoSoftness
	SoftnessMushy PotatoSoftness = "mushy"
)

//FryingOilKind is the type of frying oid
type FryingOilKind string

const (
	//OilKindSunflower FyingOilKind
	OilKindSunflower FryingOilKind = "sunflower"
	//OilKindOlive FyingOilKind
	OilKindOlive FryingOilKind = "olive"
	//OilKindValvoline FyingOilKind
	OilKindValvoline FryingOilKind = "valvoline"
)

type FriedPotatoes struct {
	Kind      PotatoKind    `json:"kind,omitempty"`
	CutSize   PotatoCutSize `json:"cut_size,omitempty"`
	FryingOil FryingOilKind `json:"frying_oil,omitempty"`
	Quantity  uint          `json:"quantity,omitempty"`
}

func (fp FriedPotatoes) Description() string {
	return fmt.Sprintf("%d %s potatoes cutted in %s cubes and fried with %s oil", fp.Quantity, fp.Kind, fp.CutSize, fp.FryingOil)
}

//GravyKind is the kind of gravy
type GravyKind string

const (
	//GravyKindSecret GravyKind
	GravyKindSecret GravyKind = "secret"
)

//GravyScoops represent some gravy sccops
type GravyScoops struct {
	Kind     GravyKind
	Quantity uint
}

func (gs GravyScoops) Description() string {
	return fmt.Sprintf("%d scoops of %s sauce", gs.Quantity, gs.Kind)
}

type Ingredient interface {
	Description() string
}
