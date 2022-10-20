# 開発環境の構築方法

## bfore you start

1. [Google Cloud の API とサービスの認証情報](https://console.cloud.google.com/apis/credentials)で`OAuth 2.0 クライアント ID`を作成します
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

## フロントエンドの起動方法

TODO

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
