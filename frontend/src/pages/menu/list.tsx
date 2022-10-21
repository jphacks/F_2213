import Link from "next/link";
import { useState } from "react";
import Styles from "../../../styles/list.module.scss";
import Audiotag from "../../components/audio-tag";
import Editpapar from "../../components/edit-papar";
import { AudioInfo, SectionInfo } from "../../components/interface";

/* example */

const demolist: SectionInfo[] = [
  { name: "zzz", start: 2, end: 3 },
  { name: "aaa", start: 1, end: 2 },
];
const demo = new AudioInfo(
  "タイトル1",
  "/sm1.mp3",
  "#b2f1a3",
  "テストです....",
  demolist
);

const demolist2: SectionInfo[] = [
  { name: "あああ", start: 2000, end: 3000 },
  { name: "ががが", start: 5000, end: 20000 },
];

const demo2 = new AudioInfo(
  "タイトル2",
  "/FTampa_EDM_Sux.mp3",
  "#fff",
  "テストですよ！",
  demolist2
);

const audiodemolists = [demo, demo2];

const List = () => {
  const [hoveringDemo, setHoveringDemo] = useState<AudioInfo>(demo2);
  const distplay_tags = audiodemolists.map((x: AudioInfo) => (
    <Audiotag
      key={x.uuid}
      audio_info={x}
      handleHover={() => {
        if (hoveringDemo !== x) {
          setHoveringDemo(x);
        }
      }}
    ></Audiotag>
  ));

  return (
    <div className={Styles.wrap_all}>
      <div className={Styles.papars_wrap}>
        <Link href="./setting">
          <div className={Styles.papar_third}>Setting</div>
        </Link>
        <Link href="./making/upload">
          <div className={Styles.papar_second}>Upload</div>
        </Link>
        <div className={Styles.papar_main}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>List</div>
              {distplay_tags}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.editpapar_wrap}>
        <Editpapar audio_info={hoveringDemo}></Editpapar>
      </div>
    </div>
  );
};

export default List;
