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
	s := NewVerdunnyServer()
	s.Start()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting verdunny service.")
	wp.Wait()
	s.Close()
}

type VerdunnyServer struct {
	serv http.Server
}

// Setup Http Server
func NewVerdunnyServer() VerdunnyServer {
	sm := mux.NewRouter()
	getR := sm.Methods(http.MethodGet).Subrouter()
	getP := sm.Methods(http.MethodPost).Subrouter()

	ch := gohandlers.CORS(
		gohandlers.AllowedHeaders([]string{"Authorization", "Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token"}),
		gohandlers.AllowedOrigins([]string{"*"}),
		gohandlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
		gohandlers.AllowCredentials(),
	)

	getR.HandleFunc("/", Index)
	getP.HandleFunc("/verduny", Process)

	s := http.Server{
		Addr:         ":" + os.Getenv("VERDUNY_PORT"), // configure the bind address
		Handler:      ch(sm),                          // set the default handler
		ReadTimeout:  15 * time.Second,                // max time to read request from the client
		WriteTimeout: 15 * time.Second,                // max time to write response to the client
		IdleTimeout:  120 * time.Second,               // max time for connections using TCP Keep-Alive
	}

	gs := VerdunnyServer{s}

	return gs

}

// Start server
func (s *VerdunnyServer) Start() {
	go func() {
		log.Println("Starting Verdunny server on port " + os.Getenv("VERDUNY_PORT"))
		err := s.serv.ListenAndServe()
		if err != nil {
			log.Fatal("Error starting service: %s\n", err)
			os.Exit(1)
		}
	}()
}

// Close Http Server
func (s *VerdunnyServer) Close() {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.serv.Shutdown(ctx)
}

func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}

// Index - Check Status of verduny service
func Index(w http.ResponseWriter, r *http.Request) {

	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Verduny service working."}, w)
	return

}

// Process - adds request to cutting and dipping queue
func Process(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	id := q.Get("id")

	if id == "" {
		return
	}

	o := Order{Id: id}

	wp.Do(func() error {

		p := Progress{TimeStart: time.Now()}

		log.Println("started processing - ", o.Id)

		// cut potato task simulation

		time.Sleep(1 * time.Second)

		// dip in maple syrup task simulation

		time.Sleep(10 * time.Second)

		log.Println("finish processing -", o.Id)

		p.TimeEnd = time.Now()
		p.Done = true
		p.Id = o.Id
		p.Process = 1
		// send progress back

		JobProgress(p)

		return nil
	})

	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: o.Id + " added to queue."}, w)
	return
}

// JobProgress - report order progress to orderservice
func JobProgress(p Progress) {

	// start by cutting potato

	url := "http://" + os.Getenv("DOCKER_SERVER") + ":4000/progress"

	//fmt.Println(url)

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
