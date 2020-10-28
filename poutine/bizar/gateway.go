package main

import (
	"bizar/protos"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Order struct {
	Id string `json:"order_id"`
}

var (
	serverList = []*server{}
)

type server struct {
	Name         string
	URL          string
	ReverseProxy *httputil.ReverseProxy
	Health       bool
}

// newServer - generate reverse proxy for frying services
func newServer(name, urlStr string) *server {

	u, err := url.Parse(urlStr)

	if err != nil {
		log.Panicln(err.Error())
	}

	director := func(req *http.Request) {
		req.Header.Add("X-Forwarded-Host", req.Host)
		req.Header.Add("X-Origin-Host", u.Host)
		req.URL.Scheme = "http"
		req.URL.Host = u.Host
	}

	proxy := &httputil.ReverseProxy{Director: director}

	return &server{
		Name:         name,
		URL:          urlStr,
		ReverseProxy: proxy,
		Health:       true,
	}
}

type Gateway struct {
}

func NewGatewayService() *Gateway {
	return &Gateway{}
}

// ServiceRegistration - register bizar-oil services
func (g *Gateway) ServiceRegistration(ctx context.Context, req *protos.RegistrationRequest) (*protos.RegistrationResponse, error) {

	log.Println(req.Address, " - ", req.Oiltype)

	serverList = append(serverList, newServer(req.Oiltype, "http://"+req.Address))

	return &protos.RegistrationResponse{Registered: true}, nil
}

func main() {

	// grpc
	gs := grpc.NewServer()
	gws := NewGatewayService()
	protos.RegisterGatewayServer(gs, gws)
	reflection.Register(gs)

	go func() {
		// create a TCP socket for inbound server connections
		l, err := net.Listen("tcp", fmt.Sprintf(":%s", os.Getenv("GRPC_PORT")))
		if err != nil {
			os.Exit(1)
		}

		log.Println("Starting gateway-grpc-registration service on port ", os.Getenv("GRPC_PORT"))

		// listen for requests
		gs.Serve(l)
	}()

	// http server
	s := NewBizarServer()
	s.Start()

	//Gracefully Stop
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)
	sig := <-c
	log.Println("Got signal: ", sig, ", exiting Bizar service.")
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

	ch := gohandlers.CORS(
		gohandlers.AllowedHeaders([]string{"Authorization", "Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token"}),
		gohandlers.AllowedOrigins([]string{"*"}),
		gohandlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
		gohandlers.AllowCredentials(),
	)

	getR.HandleFunc("/", Index)
	getR.HandleFunc("/check", AvailableOil)
	getP.HandleFunc("/bizar", ForwardRequest)

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
		log.Println("Starting Bizar server on port " + os.Getenv("BIZAR_PORT"))
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

// Index - Check Status of Bizargateway service
func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	ToJSON(Status{Message: "Bizargateway service working."}, w)
	return

}

// ForwardRequest - routs to correct oil fryer service
func ForwardRequest(res http.ResponseWriter, req *http.Request) {

	q := req.URL.Query()
	oil := q.Get("oil")

	for i := 0; i < len(serverList); i++ {

		// fry using correct oil
		if serverList[i].Name == oil {

			log.Println("redirect to - ", serverList[i].Name)

			serverList[i].ReverseProxy.ServeHTTP(res, req)
		}

	}

}

// AvailableOil - checks if a type oil is available
func AvailableOil(res http.ResponseWriter, req *http.Request) {

	q := req.URL.Query()
	oil := q.Get("type")

	for i := 0; i < len(serverList); i++ {
		s := serverList[i].Name
		if oil == s {
			res.Header().Add("Content-Type", "application/json")
			ToJSON(Status{Message: "Oil available"}, res)
			return
		}
	}

	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(404)
	ToJSON(Status{Message: "Oil not available"}, res)
	return

}

type Status struct {
	Message string
}

// ToJSON serializes the given interface into a string based JSON format
func ToJSON(i interface{}, w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(i)
}
