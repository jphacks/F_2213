package main

import (
	"context"
	"fmt"

	pb "github.com/jphacks/F_2213/backend/grpc_out"
)

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return &pb.AudioList{}, nil
}

func (s *server) FetchUserInfo(ctx context.Context, in *pb.Empty) (*pb.User, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return user, nil
}
