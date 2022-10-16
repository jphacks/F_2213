# 開発環境の構築方法

## bfore you start
1. [Google CloudのAPIとサービスの認証情報](https://console.cloud.google.com/apis/credentials)で`OAuth 2.0 クライアント ID`を作成します
2. `OAuthクライアント`をJSON形式でダウンロードします
3. `backend/oauth_config.json`に配置します
4. `クライアントシークレット`を.envの`GOOGLE_CLIENT_SECRET`に記載します

## JWTの鍵について
本番環境で利用する場合は、鍵を作り直してください.
```
ssh-keygen -t rsa -m PEM
```

* 公開鍵  
  `backend/prolis_public.pem`
* 秘密鍵
  `backend/prolis_private.pem`