package main

import (
	"context"
	"crypto/rsa"
	"crypto/x509"
	_ "embed"
	"encoding/pem"
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	pb "github.com/jphacks/F_2213/grpc"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedTopPageClientServer
}

type User struct {
	id    string `db:"id"`
	name  string `db:"name"`
	email string `db:"email"`
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
		log.Fatalln("mysql との通信が確保できません", err)
		os.Exit(1)
	}

	db.Exec("CREATE TABLE user(id int AUTO_INCREMENT PRIMARY KEY, name TEXT, email TEXT)")
	db.Exec("CREATE TABLE data(id int AUTO_INCREMENT PRIMARY KEY, user_id int, value TEXT)")
	return db
}

var db *sqlx.DB

//go:embed resource/prolis_public.pem
var publicPemBytes []byte
var publicKey *rsa.PublicKey

// main.goから呼ばれるエントリーポイント
func RunGrpc() {
	// dbに接続する
	db = connectDB()

	// publicキーを読み込む
	block, _ := pem.Decode(publicPemBytes)
	var err error
	publicKey, err = x509.ParsePKCS1PublicKey(block.Bytes)
	if err != nil {
		log.Fatalf("failed to parse public key: %s", err)
	}

	// tcpをlistenする
	flag.Parse()
	port := flag.Int("port", 50051, "The server port")
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("listenに失敗しました: %v", err)
	}

	// grpcサーバーを登録する
	s := grpc.NewServer()
	pb.RegisterTopPageClientServer(s, &server{})
	log.Printf("grpc server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("grpcサーバーの起動に失敗しました: %v", err)
	}
}
