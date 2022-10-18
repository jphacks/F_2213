package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	pb "github.com/jphacks/F_2213/grpc"
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

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	cookie, err := parseJwtTokenFromCookie(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(cookie)

	return &pb.AudioList{}, nil
}
