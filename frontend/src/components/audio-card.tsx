import Styles from "../../styles/components/audio-card.module.scss";
import { SectionInfo } from "../components/interface";
import MiniAudioPlayer from "./MiniAudioPlayer";

const AudioCard = (props: {
  section_info: SectionInfo;
  color: string;
  audioroute: string;
}) => {
  const name: string = props.section_info.name;
  const start: number = props.section_info.start;
  const end: number = props.section_info.end;
  const color: string = props.color;
  const audioroute: string = props.audioroute;

  return (
    <>
      <style jsx>{`
        .cards {
          padding: 10px;
          background-size: cover;
          background-clip: content-box;
          background-color: #fff;
          box-sizing: border-box;
          position: relative;
          margin: 30px auto;
          top: 30px;
          padding: 10px;
          text-indent: 20px;
        }

        .cards:after {
          content: "";
          display: block;
          position: absolute;
          border: 50px solid transparent;
          border-bottom: 50px solid ${color};
          bottom: -65px;
          right: -65px;
          box-shadow: 0px 7px 6px -9px black;
          transform: rotate(135deg);
        }

        .cards:before {
          content: "";
          display: block;
          position: absolute;
          border: 50px solid transparent;
          border-top: 50px solid ${color};
          top: -65px;
          left: -65px;
          box-shadow: 0px -7px 6px -9px black;
          transform: rotate(135deg);
        }
      `}</style>

      <div className="cards">
        <div className={Styles.contents_wrap}>
          <div className={Styles.title}>{name}</div>
          <MiniAudioPlayer source={audioroute} startMs={start} endMs={end} />
        </div>
      </div>
    </>
  );
};

export default AudioCard;
