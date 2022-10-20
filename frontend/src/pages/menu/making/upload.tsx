import Styles from "../../../styles/upload.module.scss";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Alert, LinearProgress } from "@mui/material";
import Router from "next/router";

const AudioUpload = () => {
  const [alertPop, alertPopSet] = useState<JSX.Element>(null);
  const [pValue, pValueSet] = useState<number>(33);

  const routine = async () => {
    pValueSet(66);
    await new Promise((r) => setTimeout(r, 1000));
    Router.push("./user-setting");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles); //デバッグ用．
    if (acceptedFiles.length !== 1) {
      alertPopSet(
        <Alert severity="error" className={Styles.error}>
          ファイルは1つずつアップロードしてください。
        </Alert>
      );
    } else if (acceptedFiles[0].type !== "audio/mpeg") {
      alertPopSet(
        <Alert severity="error" className={Styles.error}>
          mp4ファイルをアップロードしてください。
        </Alert>
      );
    } else {
      routine();
    }
  }, []);

  const { getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className={Styles.papars_wrap}>
      <Link href="./user-setting">
        <div className={Styles.papar_third}>Setting</div>
      </Link>
      <Link href="./audio-list">
        <div className={Styles.papar_second}>List</div>
      </Link>
      <div {...getRootProps()}>
        <div className={Styles.papar_main}>
          {isDragActive ? (
            <div className={Styles.drop_papar}>
              ドラッグ&ドロップしてください。
            </div>
          ) : null}
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>Upload</div>
              <div className={Styles.descriotion}>
                mp4ファイルをここにドロップアウトするか、以下のボタンからファイルを選択してください。
              </div>
              {alertPop}
              <div className={Styles.button_wrap}>
                <Button
                  variant="contained"
                  onClick={open}
                  className={Styles.button}
                >
                  Select Audio
                </Button>
              </div>
              <LinearProgress
                variant="determinate"
                value={pValue}
                className={Styles.progress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
