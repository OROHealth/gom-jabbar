FROM golang:1.15-alpine as builder

WORKDIR /app

COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -v -o server

FROM alpine:3
RUN apk add --no-cache ca-certificates

EXPOSE 8080

COPY --from=builder /app/server /server
COPY --from=builder /app/.env /.env

CMD ["/server"]