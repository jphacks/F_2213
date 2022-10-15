package main

import (
	"context"
	"flag"
	"log"
	"time"

	pb "github.com/kajikentaro/gRPC-test/grpc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	defaultName = "world"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
	name = flag.String("name", defaultName, "Name to greet")
)

func main() {
	flag.Parse()
	// Set up a connection to the server.
	conn, err := grpc.Dial(*addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewDBWriterClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.CreateNewUser(ctx, &pb.User{Name: "Sato Taro", Email: "example@example.com"})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Println(r)
}
