package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"path/filepath"

	pb "github.com/jphacks/F_2213/mouse/grpc_out"
	"google.golang.org/grpc"
)

func main() {
	// tcpをlistenする
	flag.Parse()
	port := flag.Int("port", 50052, "The server port")
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("listenに失敗しました: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterMouseServer(s, &server{})
	log.Printf("grpc server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("grpcサーバーの起動に失敗しました: %v", err)
	}
}

type server struct {
	pb.UnimplementedMouseServer
}

func (s *server) UploadAudioFile(stream pb.Mouse_UploadAudioFileServer) error {
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
	log.Println("received")

	// 送信
	sendFile, _ := os.Open("./hoge.mp3")
	defer sendFile.Close()
	buf := make([]byte, 1024)

	for {
		_, err := sendFile.Read(buf)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}
		err = stream.Send(&pb.VideoFile{Data: buf})
		if err != nil {
			return err
		}
	}
	log.Println("send")
	return nil
}
