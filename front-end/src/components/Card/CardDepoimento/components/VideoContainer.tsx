"use client";
import React, { FC, useRef, useState } from "react";

interface VideoContainerProps {
  video: {
    url: string;
    mime_type: string;
  };
  poster?: {
    url: string;
  };
}

const VideoContainer: FC<VideoContainerProps> = ({ poster, video }) => {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.pause();
        setIsActive(false);
      } else {
        videoRef.current.play();
        setIsActive(true);
      }
    }
  };

  return (
    <div className={`cardDepoimento__videoContainer ${isActive ? "active" : ""}`} onClick={() => handleClick()}>
      <video className="cardDepoimento__videoEmphasis" poster={poster?.url} ref={videoRef}>
        <source src={video?.url} type={video?.mime_type} />
      </video>
    </div>
  );
};

export default VideoContainer;
