import Soundtag from "../../components/sound-tag";
import Styles from "../../../styles/sound-list.module.scss";
import React from "react";
import { v4 as uuidv4 } from "uuid";

class TagInfo {
  uuid = uuidv4(); // 実装したけど今のところ使ってない．
  title: string;
  soundroute: string;
  color: string;
  constructor(title: string, soundroute: string, color: string) {
    this.title = title;
    this.soundroute = soundroute;
    this.color = color;
  }
}

export default () => {
  const demo = new TagInfo("タイトル1", "../../../public/sm1.mp3", "green");
  const demo2 = new TagInfo("タイトル2", "../../../public/sm1.mp3", "red");
  return (
    <div className={Styles.wrapall}>
      <div className={Styles.note}>
        <div className={Styles.note_line}>
          <Soundtag soundls={demo}></Soundtag>
          <Soundtag soundls={demo2}></Soundtag>
        </div>
      </div>
      <div className={Styles.note}></div>
    </div>
  );
};
