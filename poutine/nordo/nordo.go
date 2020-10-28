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
	s := NewNordoServer()
	s.Start()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting nordo service.")
	wp.Wait()
	s.Close()
}

// Setup Http Server
func NewNordoServer() NordoServer {
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
	getP.HandleFunc("/nordo", Process)

	s := http.Server{
		Addr:         ":" + os.Getenv("NORDO_PORT"), // configure the bind address
		Handler:      ch(sm),                        // set the default handler
		ReadTimeout:  15 * time.Second,              // max time to read request from the client
		WriteTimeout: 15 * time.Second,              // max time to write response to the client
		IdleTimeout:  120 * time.Second,             // max time for connections using TCP Keep-Alive
	}

	gs := NordoServer{s}

	return gs

}

// Start server
func (s *NordoServer) Start() {
	go func() {
		log.Println("Starting Nordo server on port " + os.Getenv("NORDO_PORT"))
		err := s.serv.ListenAndServe()
		if err != nil {
			log.Fatal("Error starting service: \n", err)
			os.Exit(1)
		}
	}()
}

// Close Http Server
func (s *NordoServer) Close() {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.serv.Shutdown(ctx)
}

// ToJSON - encodes interface to json
func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}

// Index - Check Status of verduny service
func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Nordo service working."}, w)
	return

}

var timejob time.Time = time.Now().UTC()

// Process - adds request to the potato boiling queue
func Process(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	id := q.Get("id")

	if id == "" {
		return
	}

	wp.Do(func() error {

		log.Println("started processing - ", id)

		timejob = time.Now().UTC()

		p := Progress{}
		p.Id = id
		p.Process = 2
		p.Done = true
		p.TimeStart = timejob

		time.Sleep(25 * time.Second) // simulate boiling

		now := time.Now().UTC()
		duration := int64(now.Sub(timejob).Seconds())
		duration = duration * 10 // simulate softness based on duration
		if duration >= 100 {
			duration = 100
		}
		p.Softness = int(duration)
		p.TimeEnd = time.Now().UTC()

		log.Println("finish processing -", id)

		JobProgress(p)

		return nil
	})

	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: id + " added to queue."}, w)
	return
}

// Softness - calculats the softness of the potato based on the time placed in the water
func Softness() int64 {

	now := time.Now().UTC()
	duration := int64(now.Sub(timejob).Seconds())
	duration = duration * 10

	if duration >= 100 {
		return 100
	}

	return duration
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
	Softness  int
}

type NordoServer struct {
	serv http.Server
}

type Status struct {
	Message string
}
