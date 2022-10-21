package main

import (
	_ "embed"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var BACKEND_ORIGIN string

// main.goから呼ばれるエントリーポイント
func RunImageServer() {
	BACKEND_ORIGIN = getEnv("NEXT_PUBLIC_BACKEND_ORIGIN", "")
	if BACKEND_ORIGIN == "" {
		log.Fatalln("NEXT_PUBLIC_BACKEND_ORIGIN環境変数が見つかりません")
	}

	// サーバー起動
	http.HandleFunc("/upload", upload)

	fs := http.FileServer(http.Dir("/root/static"))
	http.Handle("/show/", http.StripPrefix("/show/", fs))

	log.Printf("image server listening at %v", ":3002")
	err := http.ListenAndServe(":3002", nil)
	if err != nil {
		log.Fatalf("httpサーバーの起動に失敗しました %v", err)
	}
}

func upload(w http.ResponseWriter, r *http.Request) {
	_, err := fetchAuthorizedUserHttp(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Allowed POST method only", http.StatusMethodNotAllowed)
		return
	}

	err = r.ParseMultipartForm(32 << 20) // maxMemory
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	file, fileheader, err := r.FormFile("upload")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	os.MkdirAll("/root/static", os.ModePerm)
	filename := genRandomStr() + filepath.Ext(fileheader.Filename)
	destination := filepath.Join("/root/static", filename)
	f, err := os.Create(destination)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer f.Close()

	io.Copy(f, file)
	w.Write([]byte(BACKEND_ORIGIN + "/img/show/" + filename))
}
