import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import Router from "next/router";
import { useRef, useState } from "react";
import Styles from "../../../../styles/edit-audio.module.scss";
import Editpapar from "../../../components/edit-papar";
import { timeExpetion } from "../../../components/function";
import { AudioInfo, SectionInfo } from "../../../components/interface";
import { getSessionAudioName, getSessionAudioUrl, setSessionAudioInfo } from "../../../components/SessionStorage";

const EditAudio = () => {
  let my_audio_list: SectionInfo[] = [];
  const demotmpstring: string = "null"; // sessionStorage.getItem("prolis_route");
  const [alertPop, alertPopSet] = useState<JSX.Element>(null);
  const [myAudioInfos, myAudioInfosSet] = useState<AudioInfo>(
    new AudioInfo(
      getSessionAudioName(),
      getSessionAudioUrl(),
      "#b2f1a3",
      "", // メモは未記入なので空白．
      []
    )
  );
  const nameref = useRef(null);
  const timeref_st = [useRef(null), useRef(null)];
  const timeref_ed = [useRef(null), useRef(null)];

  const tunits: string[] = ["分", "秒"];
  const textfield_st = timeref_st.map((x: any, idx: number) => (
    <TextField
      className={Styles.timebox}
      key={idx}
      inputRef={x}
      label={tunits[idx]}
      variant="standard"
    />
  ));
  const textfield_ed = timeref_ed.map((x: any, idx: number) => (
    <TextField
      className={Styles.timebox}
      key={idx}
      inputRef={x}
      label={tunits[idx]}
      variant="standard"
    />
  ));

  const handleClick = () => {
    const st_min: number = parseInt(timeref_st[0].current.value);
    const st_second: number = parseFloat(timeref_st[1].current.value);

    const ed_min: number = parseInt(timeref_ed[0].current.value);
    const ed_second: number = parseFloat(timeref_ed[1].current.value);

    const input_time = [st_min, st_second, ed_min, ed_second];

    const error_messages: string[] = timeExpetion(input_time);

    if (error_messages.length !== 0) {
      alertPopSet(
        <Alert severity="error" className={Styles.error}>
          {error_messages.map((x: string, idx: number) => (
            <p key={idx}> {x} </p>
          ))}
        </Alert>
      );
      return;
    }
    const audiosection: SectionInfo = {
      name: nameref.current.value,
      start: st_min * 60 + st_second,
      end: ed_min * 60 + ed_second,
    };

    myAudioInfos.audios.push(audiosection);
    myAudioInfosSet({ ...myAudioInfos }); // 再レンダリングされない．

    timeref_st[0].current.value = timeref_st[1].current.value = null;
    timeref_ed[0].current.value = timeref_ed[1].current.value = null;
    nameref.current.value = null;
  };

  const [pValue, pValueSet] = useState<number>(33);

  const asyncAction = async () => {
    pValueSet(67);
    setSessionAudioInfo(myAudioInfos)
    Router.push("./edit-info");
  };

  const handleNextPage = () => {
    if (myAudioInfos.audios.length === 0) {
      alertPopSet(
        <Alert severity="error" className={Styles.error}>
          タグを追加してください．
        </Alert>
      );
      return;
    }
    sessionStorage.setItem("prolis_info", JSON.stringify(myAudioInfos));
    asyncAction();
  };

  return (
    <div className={Styles.wrap_all}>
      <div className={Styles.papars_wrap}>
        <div className={Styles.papar_third}></div>
        <div className={Styles.papar_second}></div>
        <div className={Styles.papar_main}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>音声にタグを追加しよう</div>
              <div className={Styles.descriotion}>
                音声にもう一度聴きたい区間をタグとして保存しましょう．数字を入力して区間を決めて追加してください．
              </div>
              {alertPop}

              <div className={Styles.audioplay_warp}>
                <audio
                  className={Styles.audio_bar}
                  controls
                  controlsList="nodownload"
                >
                  <source src={myAudioInfos.audioroute} type="audio/mp3" />
                </audio>

                <div className={Styles.input_box}>
                  <TextField
                    inputRef={nameref}
                    className={Styles.titlebox}
                    label="タグ名"
                    variant="outlined"
                  />
                  <span>start</span> {textfield_st}
                  <span>end </span>
                  {textfield_ed}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleClick()}
                    className={Styles.button}
                  >
                    タグを追加する
                  </Button>
                </div>

                <div className={Styles.descriotion}>
                  タグをすべてつけ終わったら次へを押してください。
                </div>
              </div>
              <Button
                variant="contained"
                onClick={() => handleNextPage()}
                className={Styles.nbutton}
              >
                次へ
              </Button>
              <LinearProgress
                variant="determinate"
                value={pValue}
                className={Styles.progress}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.editpapar_wrap}>
        <Editpapar audio_info={myAudioInfos}></Editpapar>
      </div>
    </div>
  );
};

export default EditAudio;
