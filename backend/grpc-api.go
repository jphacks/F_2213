package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	pb "github.com/jphacks/F_2213/backend/grpc_out"
)

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}

	rows, err := db.Queryx("Select * FROM audio WHERE user_id=?", user.Id)
	if err != nil {
		return nil, err
	}
	audioMap := map[int]*Audio{}
	for rows.Next() {
		audio := Audio{}
		err := rows.StructScan(&audio)
		if err != nil {
			return nil, err
		}
		audioMap[audio.Id] = &audio
	}

	rows, err = db.Queryx("Select tag.id as id, tag.user_id as user_id, audio_id, start_ms, end_ms, tag_name FROM audio JOIN tag WHERE audio.user_id=? AND audio.id = tag.audio_id", user.Id)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		tag := Tag{}
		err := rows.StructScan(&tag)
		if err != nil {
			return nil, err
		}
		audio, ok := audioMap[tag.AudioId]
		if !ok {
			return nil, errors.New("オーディオIDが存在しないtagがみつかりました")
		}
		if audio.TagList == nil {
			audio.TagList = []*Tag{&tag}
		} else {
			audio.TagList = append(audioMap[tag.Id].TagList, &tag)
		}
	}

	audioList := pb.AudioList{}
	audioList.AudioList = make([]*pb.Audio, len(audioMap))
	i := 0
	for _, v := range audioMap {
		jsonBytes, _ := json.Marshal(v)
		var pbAudio pb.Audio
		json.Unmarshal(jsonBytes, &pbAudio)
		audioList.AudioList[i] = &pbAudio
		i++
	}
	return &audioList, nil
}

func (s *server) FetchUserInfo(ctx context.Context, in *pb.Empty) (*pb.User, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return user, nil
}

func (s *server) DeleteTag(ctx context.Context, in *pb.TagId) (*pb.Status, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}
	res, err := db.Exec("DELETE FROM tag WHERE user_id=? AND id=?", user.Id, in.Id)
	if err != nil {
		return nil, err
	}

	status := pb.Status{}
	status.AffectedRowCnt, err = res.RowsAffected()
	if err != nil {
		return nil, err
	}
	return &status, nil
}

type Audio struct {
	Id          int    `db:"id"`
	UserId      string `db:"user_id"`
	AudioName   string `db:"audio_name"`
	Description string `db:"description"`
	Url         string `db:"url"`
	TagList     []*Tag
}
type Tag struct {
	Id      int    `db:"id"`
	UserId  string `db:"user_id"`
	AudioId int    `db:"audio_id"`
	StartMs int    `db:"start_ms"`
	EndMs   int    `db:"end_ms"`
	TagName string `db:"tag_name"`
}

func (s *server) UploadAudio(ctx context.Context, in *pb.Audio) (*pb.AudioId, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}

	audio := Audio{UserId: user.Id, AudioName: in.AudioName, Description: in.Description, Url: in.Url}
	fmt.Printf("%v\n", audio)
	res, err := db.NamedExec("INSERT INTO audio (user_id, audio_name, description, url) VALUES(:user_id, :audio_name, :description, :url)", audio)
	if err != nil {
		return nil, err
	}
	assignedId, _ := res.LastInsertId()
	for _, v := range in.TagList {
		tag := Tag{UserId: user.Id, AudioId: int(assignedId), StartMs: int(v.StartMs), EndMs: int(v.EndMs), TagName: v.TagName}
		_, err := db.NamedExec("INSERT INTO tag (user_id, audio_id, start_ms, end_ms, tag_name) VALUES(:user_id, :audio_id, :start_ms, :end_ms, :tag_name)", tag)
		if err != nil {
			return nil, err
		}
	}
	return &pb.AudioId{Id: assignedId}, nil
}
