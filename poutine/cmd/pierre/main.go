package main

import (
	"log"
	"os"

	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/resto"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/robots"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	bus, err := pubsub.NewRedisBus(os.Getenv("REDIS_HOST"))
	if err != nil {
		log.Fatalf("error: %s", err)
	}
	log.Fatal(robots.NewPierre(bus, inventory()).ServeHTTP(os.Getenv("HTTP_HOST")))
}

func inventory() *resto.Inventory {
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
