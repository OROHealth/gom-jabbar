package robots

import (
	"log"
	"testing"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/stretchr/testify/assert"
)

func TestPierreSuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan bool)

	bus := &pubsub.Local{}
	bus.Subscribe("order-received", func(msg string) error {
		o := &resto.PoutineOrder{}
		fromJSON(o, msg)
		go bus.Publish("squeezed-cheese-ready", toJSON(resto.SqueezedCheeseCurdsReady{
			OrderID: o.ID,
			SqueezedCheeseCurds: resto.SqueezedCheeseCurds{
				Kind:     o.Cheese,
				Quantity: o.Size.Template().CurdsCount,
			},
		}))
		go bus.Publish("gravy-scoops-ready", toJSON(resto.GravyScoopsReady{
			OrderID: o.ID,
			GravyScoops: resto.GravyScoops{
				Kind:     o.Gravy,
				Quantity: o.Size.Template().ScoopsCount,
			},
		}))
		go bus.Publish("fried-potatoes-ready", toJSON(resto.FriedPotatoesReady{
			OrderID: o.ID,
			FriedPotatoes: resto.FriedPotatoes{
				Kind:      o.Potato,
				CutSize:   o.PotatoCut,
				FryingOil: o.Oil,
				Quantity:  o.Size.Template().PotatoCount,
			},
		}))
		return nil
	})

	bus.Subscribe("order-ready", func(msg string) error {
		done <- true
		return nil
	})

	robot := NewPierre(bus, fullInventory())
	id, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindTequila,
	})

	assert.NoError(err)

	select {
	case <-done:
		o, err := robot.Order(id)
		assert.NoError(err)
		assert.Equal(o.Status, resto.OrderStatusDelivered)
		assert.NotNil(o.PoutineDelivered)
		log.Println(o.PoutineDelivered)

	case <-time.After(20 * time.Second):
		t.Fatal("order completion timed out")
	}
}

func TestPierreCheeseServiceDown(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping testing in short mode")
	}

	assert := assert.New(t)
	done := make(chan bool)

	bus := &pubsub.Local{}
	bus.Subscribe("order-received", func(msg string) error {
		o := &resto.PoutineOrder{}
		fromJSON(o, msg)
		go bus.Publish("gravy-scoops-ready", toJSON(resto.GravyScoopsReady{
			OrderID: o.ID,
			GravyScoops: resto.GravyScoops{
				Kind:     o.Gravy,
				Quantity: o.Size.Template().ScoopsCount,
			},
		}))
		go bus.Publish("fried-potatoes-ready", toJSON(resto.FriedPotatoesReady{
			OrderID: o.ID,
			FriedPotatoes: resto.FriedPotatoes{
				Kind:      o.Potato,
				CutSize:   o.PotatoCut,
				FryingOil: o.Oil,
				Quantity:  o.Size.Template().PotatoCount,
			},
		}))
		return nil
	})

	bus.Subscribe("order-timeout", func(msg string) error {
		done <- true
		return nil
	})

	robot := NewPierre(bus, fullInventory())
	id, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindSecret,
	})

	assert.NoError(err)

	select {
	case <-done:
		o, err := robot.Order(id)
		assert.NoError(err)
		assert.Equal(o.Status, resto.OrderStatusError)
	case <-time.After(resto.OrderTimeout + 5*time.Second):
		t.Fatal("order should have been marked as error because we have no squeezed cheese after time limit!")
	}
}

func fullInventory() *resto.Inventory {
	return &resto.Inventory{
		AvailableCheeses: map[resto.CheeseKind]uint{
			resto.CheeseKindCouicCouic: 10000,
			resto.CheeseKindNotSoGood:  10000,
		},
		AvailablePotatoes: map[resto.PotatoKind]uint{
			resto.RedPotato:    1000,
			resto.YellowPotato: 1000,
			resto.SweetPotato:  1000,
		},
		AvailableCardbox: 1000,
	}
}

func TestPierreEmptyInventory(t *testing.T) {
	assert := assert.New(t)

	robot := NewPierre(&pubsub.Local{}, &resto.Inventory{})
	_, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindSecret,
	})

	assert.Error(err)
}

func TestPierreNotEnoughCheese(t *testing.T) {
	assert := assert.New(t)

	robot := NewPierre(&pubsub.Local{}, &resto.Inventory{
		AvailableCheeses: map[resto.CheeseKind]uint{
			resto.CheeseKindCouicCouic: 10,
			resto.CheeseKindNotSoGood:  10000,
		},
		AvailablePotatoes: map[resto.PotatoKind]uint{
			resto.RedPotato:    1000,
			resto.YellowPotato: 1000,
			resto.SweetPotato:  1000,
		},
		AvailableCardbox: 1000,
	})
	_, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindSecret,
	})

	assert.Error(err)
}

func TestPierreNotEnoughPotato(t *testing.T) {
	assert := assert.New(t)

	robot := NewPierre(&pubsub.Local{}, &resto.Inventory{
		AvailableCheeses: map[resto.CheeseKind]uint{
			resto.CheeseKindCouicCouic: 1000,
			resto.CheeseKindNotSoGood:  1000,
		},
		AvailablePotatoes: map[resto.PotatoKind]uint{
			resto.RedPotato:    1000,
			resto.YellowPotato: 1000,
			resto.SweetPotato:  1,
		},
		AvailableCardbox: 1000,
	})
	_, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindSecret,
	})

	assert.Error(err)
}

func TestPierreNotEnoughCardbox(t *testing.T) {
	assert := assert.New(t)

	robot := NewPierre(&pubsub.Local{}, &resto.Inventory{
		AvailableCheeses: map[resto.CheeseKind]uint{
			resto.CheeseKindCouicCouic: 1000,
			resto.CheeseKindNotSoGood:  1000,
		},
		AvailablePotatoes: map[resto.PotatoKind]uint{
			resto.RedPotato:    1000,
			resto.YellowPotato: 1000,
			resto.SweetPotato:  1,
		},
		AvailableCardbox: 0,
	})
	_, err := robot.TakeOrder(&resto.PoutineOrder{
		Size:      "small",
		Potato:    resto.SweetPotato,
		PotatoCut: resto.SmallCut,
		Cheese:    resto.CheeseKindCouicCouic,
		Oil:       resto.OilKindSunflower,
		Gravy:     resto.GravyKindSecret,
	})

	assert.Error(err)
}
