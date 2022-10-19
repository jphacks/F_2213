import Styles from "../../styles/components/edit-papar.module.scss";
import Audiotag from "./audio-card";

export default (props: any) => {
  const color: string = props.audiols.color;
  const title: string = props.audiols.title;
  const audioroute: string = props.audiols.audioroute;
  const memo: string = props.audiols.memo;
  const audios = props.audiols.audios;
  let audio_components = [];

  audios.map((x: any, index: number) => {
    x["color"] = color;
    x["audioroute"] = audioroute;
    audio_components.push(<Audiotag key={index} audioinfo={x}></Audiotag>);
  });

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
