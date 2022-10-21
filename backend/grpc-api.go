package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"

	pb "github.com/jphacks/F_2213/backend/grpc_out"
)

func convertInterface[T any](in interface{}) T {
	jsonBytes, _ := json.Marshal(in)
	var out T
	json.Unmarshal(jsonBytes, &out)
	return out
}

func (s *server) FetchAudioList(ctx context.Context, in *pb.Empty) (*pb.AudioList, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}

	rows, err := db.Queryx("Select * FROM audio WHERE user_id=?", user.Id)
	if err != nil {
		return nil, err
	}
	audioMap := map[int]*pb.Audio{}
	for rows.Next() {
		audio := Audio{}
		err := rows.StructScan(&audio)
		if err != nil {
			return nil, err
		}
		pbAudio := convertInterface[pb.Audio](audio)
		audioMap[audio.Id] = &pbAudio
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
		pbTag := convertInterface[pb.Tag](tag)
		if audio.Tags == nil {
			audio.Tags = []*pb.Tag{&pbTag}
		} else {
			audio.Tags = append(audioMap[tag.Id].Tags, &pbTag)
		}
	}

	audioList := pb.AudioList{}
	audioList.Audios = make([]*pb.Audio, len(audioMap))
	i := 0
	for _, v := range audioMap {
		audioList.Audios[i] = v
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

func (s *server) DeleteAudio(ctx context.Context, in *pb.AudioId) (*pb.Status, error) {
	user, err := fetchAuthorizedUser(ctx)
	if err != nil {
		return nil, err
	}

	res, err := db.Exec("DELETE FROM audio WHERE user_id=? AND id=?", user.Id, in.Id)
	if err != nil {
		return nil, err
	}
	status := pb.Status{}
	status.AffectedRowCnt, err = res.RowsAffected()
	if err != nil {
		return nil, err
	}

	_, err = db.Exec("DELETE FROM tag WHERE user_id=? AND audio_id=?", user.Id, in.Id)
	if err != nil {
		return nil, err
	}

	return &status, nil
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
	for _, v := range in.Tags {
		tag := Tag{UserId: user.Id, AudioId: int(assignedId), StartMs: int(v.StartMs), EndMs: int(v.EndMs), TagName: v.TagName}
		_, err := db.NamedExec("INSERT INTO tag (user_id, audio_id, start_ms, end_ms, tag_name) VALUES(:user_id, :audio_id, :start_ms, :end_ms, :tag_name)", tag)
		if err != nil {
			return nil, err
		}
	}
	return &pb.AudioId{Id: assignedId}, nil
}

func generateMovieMicroService(audioPath string) (string, error) {
	stream, err := uploadhalder.UploadAudioFile(context.Background())
	if err != nil {
		return "", err
	}

	// 送信用ファイル取得
	file, _ := os.Open(audioPath)
	defer file.Close()
	buf := make([]byte, 1024)

	// 送信
	for {
		_, err := file.Read(buf)
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", err
		}
		err = stream.Send(&pb.AudioFile{Data: buf})
		if err != nil {
			return "", err
		}
	}
	stream.CloseSend()

	// 受信用ファイル生成
	if err != nil {
		return "", err
	}
	generatedVideoName := genRandomStr() + ".mp4"
	generatedVideoPath := filepath.Join("/root/static", generatedVideoName)
	receivedFile, err := os.Create(generatedVideoPath)
	defer receivedFile.Close()
	if err != nil {
		return "", err
	}

	// 受信
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", err
		}
		_, err = receivedFile.Write(resp.Data)
		if err != nil {
			return "", err
		}
	}
	return generatedVideoName, nil
}

func (s *server) GenerateMovie(in *pb.AudioUrl, stream pb.TopPageClient_GenerateMovieServer) error {
	// TODO ユーザーがログインかどうか確かめていない
	audioName := filepath.Base(in.Url)
	audioPath := filepath.Join("/root/static", audioName)

	videoPath, err := generateMovieMicroService(audioPath)
	if err != nil {
		return err
	}

	stream.Send(&pb.MovieUrl{Url: BACKEND_ORIGIN + "/img/show/" + videoPath})
	return nil
}
