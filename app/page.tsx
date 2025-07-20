"use client";

import { useState } from "react";
import MusicPanel from "./components/MusicPanel";
import LoadingPanel from "./components/LoadingPanel";
// import VideoDisplay from "./components/VideoDisplay";

export default function Home() {
  const [buildPressed, setBuildPressed] = useState(false);
  const [playlistMade, setPlaylistMade] = useState(false);

  const handleButtonClick = () => setBuildPressed(true);

  let buttonText = "BUILD YOUR CUSTOM PLAYLIST";

  if (buildPressed && !playlistMade) {
    buttonText = "LOADING PLAYLIST"
  }
  else if (buildPressed && playlistMade) {
    buttonText = "REBUILD"
  }

  return (
    <div className="flex flex-row p-5 gap-2 w-screen h-screen bg-black">
      <div className="flex flex-col w-full p-2 gap-2 h-full bg-[#1b233b] rounded-2xl">
        <div className={`${buildPressed ? "text-xl" : "text-4xl"} transition-all duration-1000 flex p-8 color-white font-light tracking-[1em] justify-around text-white`}>
          WEAVER
        </div>
        <div className="flex w-full h-2/3 bg-black rounded">
          {/* <VideoDisplay /> */}
        </div>
        <div className="flex justify-around w-full">
          <button
            onClick={handleButtonClick}
            className="flex justify-around items-center w-3/4 h-20 m-5 text-2xl font-bold bg-white rounded-full"
          >
            {buttonText}
          </button>
        </div>
      </div>
      {buildPressed && !playlistMade && <LoadingPanel />}
      {buildPressed && playlistMade && <MusicPanel />}
    </div>
  );
}
