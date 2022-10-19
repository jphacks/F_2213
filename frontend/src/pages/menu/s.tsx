import React from "react";

export const VideoPlayer = ({ a, b }) => {
  const handleTimeUpdate = (e) => {
    const time = e.target.currentTime;
    if (b < time) {
      e.target.pause();
      e.target.currentTime = b;
    } else if (time < a) {
      e.target.pause();
      e.target.currentTime = a;
    }
  };

  return <video src={"/sm2.mp3"} controls onTimeUpdate={handleTimeUpdate} />;
};

const App = () => {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(13);

  const handleChangeA = (e) => setA(e.target.value);
  const handleChangeB = (e) => setB(e.target.value);

  return (
    <div>
      <VideoPlayer a={a} b={b} />
      <form>
        <p>
          A
          <input
            type="range"
            value={a}
            min={0}
            max={13}
            onChange={handleChangeA}
          />
          {a}
        </p>
        <p>
          B
          <input
            type="range"
            value={b}
            min={0}
            max={13}
            onChange={handleChangeB}
          />
          {b}
        </p>
      </form>
    </div>
  );
};

export default App;
