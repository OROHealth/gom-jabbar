package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func boil(c echo.Context) error {
	return c.JSON(http.StatusOK, nil)
}

