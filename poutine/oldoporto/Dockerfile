FROM golang:latest

EXPOSE 4007

LABEL maintainer="ssubedir <ssubedir@gmail.com>"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -o oldoporto

CMD ["./oldoporto"]