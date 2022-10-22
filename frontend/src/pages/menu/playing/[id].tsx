import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Fab } from "@mui/material";
import { RpcError } from "grpc-web";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TopPageClientClient } from "../../../../grpc_out/GrpcServiceClientPb";
import { Audio, AudioList, Empty, Tag } from "../../../../grpc_out/grpc_pb";
import Styles from "../../../../styles/playing.module.scss";
import MovieAudioPlayer from "../../../components/MovieAudioPlayer";
import { BACKEND_ORIGIN } from "../../sample_api";

const Playing = () => {
  // データを取ってくる．
  const router = useRouter();
  const { audioId } = router.query;
  const [my_audio_infos, my_audio_infos_set] = useState<Audio>(new Audio());

  // 初回のみ実行
  useEffect(() => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchAudioList(query, null, (err: RpcError, response: AudioList) => {
      if (err) {
        console.error(err.message);
      } else {
        if (typeof audioId !== "string") {
          console.error(err.message);
          return;
        }
        const audioList = response.getAudiosList();
        const audio = audioList.find((v) => {
          v.getId() + "" === audioId;
        });
        my_audio_infos_set(audio);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [indList, indListSet] = useState<number>(0);

  if (typeof window === "object") {
    document.oncontextmenu = function () {
      return false;
    };
  }
  // TODO: 見つかりませんなどのメッセージを出す
  console.log(my_audio_infos);
  const playingTag = my_audio_infos.getTagsList()[indList] || new Tag();

  return (
    <>
      <style jsx>{`
        .papars_wrap {
          width: 80%;
          height: 90%;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-top: 70px solid ${my_audio_infos.getDescription()};
        }
      `}</style>
      <div className="papars_wrap">
        <div className={Styles.papar_main}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>
                音声 : {my_audio_infos.getAudioname()}
              </div>
              <div className={Styles.tagtitle}>
                タグ {indList + 1} : {playingTag.getTagname()}
              </div>
              <MovieAudioPlayer
                source={my_audio_infos.getAudioname()}
                startMs={playingTag.getStartms()}
                endMs={playingTag.getEndms()}
                tagNumber={indList}
              />

              <div className={Styles.button_wrap}>
                <Fab
                  className={Styles.button}
                  variant="extended"
                  onClick={() => {
                    const tag_num = indList - 1;
                    if (tag_num >= 0) {
                      indListSet(tag_num);
                    }
                  }}
                >
                  <NavigateBeforeIcon />
                  前のタグ
                </Fab>
                <Fab
                  className={Styles.button}
                  variant="extended"
                  onClick={() => {
                    const tag_num = indList + 1;
                    if (tag_num < my_audio_infos.getTagsList().length) {
                      indListSet(tag_num);
                    }
                  }}
                >
                  次のタグ
                  <NavigateNextIcon />
                </Fab>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playing;
