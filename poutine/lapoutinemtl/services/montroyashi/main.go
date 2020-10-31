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

	montroyashi := e.Group("/montroyashi")

	// Route
	montroyashi.GET("drunks/detect", detectDrunks)
	// Serve
	e.Logger.Fatal(e.Start(":5143"))
}