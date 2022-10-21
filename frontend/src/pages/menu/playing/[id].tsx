import { Fab } from "@mui/material";
import { RpcError } from "grpc-web";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TopPageClientClient } from "../../../../grpc_out/GrpcServiceClientPb";
import { Audio, AudioList, Empty } from "../../../../grpc_out/grpc_pb";
import MovieAudioPlayer from "../../../components/MovieAudioPlayer";
import Styles from "../../../styles/playing.module.scss";
import { BACKEND_ORIGIN } from "../../sample_api";

const Playing = () => {
  // データを取ってくる．
  const router = useRouter();
  const {audioId} = router.query
  const [my_audio_infos, my_audio_infos_set] = useState<Audio>(new Audio())

  // 初回のみ実行
   useEffect(()=>{
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchAudioList(query, null, (err: RpcError, response: AudioList)=>{
      if(err){
        console.error(err.message);
      }else{
        if(typeof audioId !== "string"){
        console.error(err.message);
        return
        }
        const audioList = response.getAudiosList()
        const audio = audioList.find(v=>{v.getId() + "" ===  audioId});
        my_audio_infos_set(audio)
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const [indList, indListSet] = useState<number>(0);


  if (typeof window === "object") {
    document.oncontextmenu = function () {
      return false;
    };
  }
  const playingTag = my_audio_infos.getTagsList()[indList]

  return (
    <div className={Styles.papars_wrap}>
      <div className={Styles.papar_main}>
        <div className={Styles.papar_line}>
          <div className={Styles.wrap}>
            <div className={Styles.title}>{my_audio_infos.getAudioname()}</div>
            <div className={Styles.title}>{playingTag.getTagname()}</div>
            <MovieAudioPlayer
              source={my_audio_infos.getUrl()}
              startMs={playingTag.getStartms() * 1000}
              endMs={playingTag.getEndms() * 1000}
              tagNumber={indList}
            />
            <Fab
              variant="extended"
              onClick={() => {
                const tag_num = indList - 1;
                if (tag_num >= 0) {
                  indListSet(tag_num);
                }
              }}
            >
              前のタグ
            </Fab>
            <Fab
              variant="extended"
              onClick={() => {
                const tag_num = indList + 1;
                if (tag_num < my_audio_infos.getTagsList().length) {
                  indListSet(tag_num);
                }
              }}
            >
              次のタグ
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playing;
