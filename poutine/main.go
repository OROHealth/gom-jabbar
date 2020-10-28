package main

import (
	"log"
	"os"
	"os/signal"
	rs "robotmaker/server"
)

func main() {

	s := rs.NewOrderServer()
	s.Start()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting Order service.")
	s.Close()

}
