package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/require"
)

// Pierre
func TestPierre(t *testing.T) {
	req, err := http.NewRequest("POST", "/pierre?id=oJnNPGsi", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Process)

	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `{"Message":"oJnNPGsi added to queue."}`
	require.JSONEq(t, expected, rr.Body.String())

}
