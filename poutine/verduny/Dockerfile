FROM golang:latest

EXPOSE 4003

LABEL maintainer="ssubedir <ssubedir@gmail.com>"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -o verduny

CMD ["./verduny"]