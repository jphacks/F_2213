package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	pb "github.com/jphacks/F_2213/grpc"
	"google.golang.org/grpc/metadata"
)

func parseCookie(ctx context.Context) (string, error) {

	// リクエスト情報のMetadataを取得する
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", errors.New("メタデータを取得できませｎ")
	}

	// Cookie情報を取得する
	vs := md["cookie"]
	if len(vs) == 0 {
		return "", errors.New("クッキーが存在しません")
	}

	rawCookie := vs[0]

	// Cookieがない場合
	if len(rawCookie) == 0 {
		// 空を返す
		return "", nil
	}

	// Cookie情報をパースする
	parser := &http.Request{Header: http.Header{"cookie": []string{rawCookie}}}

	// 指定された名前のCookieを取得する
	cookie, err := parser.Cookie("sessionID")
	// エラーの場合
	if err != nil {
		// エラーを返す
		return "", err
	}

	// 取得したCookieのセッションIDを返す
	return cookie.Value, nil
}

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	cookie, err := parseCookie(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(cookie)

	return &pb.AudioList{}, nil
}
