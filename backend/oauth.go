package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	_ "embed"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

//go:embed resource/prolis_private.pem
var pemBytes []byte
var privateKey *rsa.PrivateKey

//go:embed resource/oauth_config.json
var configOAuth []byte
var conf *oauth2.Config

// main.goから呼ばれるエントリーポイント
func RunOAuthServer() {
	// JWT設定
	block, _ := pem.Decode(pemBytes)
	var err error
	privateKey, err = x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		log.Fatalf("failed to parse private key: %s", err)
	}

	// OAuth設定
	conf, err = google.ConfigFromJSON(configOAuth, "openid", "email", "profile")
	if err != nil {
		log.Fatalln("backend/oauth_config.jsonが存在しません")
	}
	if conf.ClientSecret = getEnv("GOOGLE_CLIENT_SECRET", "NONE"); conf.ClientSecret == "NONE" {
		log.Fatalln("GOOGLE_CLIENT_SECRET環境変数が存在しません。.envが読み込まれているか確認してください")
	}

	// サーバー起動
	http.HandleFunc("/login", login)
	http.HandleFunc("/callback", callback)
	err = http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatalf("httpサーバーの起動に失敗しました %v", err)
	}
}

func genRandomStr() string {
	b := make([]byte, 128)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}

func login(w http.ResponseWriter, r *http.Request) {
	// stateをクッキーに保存
	state := genRandomStr()
	cookie := &http.Cookie{
		Name:     "STATE",
		Value:    fmt.Sprintf("%s", state),
		Path:     "/",
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)

	// リダイレクト
	url := conf.AuthCodeURL(state)
	fmt.Printf("リダイレクトURL: %v\n", url)
	http.Redirect(w, r, url, 302)
}

type OAuthUser struct {
	Id    string `json:"sub"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func callback(w http.ResponseWriter, r *http.Request) {
	// stateが同一かチェックする
	query := r.URL.Query()
	state, err := r.Cookie("STATE")
	if state.Value == "" || err != nil || state.Value != query.Get("state") {
		log.Fatalf("stateの検証に失敗しました expected: %v actual: %v \n error: ", query.Get("state"), state, err)
	}

	// トークン取得
	code := query.Get("code")
	tok, err := conf.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Fatalf("トークンの取得に失敗しました code: %v \n error: %v", code, err)
	}

	// ユーザー情報取得
	client := conf.Client(oauth2.NoContext, tok)
	res, err := client.Get("https://openidconnect.googleapis.com/v1/userinfo")
	if err != nil {
		log.Fatal("ユーザー情報の取得に失敗しました", err)
	}
	defer res.Body.Close()
	byteArray, _ := io.ReadAll(res.Body)
	user := OAuthUser{}
	json.Unmarshal(byteArray, &user)

	// ユーザー情報からJWTを生成
	token := jwt.New()
	token.Set("id", user.Id)
	token.Set("name", user.Name)
	token.Set("email", user.Email)
	signed, err := jwt.Sign(token, jwt.WithKey(jwa.RS256, privateKey))
	if err != nil {
		log.Fatalf("error jwt.Sign: %w", err)
		return
	}

	// JWTをクッキーにセット
	cookie := &http.Cookie{
		Name:     "JWT_TOKEN",
		Value:    fmt.Sprintf("%s", signed),
		Path:     "/",
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)

	// リダイレクト
	redirectUrl := getEnv("NEXT_PUBLIC_AFTER_AUTH_URL", "NONE")
	if redirectUrl == "NONE" {
		log.Fatalln("NEXT_PUBLIC_AFTER_AUTH_URL環境変数が存在しません。.envが読み込まれているか確認してください")
	}
	http.Redirect(w, r, redirectUrl, 302)
}
