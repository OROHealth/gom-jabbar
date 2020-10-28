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

	//
	g := e.Group("/test")

	// Route
	g.GET("/bonjour", Bonjour)
	g.File("/swagger", "swagger.yaml")

	// Serve
	e.Logger.Fatal(e.Start(":1616"))
}