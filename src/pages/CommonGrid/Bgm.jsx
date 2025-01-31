import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

function Bgm() {
  const bgmOnOffBar = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => {
      setPlaying(true);
    });
  }, []);

  const handleBgmPlaying = () => {
    setPlaying(!playing);
    bgmOnOffBar.current.classList.toggle("off");
  };

  return (
    <div className="bgm">
      <button className="bars" ref={bgmOnOffBar} onClick={handleBgmPlaying}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ReactPlayer
        className="react-player"
        url="https://www.youtube.com/watch?v=z7cnFnJRck4"
        loop={true}
        controls={true}
        playing={playing}
        volume={0.5}
      />
      <div className="bgm-title">
        <p>
          <span>♬ 김세정-항해</span>
        </p>
      </div>
    </div>
  );
}

export default Bgm;
