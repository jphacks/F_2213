import Styles from "../../../styles/playing.module.scss";
import { useState } from "react";
import MovieAudioPlayer from "../../components/MovieAudioPlayer";
import { AudioInfo, SectionInfo } from "../../components/interface";
import { Fab } from "@mui/material";

const Playing = () => {
  // データを取ってくる．
  
  const [indList, indListSet] = useState<number>(0);
  const my_audio_list: SectionInfo[] = [
    { name: "zzz", start: 1, end: 3 },
    { name: "aaa", start: 0, end: 5 },
  ];

  const my_audio_infos = new AudioInfo(
    "タイトル1",
    "/s.mp4", // 音声を動画にする．
    "#b2f1a3",
    "テストです....",
    my_audio_list
  );

  if (typeof window === "object") {
    document.oncontextmenu = function () {
      return false;
    };
  }
  console.log(indList)

  return (
    <div className={Styles.papars_wrap}>
      <div className={Styles.papar_main}>
        <div className={Styles.papar_line}>
          <div className={Styles.wrap}>
            <div className={Styles.title}>{my_audio_infos.title}</div>
            <div className={Styles.title}>{my_audio_list[indList].name}</div>
            <MovieAudioPlayer
              source={my_audio_infos.audioroute}
              startMs={my_audio_list[indList].start * 1000}
              endMs={my_audio_list[indList].end * 1000}
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
                if (tag_num < my_audio_list.length) {
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
