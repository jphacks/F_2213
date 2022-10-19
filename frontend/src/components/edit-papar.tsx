import Styles from "../../styles/components/edit-papar.module.scss";
import Audiotag from "./audio-card";
import { AudioInfo, SectionInfo } from "./interface";

const EditPaper = (props: { audio_info: AudioInfo }) => {
  const color: string = props.audio_info.color;
  const title: string = props.audio_info.title;
  const audioroute: string = props.audio_info.audioroute;
  const memo: string = props.audio_info.memo;
  const audios: SectionInfo[] = props.audio_info.audios;

  const audio_components = audios.map((x: SectionInfo, idx: number) => (
    <Audiotag
      key={idx}
      color={color}
      audioroute={audioroute}
      section_info={x}
    ></Audiotag>
  ));

  return (
    <>
      <style jsx>{`
        .papar {
          height: 100%;
          width: 100%;
          background: ${color};
          box-shadow: 0 0 10px #00000048;
        }
      `}</style>
      <div className="papar">
        <div className={Styles.contents}>
          <div className={Styles.title}>{title}</div>
          <div className={Styles.memo}>{memo}</div>
          {audio_components}
        </div>
      </div>
    </>
  );
};

export default EditPaper;
