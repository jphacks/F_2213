package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	pb "github.com/jphacks/F_2213/grpc"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"google.golang.org/grpc/metadata"
)

func parseJwtTokenFromCookie(ctx context.Context) (string, error) {
	// ctxからメタデータを取得
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", errors.New("メタデータを取得できませｎ")
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

func jwtToUser(parsedJwt jwt.Token) (*User, error) {
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

	return &User{id: id, email: email, name: name}, nil
}

func fetchAuthorizedUser(ctx context.Context) (*User, error) {
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

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return &pb.AudioList{}, nil
}
