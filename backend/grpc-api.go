package main

import (
	"context"
	"fmt"
	"log"

	pb "github.com/jphacks/F_2213/grpc"
)

func (s *server) CreateNewUser(ctx context.Context, in *pb.User) (*pb.User, error) {
	res, _ := db.NamedExec("INSERT INTO user (name, email) VALUES(:name, :email)", in)
	userId, _ := res.LastInsertId()
	newUser := *in
	newUser.Id = userId
	log.Println(newUser)
	return &newUser, nil
}

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return &pb.AudioList{}, nil
}
