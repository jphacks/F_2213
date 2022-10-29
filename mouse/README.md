# 口動画生成サーバー

バックエンドサーバーからの要求に応じて、Unity でビルドした mouse-image.exe を使用して口の動きの動画を生成します

## (推奨)使用方法 1(バイナリ)

[Windows 用バイナリファイル](https://github.com/jphacks/F_2213/releases/download/MouseGenerator_win64_1.0/GenMouseMovieServer_win64.exe)をダウンロードし実行する

## 使用方法 2(ローカルビルド)

1. このリポジトリをクローンする
2. `mouse`ディレクトリ配下で`go run main.go`を実行する

## 使用方法 3(ローカルビルド)

1. このリポジトリをクローンする
2. `unity`ディレクトリを Unity でビルド後、生成ファイルを`mouse/UnityBuild`配下に展開する。
3. `mouse/UnityBuild/SaveMouse`という空ディレクトリを作成しておく
4. `mouse`ディレクトリ配下で`go run main.go`を実行する
