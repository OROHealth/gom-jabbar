package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func regulateTemperature(c echo.Context) error {
	return c.JSON(http.StatusAccepted, nil)
}

