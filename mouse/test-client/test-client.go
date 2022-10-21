package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	pb "github.com/jphacks/F_2213/mouse/grpc_out"
	"google.golang.org/grpc"
)

func main() {
	connect, _ := grpc.Dial("localhost:50052", grpc.WithInsecure())

	defer connect.Close()
	uploadhalder := pb.NewMouseClient(connect)
	stream, err := uploadhalder.UploadAudioFile(context.Background())
	err = Upload(stream)
	if err != nil {
		fmt.Println(err)
	}
}

func Upload(stream pb.Mouse_UploadAudioFileClient) error {
	file, _ := os.Open("./hoge.mp3")
	defer file.Close()
	buf := make([]byte, 1024)

	for {
		_, err := file.Read(buf)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}
		err = stream.Send(&pb.AudioFile{Data: buf})
		if err != nil {
			return err
		}
	}
	stream.CloseSend()

	err := os.MkdirAll("Sample", 0777)
	if err != nil {
		return err
	}
	receivedFile, err := os.Create(filepath.Join("Sample", "tmp.mp3"))
	defer receivedFile.Close()
	if err != nil {
		return err
	}

	// 受信
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}
		_, err = receivedFile.Write(resp.Data)
		if err != nil {
			return err
		}
	}
	return nil
}
