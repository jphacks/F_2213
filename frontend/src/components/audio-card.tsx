import Styles from "../../styles/components/audio-card.module.scss";

export default (props: any) => {
  const name: string = props.audioinfo.name;
  const start: number = props.audioinfo.start;
  const end: number = props.audioinfo.end;
  const color: string = props.audioinfo.color;
  const audioroute: string = `${props.audioinfo.audioroute}#=${start},${end}`; //数値 -> 時間の処理をする？


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
