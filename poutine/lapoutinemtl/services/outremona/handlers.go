package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

func getCheese(c echo.Context) error {

	const onePortion = 80
	cheese := utils.CheddarEnGrains {
		IsFresh: true,
		IsSqueaky: false,
		Portion: fmt.Sprintf("%dgms", onePortion),
	}
	return c.JSON(http.StatusOK, cheese)
}

