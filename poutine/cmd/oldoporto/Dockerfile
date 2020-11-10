FROM golang:1.15-alpine as builder

RUN apk add --no-cache git

WORKDIR /app

COPY . ./

ENV GOPRIVATE=github.com/dpatrie/*
RUN CGO_ENABLED=0 GOOS=linux go build -v -o server

FROM alpine:3
RUN apk add --no-cache ca-certificates

EXPOSE 8086

COPY --from=builder /app/server /server


CMD ["/server"]