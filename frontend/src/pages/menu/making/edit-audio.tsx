import Styles from "../../../../styles/edit-audio.module.scss";
import { Alert, LinearProgress, TextField, Button } from "@mui/material";
import Editpapar from "../../../components/edit-papar";
import { useState, useRef, MouseEvent } from "react";
import { AudioInfo, SectionInfo } from "../../../components/interface";
import { timeExpetion } from "../../../components/function";
import Router from "next/router";

const EditAudio = () => {
  /* */
  let my_audio_list: SectionInfo[] = [];

  const demotmpstring: string = "null"; // sessionStorage.getItem("prolis");
  const my_audio_infos = new AudioInfo(
    "", // ファイル名
    demotmpstring,
    "#b2f1a3",
    "",
    my_audio_list
  );
  /* */

  const my_audio_infos22 = new AudioInfo(
    "", // ファイル名
    demotmpstring,
    "#b2f1a3",
    "",
    my_audio_list
  );

  const [alertPop, alertPopSet] = useState<JSX.Element>(null);
  const [myAudioInfos, myAudioInfosSet] = useState<AudioInfo>(my_audio_infos);
  const nameref = useRef(null);
  const timeref_st = [useRef(null), useRef(null)];
  const timeref_ed = [useRef(null), useRef(null)];

  const textfield_st = timeref_st.map((x: any, idx: number) => (
    <TextField key={idx} inputRef={x} defaultValue="開始" />
  ));
  const textfield_ed = timeref_ed.map((x: any, idx: number) => (
    <TextField key={idx} inputRef={x} defaultValue="終了" />
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
        <Alert severity="error">
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


    my_audio_infos.audios.push(audiosection);

    console.log(my_audio_list);

    const tmp = my_audio_infos;
    myAudioInfosSet(tmp); // 再レンダリングされない．
  };

  const [pValue, pValueSet] = useState<number>(33);

  const asyncAction = async () => {
    pValueSet(67);
    await new Promise((r) => setTimeout(r, 1000));
    Router.push("./edit-info");
  };

  const handleNextPage = () => {
    sessionStorage.setItem("prolis_audio_info", JSON.stringify(my_audio_infos));
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
              <div className={Styles.title}>音声にメモを追加しよう</div>
              <div className={Styles.descriotion}>
                音声にもう一度聴きたい区間をメモとして保存しましょう．数字を入力して区間を決めて追加してください．
              </div>
              <TextField inputRef={nameref} defaultValue="タイトル名" />
              {textfield_st}
              {textfield_ed}
              <Button
                variant="contained"
                onClick={() => handleClick()}
                className={Styles.button}
              >
                付箋を追加する
              </Button>

              <Button
                variant="contained"
                onClick={() => handleNextPage()}
                className={Styles.button}
              >
                次へ
              </Button>
              {alertPop}

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
