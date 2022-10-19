import * as jspb from "google-protobuf";
import { RpcError } from "grpc-web";
import { useState } from "react";
import { TopPageClientClient } from "../../grpc_out/GrpcServiceClientPb";
import { Empty } from "../../grpc_out/grpc_pb";

export default () => {
  const [output, setOutput] = useState<string>("Api output would be here");

  const handleTestLogin = () => {
    window.location.href = "http://localhost:8080/auth/test-login";
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/login";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
  };

  const fetchUserInfo = () => {
    const client = new TopPageClientClient("http://localhost:8080", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchUserInfo(query, null, callback);
  };

  const fetchAudioList = () => {
    const client = new TopPageClientClient("http://localhost:8080", null, {
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
      <form
        action="http://localhost:8080/img/upload"
        encType="multipart/form-data"
        method="post"
      >
        <input type="file" name="upload" id="upload" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};
