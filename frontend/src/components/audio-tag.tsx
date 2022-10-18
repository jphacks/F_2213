import Styles from "../../styles/components/audio-tag.module.scss";
export default (props: any) => {

  const color : string  = props.audiols.color;
  const title : string  = props.audiols.title;
  const audioroute : string = props.audiols.audioroute;
  
  return (
    <>
      <style jsx>{`
        .contents {
          border-right: 40px solid ${color};
          margin: 0 auto 40px  auto;

          display: flex;
          justify-content: space-between;

          position: relative;
          padding: 10px;

          background: #fffde7;
          color: #795548;
          font-weight: bold;
          font-size: 23px;
        }
      `}</style>
      <div className={Styles.contents_wrap}>
        <div className="contents">
          <div className={Styles.title}>{title}</div>
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
