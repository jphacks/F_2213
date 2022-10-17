# prod_backの構築用Dockerfile
FROM golang:1.19.2-alpine

WORKDIR /root/app

COPY ./go.mod .
COPY ./go.sum .
RUN go mod download

COPY . /root/app
RUN go build -o main

CMD ["./main"]
