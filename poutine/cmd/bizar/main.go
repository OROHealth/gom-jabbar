package main

import (
	"log"
	"os"

	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/robots"
)

func main() {
	bus, err := pubsub.NewRedisBus(os.Getenv("REDIS_HOST"))
	if err != nil {
		log.Fatalf("error: %s", err)
	}
	log.Fatal(robots.NewBizar(bus).ServeHTTP(os.Getenv("HTTP_HOST")))
}
