import Styles from "../../../styles/audio-upload.module.scss";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Alert } from "@mui/material";
import Router from "next/router";

/* 参考 : https://qiita.com/FumioNonaka/items/4ae1ccbfe609e1a10c4d */

const AudioUpload = () => {
  const [alertPop, alertPopSet] = useState<JSX.Element>(null);

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
      Router.push("./user-setting");
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
