import { MouseEvent, MouseEventHandler, useMemo, useState } from "react";
import styles from "styles/components/MiniAudioPlayer.module.scss";
import { getClickRatio } from "./function";
import { SectionSource, PlayStatus } from "./interface";
import { Fab, Slider } from "@mui/material";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { LinearProgress } from "@mui/material";

type orderStatus = "reg" | "rev";

const MiniAudioPlayer = ({ source, startMs, endMs }: SectionSource) => {
  const [playStatus, _setPlayStatus] = useState<PlayStatus>("paused");
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [audioProgress, _setAudioProgress] = useState<number>(0);
  const [isCursorDrag, setIsCursorDrag] = useState<boolean>(false);

  // プログレスバーの塗り具合を設定する。
  const setAudioProgress = (p: number) => {
    // Dragしているかどうかの例外処理
    if (isCursorDrag) return;
    _setAudioProgress(p);
  };

  // 曲を最初に戻す
  const backToStart = () => {
    audio.currentTime = startMs / 1000;
    setAudioProgress(0);
  };

  // 曲の再生, 停止
  const changeState = (newState: PlayStatus) => {
    _setPlayStatus(newState);
    if (newState === "playing") {
      audio.play();
    }
    if (newState === "paused") {
      audio.pause();
    }
  };

  // 最後まで再生したとき
  const onEnd = () => {
    backToStart();
    if (isRepeat) {
      audio.play();
    } else {
      changeState("paused");
    }
  };

  // Audioクラスを生成する
  const audio = useMemo<HTMLAudioElement>(() => {
    if (typeof Audio === "undefined") return undefined;
    return new Audio(source);
  }, [source]);

  // Audioクラスの各イベントを登録する
  if (typeof audio !== "undefined") {
    audio.ondurationchange = backToStart;
    audio.onended = onEnd;
    audio.ontimeupdate = () => {
      // 終了時間を過ぎた場合
      if (audio.currentTime * 1000 > endMs) {
        onEnd();
        return;
      }
      const duration = endMs - startMs;
      const currentTime = audio.currentTime * 1000 - startMs;
      setAudioProgress(currentTime / duration * 100);
    };
  }

  const handleChange = (event: Event, newValue: number) => {
    _setAudioProgress(newValue);
    const ratio = audioProgress / 100;
    const duration = (endMs - startMs) / 1000;
  };

  const handleChangeCommit = (event: Event, newValue: number) => {
    _setAudioProgress(newValue);
    const ratio = audioProgress / 100;
    const duration = (endMs - startMs) / 1000;
    audio.currentTime = duration * ratio + startMs / 1000;
  };

  return (
    <>
      <Slider value={audioProgress} onChange={handleChange} onChangeCommitted={handleChangeCommit} />
      <Slider aria-label="Volume" value={1} onChange={() => {}} />

      <Fab variant="extended" onClick={() => {}}>
        前のタグ
      </Fab>

      <Fab variant="extended" onClick={() => {}}>
        <FastRewindIcon /> -0.1
      </Fab>

      {playStatus === "playing" && (
        <Fab
          onClick={() => {
            changeState("paused");
          }}
        >
          <PauseIcon />;
        </Fab>
      )}
      {playStatus === "paused" && (
        <Fab
          onClick={() => {
            changeState("playing");
          }}
        >
          <PlayArrowIcon />;
        </Fab>
      )}

      <Fab variant="extended" onClick={() => {}}>
        + 0.1
        <FastForwardIcon />;
      </Fab>

      <Fab variant="extended" onClick={() => {}}>
        次のタグ
      </Fab>
    </>
  );
};
export default MiniAudioPlayer;

