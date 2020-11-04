package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func fryPotatoes(context echo.Context) error {
	return context.JSON(http.StatusAccepted, nil)
}

