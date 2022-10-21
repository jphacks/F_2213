import { useRouter } from "next/router";
import Styles from "../../styles/components/audio-tag.module.scss";
import { AudioInfo } from "../components/interface";

const AudioTag = (props: { audio_info: AudioInfo; handleHover: any }) => {
  const router = useRouter();
  const color: string = props.audio_info.color;
  const title: string = props.audio_info.title;
  const audioroute: string = props.audio_info.audioroute;

  return (
    <>
      <style jsx>{`
        .contents {
          border-right: 40px solid ${color};
          margin: 0 auto 40px auto;

          display: flex;
          justify-content: space-between;

          position: relative;
          padding: 10px;

          background: #fffde7;
          color: #795548;
          font-weight: bold;
          font-size: 23px;
        }

        .title {
          margin: auto 0;
          position: relative;
          overflow-wrap: break-all;
        }

        .title:hover {
          color: ${color};
          cursor: pointer;
        }

        .title:after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: -15%;
          width: 130%;
          height: 5px;
          border-radius: 50%;
          background: ${color};
          transition: all 0.3s;
          transform: scale(0.04, 1);
          transform-origin: center bottom;
        }

        .title:hover:after {
          height: 2px;
          border-radius: 0;
          transform: scale(0.8, 1);
        }
      `}</style>
      <div
        className={Styles.contents_wrap}
        onMouseOver={props.handleHover}
        onClick={() => {
          router.push("/menu/playing/" + props.audio_info.uuid);
        }}
      >
        <div className="contents">
          <div className="title">{title}</div>
          <audio
            className={Styles.audio_bar}
            controls
            controlsList="nodownload"
          >
            <source src={audioroute} type="audio/mp3" />
          </audio>
        </div>
      </div>
    </>
  );
};

export default AudioTag;
