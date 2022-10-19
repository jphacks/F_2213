import Audiotag from "../../components/audio-tag";
import Editpapar from "../../components/edit-papar";
import Styles from "../../../styles/audio-list.module.scss";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";


type AudioInfo = {
  name: string;
  start: number;
  end: number;
};

export class TagInfo {
  uuid = uuidv4();
  title: string;
  memo: string;
  audioroute: string;
  color: string;
  audios: AudioInfo[];

  constructor(
    title: string,
    audioroute: string,
    color: string,
    memo: string,
    audios: AudioInfo[]
  ) {
    this.title = title;
    this.audioroute = audioroute;
    this.color = color;
    this.memo = memo;
    this.audios = audios;
    this.audios.sort((a, b) => a.start - b.start);
  }
}

/* === */

const demolist: AudioInfo[] = [
  { name: "zzz", start: 1, end: 10 },
  { name: "aaa", start: 15, end: 20 },
];
const demo = new TagInfo(
  "タイトル1",
  "../../../public/sm1.mp3",
  "#b2f1a3",
  "テストです....",
  demolist
);

const demolist2: AudioInfo[] = [
  { name: "あああ", start: 1, end: 20 },
  { name: "ががが", start: 1, end: 10 },
];
module;
const demo2 = new TagInfo(
  "タイトル2",
  "../../../public/sm1.mp3",
  "red",
  "テストです....",
  demolist2
);

const audiodemolists = [demo, demo2];


export default () => {
  let display_card: TagInfo; // hoverしたときにhoverしたときのTagInfoを受け取って入れる．


  const distplay_tags = audiodemolists.map((x: TagInfo) => (
    <Audiotag key={x.uuid} audiols={x}></Audiotag>
  ));

  return (
    <div className={Styles.wrap_all}>
      <div className={Styles.papars_wrap}>
        <Link href="./user-setting">
          <div className={Styles.papar_st}>Setting</div>
        </Link>
        <Link href="./audio-upload">
          <div className={Styles.papar_up}>Upload</div>
        </Link>
        <div className={Styles.papar_ls}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>List</div>
              {distplay_tags}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.editpapar_wrap}>
        <Editpapar audiols={demo}></Editpapar>
      </div>
    </div>
  );
};

