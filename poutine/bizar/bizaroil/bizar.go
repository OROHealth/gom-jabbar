package main

import (
	"bizaroil/protos"
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
	"google.golang.org/grpc"
)

type Order struct {
	Id string `json:"order_id"`
}

var wp = workpool.New(1) // workpool

func main() {

	// http server
	s := NewBizarServer()
	s.Start()

	// register to oil fry gateway with grpc

	go func() {

		log.Println("Oil service - " + os.Getenv("DOCKER_SERVER") + ":" + os.Getenv("BIZAR_PORT"))

		conn, err := grpc.Dial(os.Getenv("DOCKER_SERVER")+":3333", grpc.WithInsecure())
		if err != nil {
			panic(err)
		}

		client := protos.NewGatewayClient(conn)
		req := &protos.RegistrationRequest{Address: os.Getenv("DOCKER_SERVER") + ":" + os.Getenv("BIZAR_PORT"), Oiltype: os.Getenv("OIL_TYPE")}
		resp, err := client.ServiceRegistration(context.Background(), req)

		time.Sleep(1 * time.Second)

		_ = resp
		if resp.Registered == true {
			log.Println("registered.")
		}

	}()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting Bizar service.")
	wp.Wait()
	s.Close()
}

type BizarServer struct {
	serv http.Server
}

// Setup Http Server
func NewBizarServer() BizarServer {
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
	getP.HandleFunc("/bizar", Process)

	s := http.Server{
		Addr:         ":" + os.Getenv("BIZAR_PORT"), // configure the bind address
		Handler:      ch(sm),                        // set the default handler
		ReadTimeout:  15 * time.Second,              // max time to read request from the client
		WriteTimeout: 15 * time.Second,              // max time to write response to the client
		IdleTimeout:  120 * time.Second,             // max time for connections using TCP Keep-Alive
	}

	gs := BizarServer{s}

	return gs

}

// Start server
func (s *BizarServer) Start() {
	go func() {
		log.Println("Starting " + os.Getenv("OIL_TYPE") + " Bizar - server on port " + os.Getenv("BIZAR_PORT"))
		err := s.serv.ListenAndServe()
		if err != nil {
			log.Fatal("Error starting service: \n", err)
			os.Exit(1)
		}
	}()
}

// Close Http Server
func (s *BizarServer) Close() {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.serv.Shutdown(ctx)
}

// ToJSON - encodes interface to json
func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}

// Index - Check Status of Bizar service
func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Bizar service working."}, w)
	return

}

// Process - adds request to the frying queue
func Process(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	id := q.Get("id")

	if id == "" {
		return
	}

	wp.Do(func() error {

		log.Println("started processing - ", id)

		p := Progress{TimeStart: time.Now()}

		// frying potato task simulation

		time.Sleep(10 * time.Second)

		log.Println("finish processing -", id)

		p.TimeEnd = time.Now()
		p.Done = true
		p.Id = id
		p.Process = 3

		// send progress back

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
	client := &http.Client{Timeout: time.Second * 20}

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
