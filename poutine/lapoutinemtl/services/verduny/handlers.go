package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func cutPotatoes(c echo.Context) error {
	return c.JSON(http.StatusOK, nil)
}

func dipInMapleSyrup(c echo.Context) error {
	return c.JSON(http.StatusOK, nil)
}

