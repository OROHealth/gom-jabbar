package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	"github.com/xxjwxc/gowp/workpool"
)

type Order struct {
	Id string `json:"order_id"`
}

var wp = workpool.New(1) // workpool

func main() {

	// http server
	s := NewPierreServer()
	s.Start()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting Pierre service.")
	wp.Wait()
	s.Close()
}

type PierreServer struct {
	serv http.Server
}

// Setup Http Server
func NewPierreServer() PierreServer {
	sm := mux.NewRouter()
	getR := sm.Methods(http.MethodGet).Subrouter()
	getP := sm.Methods(http.MethodPost).Subrouter()

	_ = getR
	ch := gohandlers.CORS(
		gohandlers.AllowedHeaders([]string{"Authorization", "Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token"}),
		gohandlers.AllowedOrigins([]string{"*"}),
		gohandlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
		gohandlers.AllowCredentials(),
	)

	getR.HandleFunc("/", Index)
	getP.HandleFunc("/pierre", Process)

	s := http.Server{
		Addr:         ":" + os.Getenv("PIERRE_PORT"), // configure the bind address
		Handler:      ch(sm),                         // set the default handler
		ReadTimeout:  15 * time.Second,               // max time to read request from the client
		WriteTimeout: 15 * time.Second,               // max time to write response to the client
		IdleTimeout:  120 * time.Second,              // max time for connections using TCP Keep-Alive
	}

	gs := PierreServer{s}

	return gs

}

// Start server
func (s *PierreServer) Start() {
	go func() {
		log.Println("Starting Pierre server on port " + os.Getenv("PIERRE_PORT"))
		err := s.serv.ListenAndServe()
		if err != nil {
			log.Fatal("Error starting service: \n", err)
			os.Exit(1)
		}
	}()
}

// Close Http Server
func (s *PierreServer) Close() {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.serv.Shutdown(ctx)
}

// ToJSON - encods interfaces to json
func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}

// Index - Check Status of Pierre service
func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Pierre service working."}, w)
	return
}

// Process - adds request to the ingredients mixer queue
func Process(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	id := q.Get("id")

	if id == "" {
		return
	}

	wp.Do(func() error {

		log.Println("started processing - ", id)

		p := Progress{}
		p.Id = id
		p.Process = 6
		p.Done = true
		p.TimeStart = time.Now().UTC()

		time.Sleep(5 * time.Second) // simulate mixing ingredients

		p.TimeEnd = time.Now().UTC()

		log.Println("finish processing -", id)

		JobProgress(p)

		return nil
	})

	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: id + " added to queue."}, w)
	return

}

// JobProgress - report order progress to orderservice
func JobProgress(p Progress) {

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4000/progress"

	data, err := json.Marshal(p)
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

type Progress struct {
	Id        string
	TimeStart time.Time
	TimeEnd   time.Time
	Done      bool
	Process   int
}

type Status struct {
	Message string
}
