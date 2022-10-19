import { MouseEvent, MouseEventHandler, useMemo, useState } from "react";
import styles from "styles/components/MiniAudioPlayer.module.scss";

type PlayStatus = "playing" | "paused";

interface Props {
  source: string;
  startMs: number;
  endMs: number;
}

const getClickRatio = (e: MouseEvent<HTMLProgressElement>) => {
  const clickX = e.clientX;
  const clientRect = e.currentTarget.getBoundingClientRect();
  const itemX = clientRect.x;
  const width = clientRect.right - clientRect.left;
  const ratio = (clickX - itemX) / width;
  return ratio;
};

const MiniAudioPlayer = ({ source, startMs, endMs }: Props) => {
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

  // プログレスバーをクリックした(ボタンを離した)とき
  const handleProgressClick: MouseEventHandler<HTMLProgressElement> = (e) => {
    const ratio = getClickRatio(e);
    const duration = (endMs - startMs) / 1000;
    audio.currentTime = duration * ratio + startMs / 1000;
  };

  // プログレスバーをドラッグしたとき
  const handleProgressDrag: MouseEventHandler<HTMLProgressElement> = (e) => {
    if (!isCursorDrag) return;
    const ratio = getClickRatio(e);
    e.currentTarget.value = ratio;
    e.preventDefault();
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
      setAudioProgress(currentTime / duration);
    };
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.button_wrapper}>
        {isRepeat && (
          <button
            onClick={() => {
              setIsRepeat(!isRepeat);
            }}
          >
            {REPEAT_ON}
          </button>
        )}
        {!isRepeat && (
          <button
            onClick={() => {
              setIsRepeat(!isRepeat);
            }}
          >
            {REPEAT_OFF}
          </button>
        )}
        {playStatus === "playing" && (
          <button
            onClick={() => {
              changeState("paused");
            }}
          >
            {PAUSE_ICON}
          </button>
        )}
        {playStatus === "paused" && (
          <button
            onClick={() => {
              changeState("playing");
            }}
          >
            {START_ICON}
          </button>
        )}
        <button
          onClick={() => {
            backToStart();
            changeState("paused");
          }}
        >
          {STOP_ICON}
        </button>
      </div>
      <progress
        value={audioProgress}
        onClick={handleProgressClick}
        onMouseMove={handleProgressDrag}
        onMouseDown={() => {
          setIsCursorDrag(true);
        }}
        onMouseUp={() => {
          setIsCursorDrag(false);
        }}
      />
    </div>
  );
};
export default MiniAudioPlayer;

const ICON_SIZE = "30px";

const PAUSE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height={ICON_SIZE}
    viewBox="0 0 24 24"
    width={ICON_SIZE}
    fill="#000000"
  >
    <g>
      <rect fill="none" height="24" width="24" />
      <rect fill="none" height="24" width="24" />
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g />
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z" />
    </g>
  </svg>
);

const START_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={ICON_SIZE}
    viewBox="0 0 24 24"
    width={ICON_SIZE}
    fill="#000000"
    className={styles.start_icon}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const STOP_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={ICON_SIZE}
    width={ICON_SIZE}
    viewBox="0 0 48 48"
  >
    <path d="M16.5 31.5h15v-15h-15ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z" />
  </svg>
);

const REPEAT_ON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={ICON_SIZE}
    width={ICON_SIZE}
    viewBox="0 0 48 48"
  >
    <path d="M5 46q-1.2 0-2.1-.9Q2 44.2 2 43V5q0-1.2.9-2.1Q3.8 2 5 2h38q1.2 0 2.1.9.9.9.9 2.1v38q0 1.2-.9 2.1-.9.9-2.1.9Zm9-2 2.1-2.2-4.3-4.3H38v-11h-3v8H11.8l4.3-4.3L14 28l-8 8Zm-4-22.5h3v-8h23.2l-4.3 4.3L34 20l8-8-8-8-2.1 2.2 4.3 4.3H10Z" />
  </svg>
);

const REPEAT_OFF = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={ICON_SIZE}
    width={ICON_SIZE}
    viewBox="0 0 48 48"
  >
    <path d="m14 44-8-8 8-8 2.1 2.2-4.3 4.3H35v-8h3v11H11.8l4.3 4.3Zm-4-22.5v-11h26.2l-4.3-4.3L34 4l8 8-8 8-2.1-2.2 4.3-4.3H13v8Z" />
  </svg>
);
