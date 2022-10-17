package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	pb "github.com/kajikentaro/gRPC-test/grpc"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

type server struct {
	pb.UnimplementedDBWriterServer
}

type User struct {
	id    int    `db:"id"`
	name  string `db:"name"`
	email int    `db:"email"`
}

func (s *server) CreateNewUser(ctx context.Context, in *pb.User) (*pb.User, error) {
	res, _ := db.NamedExec("INSERT INTO user (name, email) VALUES(:name, :email)", in)
	userId, _ := res.LastInsertId()
	newUser := *in
	newUser.Id = userId
	log.Println(newUser)
	return &newUser, nil
}

func getEnv(key string, defaultValue string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defaultValue
}

func connectDB() *sqlx.DB {
	dataSource := fmt.Sprintf("%s:%s@(%s)/%s",
		getEnv("MYAPP_MYSQL_USER", ""),
		getEnv("MYSQL_ROOT_PASSWORD", ""),
		getEnv("MYAPP_MYSQL_HOSTNAME", ""),
		getEnv("MYAPP_MYSQL_DB_NAME", ""),
	)
	db, err := sqlx.Connect("mysql", dataSource)
	if err != nil {
		log.Fatalln(err)
		os.Exit(1)
	}

	db.Exec("CREATE TABLE user(id int AUTO_INCREMENT PRIMARY KEY, name TEXT, email TEXT)")
	db.Exec("CREATE TABLE data(id int AUTO_INCREMENT PRIMARY KEY, user_id int, value TEXT)")
	return db
}

var db *sqlx.DB

// main.goから呼ばれるエントリーポイント
func RunGrpc() {
	db = connectDB()

	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("listenに失敗しました: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterDBWriterServer(s, &server{})
	log.Printf("grpc server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("grpcサーバーの起動に失敗しました: %v", err)
	}
}
