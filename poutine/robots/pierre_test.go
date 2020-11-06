package robots

import (
	"testing"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

func TestPierreEndToEndSuccess(t *testing.T) {
	done := make(chan bool)

	bus := &pubsub.Local{}
	bus.Subscribe("order-start", func(msg string) error {
		o := &resto.PoutineOrder{}
		FromJSON(o, msg)
		go bus.Publish("squeezed-cheese-done", ToJSON(resto.SqueezedCheeseCurdsReady{
			OrderID: o.ID,
			CheeseCurds: resto.CheeseCurds{
				Kind:     o.Cheese,
				Quantity: o.Size.Template().CurdsCount,
				Squeezed: true,
			},
		}))
		go bus.Publish("gravy-scoop-done", ToJSON(resto.GravyScoopsReady{
			OrderID: o.ID,
			GravyScoops: resto.GravyScoops{
				Kind:     o.Gravy,
				Quantity: o.Size.Template().ScoopsCount,
			},
		}))
		go bus.Publish("fried-potato-done", ToJSON(resto.FriedPotatoesReady{
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

	bus.Subscribe("order-done", func(msg string) error {
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

	if err != nil {
		t.Error(err)
	}

	select {
	case <-done:
		o, err := robot.Order(id)
		if err != nil {
			t.Fatal(err)
		} else if o.Status != resto.OrderStatusDelivered {
			t.Fatalf("status is not completed: %s", o.Status)
		}
	case <-time.After(20 * time.Second):
		t.Fatal("order completion timed out")
	}
}

func fullInventory() resto.Inventory {
	return resto.Inventory{
		AvailableCheeses: map[resto.CheeseKind]uint{
			resto.CheeseKindCouicCouic: 1000,
			resto.CheeseKindNotSoGood:  1000,
		},
		AvailablePotatoes: map[resto.PotatoKind]uint{
			resto.RedPotato:    1000,
			resto.YellowPotato: 1000,
			resto.SweetPotato:  1000,
		},
		AvailableCardbox: 1000,
	}
}
