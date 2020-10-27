package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestBonjour(t *testing.T) {

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/bonjour", nil)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	err := Bonjour(c)
	if err!= nil {
		t.Error("service indisponible!")
	}

}
