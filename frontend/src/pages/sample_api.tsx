import * as jspb from "google-protobuf";
import { RpcError } from "grpc-web";
import { useState } from "react";
import { TopPageClientClient } from "../../grpc_out/GrpcServiceClientPb";
import {
  Audio,
  AudioId,
  AudioUrl,
  Empty,
  Tag,
  TagId,
} from "../../grpc_out/grpc_pb";

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
if (!BACKEND_ORIGIN) {
  throw new Error("NEXT_PUBLIC_BACKEND_ORIGIN環境変数が読み込まれていません");
}

const SampleApi = () => {
  const [output, setOutput] = useState<string>("Api output would be here");
  const [tagId, setTagId] = useState<number>(-1);
  const [audioId, setAudioId] = useState<number>(-1);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const handleTestLogin = () => {
    window.location.href = BACKEND_ORIGIN + "/auth/test-login";
  };

  const handleLogin = () => {
    window.location.href = BACKEND_ORIGIN + "/auth/login";
  };

  const handleLogout = () => {
    window.location.href = BACKEND_ORIGIN + "/auth/logout";
  };

  const fetchUserInfo = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchUserInfo(query, null, callback);
  };

  const fetchAudioList = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchAudioList(query, null, callback);
  };

  const callback = (err: RpcError, response: jspb.Message) => {
    if (err) {
      console.error(err.code, err.message);
      setOutput(JSON.stringify([err.code, err.message]));
    } else {
      console.log(response.toObject());
      setOutput(JSON.stringify(response.toObject()));
    }
  };

  const uploadAudio = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const tag = new Tag();
    tag.setStartms(100);
    tag.setEndms(1100);
    tag.setTagname("tag name");

    const query = new Audio();
    query.setAudioname("audio name");
    query.setDescription("audio description");
    query.setUrl("https://download.samplelib.com/mp3/sample-15s.mp3");
    query.setTagsList([tag]);
    client.uploadAudio(query, null, callback);
  };

  const deleteTag = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new TagId();
    query.setId(tagId);
    client.deleteTag(query, null, callback);
  };

  const deleteAudio = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new AudioId();
    query.setId(audioId);
    client.deleteAudio(query, null, callback);
  };

  const generateMovie = () => {
    const client = new TopPageClientClient(BACKEND_ORIGIN + "", null, {
      withCredentials: true,
    });
    const query = new AudioUrl();
    query.setUrl(audioUrl);
    const stream = client.generateMovie(query);

    setOutput("生成中. . .");
    stream.on("data", (response) => {
      setOutput("生成完了: " + response.getUrl());
      window.open(response.getUrl());
    });
    stream.on("status", (status) => {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end", () => {
      console.log("end");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        margin: "3rem auto",
        gap: "1rem",
      }}
    >
      <code
        style={{
          backgroundColor: "black",
          padding: "1rem",
          minHeight: "10rem",
        }}
      >
        {output}
      </code>
      <button onClick={handleLogin}>Google login</button>
      <button onClick={handleTestLogin}>Login to TestUser</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={fetchUserInfo}>Fetch user info</button>
      <button onClick={fetchAudioList}>Fetch audio list</button>
      <button onClick={uploadAudio}>Upload Audio</button>
      <form
        action={BACKEND_ORIGIN + "/img/upload"}
        encType="multipart/form-data"
        method="post"
        style={{ border: "2px solid #000", padding: "1rem" }}
      >
        <input type="file" name="upload" id="upload" />
        <input type="submit" value="Upload" />
      </form>
      <div style={{ border: "2px solid #000", padding: "1rem" }}>
        <input
          value={tagId}
          type="number"
          onChange={(e) => {
            setTagId(Number(e.currentTarget.value));
          }}
        />
        <button onClick={deleteTag}>Delete Tag</button>
      </div>
      <div style={{ border: "2px solid #000", padding: "1rem" }}>
        <input
          value={audioId}
          type="number"
          onChange={(e) => {
            setAudioId(Number(e.currentTarget.value));
          }}
        />
        <button onClick={deleteAudio}>Delete Audio</button>
      </div>
      <div style={{ border: "2px solid #000", padding: "1rem" }}>
        <input
          value={audioUrl}
          onChange={(e) => {
            setAudioUrl(e.currentTarget.value);
          }}
        />
        <button onClick={generateMovie}>GenerateMovie</button>
      </div>
    </div>
  );
};

export default SampleApi;
