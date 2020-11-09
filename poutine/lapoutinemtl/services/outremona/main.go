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

	outremona := e.Group("/outremona")

	// Route
	outremona.GET("/cheese", getCheese)
	outremona.File("/swagger", "swagger.yaml")

	// Serve
	e.Logger.Fatal(e.Start(":5141"))
}