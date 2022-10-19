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

type Audio struct {
	Id          int    `db:"id"`
	User_id     string `db:"user_id"`
	Audio_name  string `db:"audio_name"`
	Description string `db:"description"`
	Url         string `db:"url"`
}
type Tag struct {
	Id       int    `db:"id"`
	User_id  string `db:"user_id"`
	Audio_id int    `db:"audio_id"`
	Start_ms int    `db:"start_ms"`
	End_ms   int    `db:"end_ms"`
	Tag_name string `db:"tag_name"`
}

func (s *server) UploadAudio(ctx context.Context, in *pb.Audio) (*pb.AudioId, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}

	audio := Audio{User_id: user.Id, Audio_name: in.AudioName, Description: in.Description, Url: in.Url}
	fmt.Printf("%v\n", audio)
	res, err := db.NamedExec("INSERT INTO audio (user_id, audio_name, description, url) VALUES(:user_id, :audio_name, :description, :url)", audio)
	if err != nil {
		return nil, err
	}
	assignedId, _ := res.LastInsertId()
	for _, v := range in.TagList {
		tag := Tag{User_id: user.Id, Audio_id: int(assignedId), Start_ms: int(v.StartMs), End_ms: int(v.EndMs), Tag_name: v.TagName}
		_, err := db.NamedExec("INSERT INTO tag (user_id, audio_id, start_ms, end_ms, tag_name) VALUES(:user_id, :audio_id, :start_ms, end_ms, :tag_name)", tag)
		if err != nil {
			return nil, err
		}
	}
	return &pb.AudioId{Id: assignedId}, nil
}
