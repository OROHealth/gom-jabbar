package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

// test function
func Bonjour(c echo.Context) error {
	return c.String(http.StatusOK, "Bonjour! Bienvenue à La Poutine Montréal.")
}