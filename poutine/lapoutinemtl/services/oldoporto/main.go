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

	oldoporto := e.Group("/oldoporto")

	// Route
	oldoporto.GET("/sauce", getPoutineSauce)

	// Serve
	e.Logger.Fatal(e.Start(":5146"))
}