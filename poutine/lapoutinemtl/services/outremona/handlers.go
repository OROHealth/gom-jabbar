package main

import (
	"errors"
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

func getCheese(c echo.Context) error {

	cheese := utils.OneSqueakyCheesePortion()
	err := cheese.Squeeze()
	if err != nil {
		return errors.New("cannot squeeze cheese apparently")
	}
	return c.JSON(http.StatusOK, struct {
		utils.CheddarEnGrains `json:"squeakyCheese"`
	}{*cheese})
}

