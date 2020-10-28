FROM golang:latest

EXPOSE 3333 4005

LABEL maintainer="ssubedir <ssubedir@gmail.com>"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -o bizargateway

CMD ["./bizargateway"]