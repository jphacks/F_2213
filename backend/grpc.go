package main

import (
	"context"
	"crypto/rsa"
	"crypto/x509"
	_ "embed"
	"encoding/pem"
	"errors"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	pb "github.com/jphacks/F_2213/backend/grpc_out"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

func parseJwtTokenFromCookie(ctx context.Context) (string, error) {
	// ctxからメタデータを取得
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", errors.New("メタデータを取得できません")
	}

	// Cookie情報を取得
	vs := md["cookie"]
	if len(vs) == 0 {
		return "", errors.New("クッキーが存在しません")
	}

	// 全Cookieの文字列
	rawCookie := vs[0]
	if len(rawCookie) == 0 {
		return "", errors.New("クッキーが存在しません")

	}

	// Cookie情報をパースする
	parser := &http.Request{Header: http.Header{"Cookie": []string{rawCookie}}}
	cookie, err := parser.Cookie("JWT_TOKEN")
	if err != nil {
		return "", err
	}

	// JWT_TOKENを返却
	return cookie.Value, nil
}

func jwtToUser(parsedJwt jwt.Token) (*pb.User, error) {
	rawEmail, ok := parsedJwt.Get("email")
	if !ok {
		return nil, errors.New("parse error: email")
	}
	rawName, ok := parsedJwt.Get("name")
	if !ok {
		return nil, errors.New("parse error: name")
	}
	rawId, ok := parsedJwt.Get("id")
	if !ok {
		return nil, errors.New("parse error: id")
	}

	email, ok := rawEmail.(string)
	if !ok {
		return nil, errors.New("cast error: email")
	}
	name, ok := rawName.(string)
	if !ok {
		return nil, errors.New("cast error: name")
	}
	id, ok := rawId.(string)
	if !ok {
		return nil, errors.New("cast error: id")
	}

	return &pb.User{Id: id, Email: email, Name: name}, nil
}

func fetchAuthorizedUserHttp(r *http.Request) (*pb.User, error) {
	cookie, err := r.Cookie("JWT_TOKEN")
	if err != nil {
		return nil, err
	}
	signedJwt := cookie.Value
	parsedJwt, err := jwt.Parse([]byte(signedJwt), jwt.WithKey(jwa.RS256, publicKey))
	if err != nil {
		return nil, err
	}
	user, err := jwtToUser(parsedJwt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func fetchAuthorizedUser(ctx context.Context) (*pb.User, error) {
	signedJwt, err := parseJwtTokenFromCookie(ctx)
	if err != nil {
		return nil, err
	}
	parsedJwt, err := jwt.Parse([]byte(signedJwt), jwt.WithKey(jwa.RS256, publicKey))
	if err != nil {
		return nil, err
	}
	user, err := jwtToUser(parsedJwt)
	if err != nil {
		return nil, err
	}
	return user, nil
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

	return db
}

var db *sqlx.DB

//go:embed resource/prolis_public.pem
var publicPemBytes []byte
var publicKey *rsa.PublicKey

type server struct {
	pb.UnimplementedTopPageClientServer
}

var uploadhalder pb.MouseClient

// main.goから呼ばれるエントリーポイント
func RunGrpc() {
	// dbに接続する
	db = connectDB()

	// 動画生成サービスに接続
	MOUSE_GEN_SERVER_URL := getEnv("MOUSE_GEN_SERVER_URL", "")
	if MOUSE_GEN_SERVER_URL == "" {
		log.Fatalln("MOUSE_GEN_SERVER_URL環境変数が見つかりません")
	}
	connect, _ := grpc.Dial(MOUSE_GEN_SERVER_URL, grpc.WithInsecure())
	defer connect.Close()
	uploadhalder = pb.NewMouseClient(connect)

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
