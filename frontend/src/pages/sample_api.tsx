import { TopPageClientClient } from "../../grpc_out/GrpcServiceClientPb";
import { Empty } from "../../grpc_out/grpc_pb";

export default () => {
  const handleTestLogin = () => {
    window.location.href = "http://localhost:8080/auth/test-login";
  };
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/login";
  };
  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
  };
  const fetchAudioList = () => {
    const client = new TopPageClientClient("http://localhost:8080", null, {
      withCredentials: true,
    });
    const query = new Empty();
    client.fetchAudioList(query, null, (err, response) => {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
      }
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
      <button onClick={handleLogin}>login</button>
      <button onClick={handleTestLogin}>login to TestUser</button>
      <button onClick={handleLogout}>logout</button>
      <button onClick={fetchAudioList}>fetch audio list</button>
    </div>
  );
};
