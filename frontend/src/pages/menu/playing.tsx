import Styles from "../../../styles/playing.module.scss";
import { Fab } from "@mui/material";
import { useState } from "react";
import MovieAudioPlayer from "../../components/MovieAudioPlayer";

const Playing = () => {
  // データを取ってくる．

  if (typeof window === "object") {
    document.oncontextmenu = function () {
      return false;
    };

    const videoElement = document.querySelector("video");

    const btn_play = document.getElementById("btn_play");
    const btn_pause = document.getElementById("btn_pause");
    const btn_back = document.getElementById("btn_back");
    const btn_forward = document.getElementById("btn_forward");

    // btn_play.addEventListener("click", (e) => {
    //   console.log("a");
    //   videoElement.play();
    // });

    // // 一時停止ボタンを押したとき
    // btn_pause.addEventListener("click", (e) => {
    //   videoElement.pause();
    // });

    // // 10秒前ボタンを押したとき
    // btn_back.addEventListener("click", (e) => {
    //   videoElement.currentTime -= 10;
    // });

    // // 10秒後ボタンを押したとき
    // btn_forward.addEventListener("click", (e) => {
    //   videoElement.currentTime += 10;
    // });
  }

  return (
    <div className={Styles.papars_wrap}>
      <div className={Styles.papar_main}>
        <div className={Styles.papar_line}>
          <div className={Styles.wrap}>
            <div className={Styles.title}>List</div>
            <video src="/s.mp4" className={Styles.title}>
              List
            </video>
            <MovieAudioPlayer source={"/FTampa_EDM_Sux.mp3"} startMs={0} endMs={5000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playing;
