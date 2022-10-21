import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { RpcError } from "grpc-web";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TopPageClientClient } from "../../../../grpc_out/GrpcServiceClientPb";
import { AudioId } from "../../../../grpc_out/grpc_pb";
import Styles from "../../../../styles/edit-info.module.scss";
import { AudioInfo } from "../../../components/interface";
import {
  getSessionAudio,
  getSessionAudioInfo,
  setSessionAudioInfo
} from "../../../components/SessionStorage";
import { BACKEND_ORIGIN } from "../../sample_api";

const EditInfo = () => {
  const nameref = useRef(null);
  const memoref = useRef(null);
  const color_model = [
    {
      value: "#f78181",
      label: "red",
    },
    {
      value: "#7fffd4",
      label: "blue",
    },
    {
      value: "#ccff00",
      label: "green",
    },
    {
      value: "#ffd700",
      label: "orange",
    },
    {
      value: "#ff99cc",
      label: "pink",
    },
    {
      value: "#d0a9f5",
      label: "purple",
    },
    {
      value: "#fff",
      label: "white",
    },
  ];

  const [my_audio_infos, my_audio_infos_set] = useState<AudioInfo>(
    new AudioInfo("", "", "", "", [])
  );
  useEffect(() => {
    my_audio_infos_set(getSessionAudioInfo());
  }, []);

  const [color, colorSet] = useState<string>("#fff");
  const [title, titleSet] = useState<string>("");
  const [memo, memoSet] = useState<string>("");

  const info_output = (
    <>
      <style jsx>{`
        .color {
          color: ${color};
        }
      `}</style>
      <div className={Styles.descriotion}>
        <div>タイトル名 : {title}</div>
        <div>メモ : {memo}</div>
        <div>
          カラー : <span className="color">■</span>
        </div>
        <div>タグ数 : {my_audio_infos.audios.length}</div>
      </div>
    </>
  );

  const [finishMessage, finishMessageSet] = useState<JSX.Element>(null);
  const [alertPop, alertPopSet] = useState<JSX.Element>(null);
  const [isActiveFinishButton, isActiveFinishButtonSet] =
    useState<boolean>(true);

  const determinate_bar = (
    <LinearProgress
      variant="determinate"
      value={67}
      className={Styles.progress}
    />
  );
  const [progressBar, progressBarSet] = useState<JSX.Element>(determinate_bar);

  const asyncAction = async () => {
    progressBarSet(
      <LinearProgress
        variant="determinate"
        value={100}
        className={Styles.progress}
      />
    );

    await new Promise((r) => setTimeout(r, 1000));

    progressBarSet(
      <LinearProgress variant="query" className={Styles.progress} />
    );

    // サーバーに保存する処理
    await new Promise((resolve, reject) => {
      setSessionAudioInfo(my_audio_infos);
      const audio = getSessionAudio();
      const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
        withCredentials: true,
      });
      client.uploadAudio(audio, null, (err: RpcError, response: AudioId) => {
        if(err){
          console.error(err)
          reject("サーバーへの保存に失敗しました")
          throw err;
        }else{
          console.log(response)
          resolve(response)
        }
      });
    });

    isActiveFinishButtonSet(false);
    finishMessageSet(
      <>
        <div className={Styles.descriotion}>
          作成が完了しました！さっそく、プロリスで発音&リスニングをしましょう！
        </div>
        <Link href="../list">
          <Button variant="contained" className={Styles.button}>
            Let&apos;s Prolis!!!
          </Button>
        </Link>
      </>
    );

    progressBarSet(determinate_bar);
  };

  const handleNextPage = () => {
    console.log(title);

    if (title === "") {
      alertPopSet(
        <Alert severity="error" className={Styles.error}>
          タイトルを記入してください。
        </Alert>
      );

      return;
    }

    my_audio_infos.title = title;
    my_audio_infos.memo = memo;
    my_audio_infos.color = color;

    asyncAction();
  };

  return (
    <>
      <style jsx>{`
        .papar_second,
        .papar_third {
          height: 98%;
          position: absolute;
          width: 100%;
          user-select: none;
        }

        .papar_third {
          @include backMenu;
          font-size: 23px;
          background: ${color};
          right: 180px;
          top: -10px;
          transform: rotate(-5deg);
        }

        .papar_second {
          @include backMenu;
          font-size: 35px;
          background: ${color};
          right: 90px;
          top: -10px;
          transform: rotate(-2deg);
        }
      `}</style>

      <div className={Styles.papars_wrap}>
        <div className="papar_third"></div>
        <div className="papar_second"></div>
        <div className={Styles.papar_main}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>音声になまえをつけよう</div>
              <div className={Styles.descriotion}>
                最後にこの音声の情報をかいて完成させよう。
              </div>
              {alertPop}

              <div className={Styles.select_wrap}>
                <div className={Styles.form}>
                  <TextField
                    inputRef={nameref}
                    className={Styles.titlebox}
                    label="タイトル"
                    variant="outlined"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      titleSet(e.target.value)
                    }
                  />

                  <TextField
                    inputRef={memoref}
                    className={Styles.memobox}
                    label="メモ"
                    placeholder="日付や音声の内容や教材の名前などを書いてみよう。"
                    multiline
                    rows={2}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      memoSet(e.target.value)
                    }
                  />

                  <TextField
                    id="outlined-select-currency"
                    className={Styles.colorbox}
                    select
                    label="Select"
                    value={color}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      colorSet(e.target.value)
                    }
                  >
                    {color_model.map(
                      (option: { value: string; label: string }) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </div>

                {info_output}

                {isActiveFinishButton && (
                  <Button
                    variant="contained"
                    onClick={() => handleNextPage()}
                    className={Styles.button}
                  >
                    完成
                  </Button>
                )}

                {finishMessage}
              </div>
              {progressBar}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInfo;
