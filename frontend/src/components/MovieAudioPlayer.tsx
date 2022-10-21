import { useMemo, useState, useRef, useEffect } from "react";
import styles from "styles/components/MovieAudioPlayer.module.scss";
import { SectionSource, PlayStatus } from "./interface";
import { Fab, Slider } from "@mui/material";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

const MiniVideoPlayer = ({ source, startMs, endMs, tagNumber }: SectionSource) => {
  const [playStatus, _setPlayStatus] = useState<PlayStatus>("paused");
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [audioProgress, _setVideoProgress] = useState<number>(0);
  const [isCursorDrag, setIsCursorDrag] = useState<boolean>(false);
  const [currentTime, _setCurrentTime] = useState<number>(startMs);
  const [volumeProgress, _setVolumeProgress] = useState<number>(100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);

  useEffect(()=>{
    // 次のタグに移動したときに呼ばれる
    changeState("paused");
    backToStart();
  },[tagNumber])

  const setVideoProgress = (p: number) => {
    if (isCursorDrag) return;
    _setVideoProgress(p);
  };

  const backToStart = () => {
    videoRef.current.currentTime = startMs / 1000;
    setVideoProgress(0);
  };

  const changeState = (newState: PlayStatus) => {
    _setPlayStatus(newState);
    if (newState === "playing") {
      if (videoRef.current.currentTime === 0) {
        videoRef.current.currentTime = startMs / 1000;
      }
      videoRef.current.play();
    }
    if (newState === "paused") {
      videoRef.current.pause();
    }
  };

  const onEnd = () => {
    backToStart();
    if (isRepeat) {
      videoRef.current.play();
    } else {
      changeState("paused");
    }
  };

  if (videoRef.current) {
    videoRef.current.ondurationchange = backToStart;
    videoRef.current.onended = onEnd;
    videoRef.current.ontimeupdate = () => {
      if (videoRef.current.currentTime * 1000 > endMs) {
        onEnd();
        return;
      }
      const duration = endMs - startMs;
      const currentTime = videoRef.current.currentTime * 1000 - startMs;
      setVideoProgress((currentTime / duration) * 100);
      _setCurrentTime(videoRef.current.currentTime);
    };
  }

  const handleChangeSeek = (event: Event, newValue: number) => {
    _setVideoProgress(newValue);
  };

  const handleChangeSeekCommit = () => {
    const ratio = audioProgress / 100;
    const duration = (endMs - startMs) / 1000;
    videoRef.current.currentTime = duration * ratio + startMs / 1000;
    _setCurrentTime(videoRef.current.currentTime);
  };


  const MstoJsx = (Mstime: number) => {
    const sec: number = Math.round(Mstime / 1000);
    return (
      <>
        {Math.floor(sec / 60)} : {Math.floor(sec % 60)}
      </>
    );
  };

  return (
    <>
      <video ref={videoRef} src={source} className={styles.video}></video>;
      <div className={styles.seek_box}>
        {MstoJsx(startMs)}
        <Slider
          value={audioProgress}
          onChange={handleChangeSeek}
          onChangeCommitted={handleChangeSeekCommit}
        />
        {MstoJsx(endMs)}
      </div>
      {Math.floor(currentTime / 60)} : {Math.floor(currentTime % 60)}
      <div>{videoSpeed}</div>

      <Fab
        variant="extended"
        onClick={() => {
          const speed = (videoSpeed * 10 - 1) / 10;
          if (speed >= 0.5) {
            videoRef.current.playbackRate = speed;
            setVideoSpeed(videoRef.current.playbackRate);
          }
        }}
      >
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
      <Fab
        variant="extended"
        onClick={() => {
          const speed = (videoSpeed * 10 + 1) / 10;
          if (speed <= 1.5) {
            videoRef.current.playbackRate = speed;
            setVideoSpeed(videoRef.current.playbackRate);
          }
        }}
      >
        + 0.1
        <FastForwardIcon />;
      </Fab>
  
      <div className={styles.sound_box}>
        <VolumeDownIcon />
        <Slider
          defaultValue={100}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(event: Event, newValue: number) => {
            _setVolumeProgress(newValue);
            videoRef.current.volume = volumeProgress / 100;
          }}
        />
        <VolumeUpIcon />
      </div>
    </>
  );
};

export default MiniVideoPlayer;
