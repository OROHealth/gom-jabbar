package main

import (
	"log"
	"os"

	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/robots"
)

func main() {
	bus, _ := pubsub.NewRedisBus(os.Getenv("REDIS_HOST"))
	log.Fatal(robots.NewBizar(bus).ServeHTTP(os.Getenv("HTTP_HOST")))
}
