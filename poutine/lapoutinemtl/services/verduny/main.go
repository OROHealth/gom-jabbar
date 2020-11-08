package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	verduny := e.Group("/verduny/potatoes")

	// Route
	verduny.GET("/", getPotatoes)
	verduny.POST("/cut", cutPotatoes)
	verduny.POST("/dip", dipInMapleSyrup)

	// Serve
	e.Logger.Fatal(e.Start(":5143"))
}