"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import MusicPanel from "./components/MusicPanel";
import LoadingPanel from "./components/LoadingPanel";
// import VideoDisplay from "./components/VideoDisplay";

export default function Home() {
  {
    /* useState */
  }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buildPressed, setBuildPressed] = useState(false);
  const [playlistMade, setPlaylistMade] = useState(false);

  {
    /* Auth0 user state */
  }
  const { user, isLoading } = useUser();

  {
    /* event handlers */
  }
  const handleButtonClick = () => setBuildPressed(true);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  {
    /* gradient for div element */
  }
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #feb47b, #5e77c4)`,
  };

  const playlistBackgroundColor = playlistMade ? "" : "bg-main";

  let buttonText = "BUILD YOUR CUSTOM PLAYLIST";
  if (buildPressed && !playlistMade) {
    buttonText = "BUILDING PLAYLIST";
  } else if (buildPressed && playlistMade) {
    buttonText = "REBUILD";
  }

  return (
    <div className="flex flex-row p-5 gap-2 w-screen h-screen bg-main">
      <div
        onMouseMove={handleMouseMove}
        className="flex flex-col w-full p-2 gap-2 h-full rounded-2xl"
        style={gradientStyle}
      >
        {/* Header with title and auth buttons */}
        <div className="flex justify-between items-center p-8">
          <div
            className={`${
              buildPressed ? "text-xl" : "text-4xl"
            } transition-all duration-1000 color-white font-light tracking-[1em] text-white`}
          >
            WEAVER
          </div>
          <div className="flex gap-4 items-center">
            {isLoading && (
              <div className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/30">
                Loading...
              </div>
            )}
            {!isLoading && !user && (
              <a
                href="/auth/login"
                className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Login
              </a>
            )}
            {!isLoading && user && (
              <a
                href="/auth/logout"
                className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Logout
              </a>
            )}
          </div>
        </div>

        <div className="flex w-full h-2/3 rounded bg-main">
          {/* <VideoDisplay /> */}
        </div>

        {/* Centered button */}
        <div className="flex justify-center items-center p-8">
          <button
            onClick={handleButtonClick}
            className="flex justify-center items-center w-3/4 h-30 text-3xl font-bold rounded-full bg-button"
          >
            {buttonText}
          </button>
        </div>
      </div>
      {buildPressed && !playlistMade && <LoadingPanel />}
      {buildPressed && playlistMade && (
        <MusicPanel background={playlistBackgroundColor} />
      )}
    </div>
  );
}
