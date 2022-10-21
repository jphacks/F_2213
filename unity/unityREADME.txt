流れ

unityディレクトリにSaveMouseファイルを作成し、コマンドプロンプトで
start mouse-image.exe (音楽ファイルの絶対パス)
すると、連番の画像がunity/SaveMouseに出来る。次に、
ffmpeg -framerate 40 -i ./SaveMouse/SavedMouse%d.png -vcodec libx264 -pix_fmt yuv420p -r 40 ./SaveMouse/hoge.mp4
これで、unity/SaveMouse に動画にしたやつ(hoge.mp4)が出来る。そして、
ffmpeg -i ./SaveMouse/hoge.mp4 -i (音楽ファイルのパス) -c:v copy ./CreatedMouse/hogehoge.mp4
すると、unity/CreatedMouse に音声と結合されたhogehoge.mp4が出来る。

その後、SaveMouseの中身を空にすれば初期に戻る。（又は、SaveMouse丸ごと削除→SaveMouse生成でもよい）

注意
・ffmpegはフリーソフトであり、ダウンロードが必要
・exeファイルを実行する際の音楽ファイルのパスは絶対パスでしか指定できない。他は相対でも絶対でも可。
