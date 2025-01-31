import React from "react";

function Background() {
  return (
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="/voyage3.mp4" type="video/mp4" />
        Your browser is not supported!
      </video>
    </div>
  );
}

export default Background;
