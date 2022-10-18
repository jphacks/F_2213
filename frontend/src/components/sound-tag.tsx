import Styles from "../../styles/components/sound-tag.module.scss";

export default (props: any) => {
  return (
    <>
      <style jsx>{`
        .contents {
          border-left: 30px solid ${props.soundls.color};
          margin: 20px auto;
          width: 800px;

          display: flex;
          justify-content: space-between;

          position: relative;
          margin-bottom: 0.2rem;
          padding: 1rem;

          background: #fffde7;
          color: #795548;
          font-weight: bold;
          font-size: 23px;

          &:before {
            position: absolute;
            right: 1px;
            bottom: 10px;
            width: 50%;
            height: 50%;
            box-shadow: 0 10px 15px rgb(56, 44, 44);
            transform: rotate(4deg);
            z-index: -1;
            content: "";
          }
        }
      `}</style>
      <div className="contents">
        <div className={Styles.title}>{props.soundls.title}</div>
        <audio className={Styles.audio_bar} controls controlsList="nodownload">
          <source src={props.soundls.soundrounte} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
};