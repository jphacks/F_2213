import { RpcError } from "grpc-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TopPageClientClient } from "../../../grpc_out/GrpcServiceClientPb";
import { AudioList, Empty } from "../../../grpc_out/grpc_pb";
import Styles from "../../../styles/list.module.scss";
import Audiotag from "../../components/audio-tag";
import Editpapar from "../../components/edit-papar";
import { AudioInfo } from "../../components/interface";
import { convertAudioToAudioInfo } from "../../components/SessionStorage";
import { BACKEND_ORIGIN } from "../sample_api";

const List = () => {
  const [hoveringDemo, setHoveringDemo] = useState<AudioInfo>(
    new AudioInfo("", "", "", "", [])
  );
  const [audiodemolists, setAudiodemolists] = useState<AudioInfo[]>([]);

  // 初回のみ実行
  useEffect(() => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchAudioList(query, null, (err: RpcError, response: AudioList) => {
      if (err) {
        console.error(err.message);
      } else {
        const audioList = response.getAudiosList();
        const audioInfoList = audioList.map((v) => {
          return convertAudioToAudioInfo(v);
        });
        setAudiodemolists(audioInfoList);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const distplay_tags = audiodemolists.map((x: AudioInfo) => (
    <Audiotag
      key={x.uuid}
      audio_info={x}
      handleHover={() => {
        if (hoveringDemo !== x) {
          setHoveringDemo(x);
        }
      }}
    ></Audiotag>
  ));

  return (
    <div className={Styles.wrap_all}>
      <div className={Styles.papars_wrap}>
          <div className={Styles.papar_third}></div>
        <Link href="./making/upload">
          <div className={Styles.papar_second}>Upload</div>
        </Link>
        <div className={Styles.papar_main}>
          <div className={Styles.papar_line}>
            <div className={Styles.wrap}>
              <div className={Styles.title}>List</div>
              {distplay_tags}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.editpapar_wrap}>
        <Editpapar audio_info={hoveringDemo}></Editpapar>
      </div>
    </div>
  );
};

export default List;
