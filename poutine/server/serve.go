package server

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
)

func NewOrderServer() OrderServer {

	sm := mux.NewRouter()
	getR := sm.Methods(http.MethodGet).Subrouter()
	getP := sm.Methods(http.MethodPost).Subrouter()

	// cors
	ch := gohandlers.CORS(
		gohandlers.AllowedHeaders([]string{"Authorization", "Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token"}),
		gohandlers.AllowedOrigins([]string{"*"}),
		gohandlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
		gohandlers.AllowCredentials(),
	)

	// Api
	getR.HandleFunc("/", Index)                  // status
	getR.HandleFunc("/make/order", MakeOrder)    // make order request
	getR.HandleFunc("/view/order", Getorder)     // view order status
	getR.HandleFunc("/view/orders", Getorders)   // view all orders
	getP.HandleFunc("/progress", ListenProgress) // update order progress

	s := http.Server{
		Addr:         ":" + os.Getenv("SERVER_PORT"), // configure the bind address
		Handler:      ch(sm),                         // set the default handler
		ReadTimeout:  15 * time.Second,               // max time to read request from the client
		WriteTimeout: 15 * time.Second,               // max time to write response to the client
		IdleTimeout:  120 * time.Second,              // max time for connections using TCP Keep-Alive
	}

	gs := OrderServer{s}

	return gs

}

// Start server
func (s *OrderServer) Start() {
	go func() {
		log.Println("Starting Order server on port " + os.Getenv("SERVER_PORT"))
		//log.Println("addr - " + s.serv.Addr)
		err := s.serv.ListenAndServe()
		if err != nil {
			log.Fatal("Error starting service: \n", err)
			os.Exit(1)
		}
	}()
}

// Close Http Server
func (s *OrderServer) Close() {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.serv.Shutdown(ctx)
}

// Index - Check Status of Order service
func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Order service working."}, w)
	return
}

// Getorders - retrives all orders
func Getorders(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(orders, w)
}

// Getorder - get specific requested order
func Getorder(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	id := q.Get("id")

	if id == "" {
		w.Header().Add("Content-Type", "application/json")
		ToJSON(Status{Message: "Order id is required"}, w)
		return
	}

	for i := 0; i < len(orders); i++ {
		if orders[i].Id == id {
			w.Header().Add("Content-Type", "application/json")
			ToJSON(orders[i], w)
			return
		}
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(404)
	ToJSON(Status{Message: "Order id not found"}, w)
	return

}

// MakeOrder - creats order request for putine
func MakeOrder(w http.ResponseWriter, r *http.Request) {

	// Generate Order

	q := r.URL.Query()
	oil := q.Get("oil")

	if oil == "" {
		w.Header().Add("Content-Type", "application/json")
		ToJSON(Status{Message: "The oil type parameter missing."}, w)
		return
	}

	// check if oil is available

	resp, err := http.Get("http://" + os.Getenv("DOCKER_SERVER") + ":4005/check?type=" + oil)
	if err != nil {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(500)
		ToJSON(Status{Message: "Error contact administrator."}, w)
		return
	}

	if resp.StatusCode == 200 { // ok oil available

		o := Order{Id: RandStringBytesRmndr(8), Fry: Bizar{Oil: oil}}

		orders = append(orders, &o)

		// process order
		go o.CutDipProcess()

		w.Header().Add("Content-Type", "application/json")
		ToJSON(o, w)
	} else { // not available
		w.Header().Add("Content-Type", "application/json")
		ToJSON(Status{Message: "The oil you requested is not available."}, w)
	}

}

// ListenProgress - listens to progress made by other services
func ListenProgress(w http.ResponseWriter, r *http.Request) {

	res := http.MaxBytesReader(w, r.Body, 1048576)
	dec := json.NewDecoder(res)
	p := Progress{}
	err := dec.Decode(&p)
	if err != nil {
		log.Println("Invalid request.")
		return
	}

	for i := 0; i < len(orders); i++ {
		if orders[i].Id == p.Id {

			switch p.Process {
			case 1:
				{
					orders[i].CutDip.Done = p.Done
					orders[i].CutDip.TimeStart = p.TimeStart
					orders[i].CutDip.TimeEnd = p.TimeEnd
					orders[i].CutDip.InProgress = false
					orders[i].BoilProcess()
				}
			case 2:
				{
					orders[i].Boil.Done = p.Done
					orders[i].Boil.TimeStart = p.TimeStart
					orders[i].Boil.TimeEnd = p.TimeEnd
					orders[i].Boil.Softness = p.Softness
					orders[i].Boil.InProgress = false
					orders[i].FryProcess()
				}
			case 3:
				{
					orders[i].Fry.Done = p.Done
					orders[i].Fry.TimeStart = p.TimeStart
					orders[i].Fry.TimeEnd = p.TimeEnd
					orders[i].Fry.Oil = p.Oil
					orders[i].Fry.InProgress = false
					orders[i].GravyProcess()
				}
			case 4:
				{
					orders[i].Gravy.TimeStart = p.TimeStart
					orders[i].Gravy.TimeEnd = p.TimeEnd
					orders[i].Gravy.Done = p.Done
					orders[i].Gravy.InProgress = false
					orders[i].CheeseProcess()
				}
			case 5:
				{
					orders[i].Cheese.TimeStart = p.TimeStart
					orders[i].Cheese.TimeEnd = p.TimeEnd
					orders[i].Cheese.Done = p.Done
					orders[i].Cheese.InProgress = false
					orders[i].MixProcess()
				}
			case 6:
				{
					orders[i].Mix.TimeStart = p.TimeStart
					orders[i].Mix.TimeEnd = p.TimeEnd
					orders[i].Mix.Done = p.Done
					orders[i].Mix.InProgress = false
					orders[i].FinishOrder()
				}
			default:
			}

		}

	}
}

// ToJSON - encode struct to json
func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}

// CutDipProcess - end request to verduny
func (o Order) CutDipProcess() {

	// cutting potato

	UpdateProgressStatus(o.Id, 1)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4003/verduny?id=" + o.Id

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// BoilProcess - send request to nordo
func (o Order) BoilProcess() {

	// boil potato
	UpdateProgressStatus(o.Id, 2)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4004/nordo?id=" + o.Id

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// FryProcess - send request to bizar
func (o Order) FryProcess() {

	// sfry potato in oil
	UpdateProgressStatus(o.Id, 3)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4005/bizar?id=" + o.Id + "&oil=" + o.Fry.Oil

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// GravyProcess - send request to oldoporto
func (o Order) GravyProcess() {

	// fetch gravy
	UpdateProgressStatus(o.Id, 4)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4007/oldoporto?id=" + o.Id

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// CheeseProcess - send request to outremona
func (o Order) CheeseProcess() {

	// start by squize cheese
	UpdateProgressStatus(o.Id, 5)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4008/outremona?id=" + o.Id

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// MixProcess - send request to pierre
func (o Order) MixProcess() {

	// mix ingridents
	UpdateProgressStatus(o.Id, 6)

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4009/pierre?id=" + o.Id

	data, err := json.Marshal(o)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal("Error reading request. ", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Set client timeout
	client := &http.Client{Timeout: time.Second * 15}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Error reading response. ", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading body. ", err)
	}

	log.Println(string(body))

}

// FinishOrder - Set order done to true
func (o Order) FinishOrder() {

	for i := 0; i < len(orders); i++ {
		if orders[i].Id == o.Id {
			orders[i].Done = true
			log.Println("Order ID:", o.Id, "ready to be served.")
		}
	}

}

// UpdateProgressStatus - update order status
func UpdateProgressStatus(id string, p int) {
	for i := 0; i < len(orders); i++ {
		if orders[i].Id == id {

			if p == 1 {
				orders[i].CutDip.InProgress = true
			} else if p == 2 {
				orders[i].Boil.InProgress = true
			} else if p == 3 {
				orders[i].Fry.InProgress = true
			} else if p == 4 {
				orders[i].Gravy.InProgress = true
			} else if p == 5 {
				orders[i].Cheese.InProgress = true
			} else if p == 6 {
				orders[i].Mix.InProgress = true
			}

		}
	}
}

var orders []*Order

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// RandStringBytesRmndr - generates random string with n chars

func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63()%int64(len(letterBytes))]
	}
	return string(b)
}

type Order struct {
	Id string `json:"order_id"`

	// Order oporations
	Cheese Outremona `json:"order_cheese"`
	CutDip Verduny   `json:"order_cut_dip"`
	Boil   Nordo     `json:"order_boiled"`
	Fry    Bizar     `json:"order_fried"`
	Gravy  Oldoporto `json:"order_gravy"`
	Mix    Pierre    `json:"order_mix"`

	Done bool `json:"order_done"`
}

// cheese process
type Outremona struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	InProgress bool
}

// Cut Potato and Dip
type Verduny struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	InProgress bool
}

// Boil Potato
type Nordo struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	Softness   int
	InProgress bool
}

// Fry Potato
type Bizar struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	Oil        string
	InProgress bool
}

// gravy
type Oldoporto struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	InProgress bool
}

// Mix
type Pierre struct {
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	InProgress bool
}

type Progress struct {
	Id         string
	TimeStart  time.Time
	TimeEnd    time.Time
	Done       bool
	Process    int
	Softness   int
	InProgress bool
	Oil        string
}

type Status struct {
	Message string
}

type OrderServer struct {
	serv http.Server
}

// Create Order
// func TestCreateOrder(t *testing.T) {
// 	req, err := http.NewRequest("GET", "/make/order?oil=olive", nil)
// 	if err != nil {
// 		t.Fatal(err)
// 	}
// 	rr := httptest.NewRecorder()
// 	handler := http.HandlerFunc(rs.MakeOrder)

// 	handler.ServeHTTP(rr, req)
// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("handler returned wrong status code: got %v want %v",
// 			status, http.StatusOK)
// 	}

// 	// Check the response body is what we expect.
// 	expected := `{"order_id":"oJnNPGsi","order_cheese":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"InProgress":false},"order_cut_dip":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"InProgress":false},"order_boiled":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"Softness":0,"InProgress":false},"order_fried":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"Oil":"olive","InProgress":false},"order_gravy":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"InProgress":false},"order_mix":{"TimeStart":"0001-01-01T00:00:00Z","TimeEnd":"0001-01-01T00:00:00Z","Done":false,"InProgress":false},"order_done":false}`
// 	require.JSONEq(t, expected, rr.Body.String())

// }
