package resto

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

const NumberOfIngredientsInPoutine = 3
const OrderTimeout = 2 * time.Minute //an order should never take more than that to process

//Inventory represent the current inventory
type Inventory struct {
	AvailableCheeses  map[CheeseKind]uint
	AvailablePotatoes map[PotatoKind]uint
	AvailableCardbox  uint
	mut               sync.Mutex
	//TODO: right now we assume unlimited sccops of gravy...its the chef secret's sauce after all!
}

func (i *Inventory) Deduct(o *PoutineOrder) error {
	i.mut.Lock()
	defer i.mut.Unlock()

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
	ID       string      `json:"id,omitempty"`
	Received time.Time   `json:"received,omitempty"`
	Status   OrderStatus `json:"status,omitempty"`

	Size           PoutineSize         `json:"size,omitempty"`
	Potato         PotatoKind          `json:"potato,omitempty"`
	PotatoCut      PotatoCutSize       `json:"potato_cut,omitempty"`
	PotatoDip      PotatoDipKind       `json:"potato_dip,omitempty"`
	PotatoSoftness PotatoSoftnessLevel `json:"potato_softness,omitempty"`
	Cheese         CheeseKind          `json:"cheese,omitempty"`
	Oil            FryingOilKind       `json:"oil,omitempty"`
	Gravy          GravyKind           `json:"gravy,omitempty"`

	PoutineDelivered    Poutine      `json:"poutine_delivered,omitempty"`
	ReceivedIngredients []Ingredient `json:"received_ingredients,omitempty"`
	ingredientsMutex    sync.Mutex
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
	if p.PotatoDip == "" {
		p.PotatoDip = MapleSyrupDip
	}
	if p.PotatoSoftness == "" {
		p.PotatoSoftness = SoftnessSoftish
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
func (ps PoutineSize) Template() PoutineIngredientsQtyTemplate {
	switch strings.ToLower(string(ps)) {
	case "small":
		return PoutineIngredientsQtyTemplate{PotatoCount: 4, CurdsCount: 25, ScoopsCount: 2}
	case "large":
		return PoutineIngredientsQtyTemplate{PotatoCount: 8, CurdsCount: 75, ScoopsCount: 5}
	case "medium":
		fallthrough
	default:
		return PoutineIngredientsQtyTemplate{PotatoCount: 6, CurdsCount: 50, ScoopsCount: 3}
	}
}

//PoutineIngredientsQtyTemplate define how much of everything is needed for a given size
type PoutineIngredientsQtyTemplate struct {
	PotatoCount uint
	CurdsCount  uint
	ScoopsCount uint
}
