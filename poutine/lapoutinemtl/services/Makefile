build:
	go build -a -o ./$(SERVICE_NAME)
dev: build
	./$(SERVICE_NAME)
docker:
	CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o ./$(SERVICE_NAME)
	docker build -t $(SERVICE_NAME):dev .