FROM golang:latest

EXPOSE 4004

LABEL maintainer="ssubedir <ssubedir@gmail.com>"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -o nordo

CMD ["./nordo"]