package main

import (
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"os/exec"
	"path/filepath"

	pb "github.com/jphacks/F_2213/mouse/grpc_out"
	"google.golang.org/grpc"
)

func main() {
	// tcpをlistenする
	flag.Parse()
	port := flag.Int("port", 20768, "The server port")
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

var uniqueNumber = 0

func getUniqueStr() string {
	uniqueNumber++
	return "auto_gen_" + fmt.Sprint(uniqueNumber) + "_"
}

func deleteFileWithWildCard(target string) {
	// 再帰なし
	files, _ := filepath.Glob(target)
	for _, f := range files {
		os.Remove(f)
	}
}

func (s *server) UploadAudioFile(stream pb.Mouse_UploadAudioFileServer) error {
	uniqueStr := getUniqueStr()
	defer deleteFileWithWildCard(filepath.Join("Tmp", uniqueStr+".mp3"))
	defer deleteFileWithWildCard("./UnityBuild/SaveMouse/" + uniqueStr + "*.png")
	defer deleteFileWithWildCard("./Tmp/" + uniqueStr + ".mp4")
	defer deleteFileWithWildCard("./Tmp/" + uniqueStr + "out.mp4")

	err := os.MkdirAll("Tmp", 0777)
	if err != nil {
		return err
	}
	receivedFile, err := os.Create(filepath.Join("Tmp", uniqueStr+".mp3"))
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

	err = runUnity(uniqueStr)
	if err != nil {
		return err
	}
	err = runImgToMp4(uniqueStr)
	if err != nil {
		return err
	}
	err = combineMp4AndMp3(uniqueStr)
	if err != nil {
		return err
	}

	// 送信
	sendFile, _ := os.Open("./Tmp/" + uniqueStr + "out.mp4")
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

func runUnity(uniqueStr string) error {
	currentDir, _ := os.Getwd()
	inputAudio := currentDir + "/Tmp/" + uniqueStr + ".mp3"
	fmt.Println(inputAudio)
	_, err := exec.Command("./UnityBuild/mouse-image.exe", inputAudio, uniqueStr).Output()
	if err != nil {
		return errors.New("unity の実行に失敗しました")
	}
	return nil
}

func runImgToMp4(uniqueStr string) error {
	options := []string{
		"-framerate",
		"40",
		"-i",
		"./UnityBuild/SaveMouse/" + uniqueStr + "%d.png",
		"-vcodec",
		"libx264",
		"-pix_fmt",
		"yuv420p",
		"-r",
		"40",
		"./Tmp/" + uniqueStr + ".mp4",
	}
	_, err := exec.Command("ffmpeg", options...).Output()
	if err != nil {
		return errors.New("png -> mp4の変換に失敗しました")
	}
	return nil
}

func combineMp4AndMp3(uniqueStr string) error {
	options := []string{
		"-i",
		"./Tmp/" + uniqueStr + ".mp4",
		"-i",
		filepath.Join("Tmp", uniqueStr+".mp3"),
		"-c:v",
		"copy",
		"./Tmp/" + uniqueStr + "out.mp4",
	}
	_, err := exec.Command("ffmpeg", options...).Output()
	if err != nil {
		return errors.New("mp4の音声追加に失敗しました")
	}
	return nil
}
