# 開発環境の構築方法

## bfore you start

「.env ファイルください」と誰かに聞くか、以下の手順を実行してください

1. [Google Cloud の API とサービスの認証情報](https://console.cloud.google.com/apis/credentials)で`OAuth 2.0 クライアント ID`を作成します  
   `承認済みのJavaScript生成元`は`http://localhost:8080`, `承認済みのリダイレクト URI`は`http://localhost:8080/auth/callback`に設定します(本番環境は適宜 URL を変えてください)
2. `OAuthクライアント`を JSON 形式でダウンロードします
3. `backend/oauth_config.json`に配置します
4. `クライアントシークレット`を.env の`GOOGLE_CLIENT_SECRET`に記載します

## バックエンドの起動方法

以下コマンドを実行

```
docker compose up prod_back --build
```

正常に起動すると以下のようなログが出力されます

```
grpc_prod_back  | 2022/10/17 17:03:39 auth server listening at :3001
grpc_prod_back  | 2022/10/17 17:03:39 grpc server listening at [::]:50051
```

## 口動画生成サーバーの起動方法

[Windows 用バイナリファイル](https://github.com/jphacks/F_2213/releases/download/MouseGenerator_win64_1.0/GenMouseMovieServer_win64.exe)をダウンロードし実行してください。

正常に起動すると以下のようなログが出力されます

```
2022/10/30 02:09:12 grpc server listening at [::]:20768
```

詳しくは[こちら](./mouse/README.md)をご確認ください

## フロントエンドの起動方法

```
docker compose up prod_front --build
```

## 開発用 Docker の起動方法

以下コマンド実行後、VSCode でそれぞれのコンテナにアタッチしてください  
`/root/app`にソースコードがクローンされています

```
docker compose up dev_front dev_back envoy db
make start_dev_init
```

## 各サービスの仕様

- `localhost:8080`  
  バックエンドのエントリーポイントです。envoy を使ってそれぞれのバックエンドサーバーにプロキシされます。  
  `/localhost:8080/auth/login`にアクセスしたユーザーを Google の OAuth を使って認証し、認証が成功すると、`.env`の`NEXT_PUBLIC_AFTER_AUTH_URL`にリダイレクトさせます

## JWT の鍵について

本番環境で利用する場合は、鍵を作り直してください.

```
cd backend/resource
rm prolis_*.pem
ssh-keygen -t rsa -m PEM -f ./prolis_private.pem -P ''
ssh-keygen -m PEM -e -f prolis_private.pem > prolis_public.pem
rm prolis_private.pem.pub
```

- 公開鍵  
  `backend/resource/prolis_public.pem`
- 秘密鍵
  `backend/resource/prolis_private.pem`

## CI/CD について

このアプリケーションは GitHub Actions を用いて CD/CD を実現しています。  
`このリポジトリ > Settings > Environments`へ以下の値を設定してください

- `SSH_PRIVATE_KEY`  
  本番サーバーに ssh ログインするための秘密鍵
- `ENV_FILE_BASE64`  
  本番環境の`.env` ファイルを base64 エンコードしたもの  
  `base64 -i .env | tr -d '\n'`コマンドで作成してください
