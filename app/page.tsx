"use client";

import { useState } from "react";
import MusicPanel from "./components/MusicPanel";
import LoadingPanel from "./components/LoadingPanel";
// import VideoDisplay from "./components/VideoDisplay";

export default function Home() {
  const [buildPressed, setBuildPressed] = useState(false);
  const [playlistMade, setPlaylistMade] = useState(false);

  const testPlaylistMade = () => {
    setPlaylistMade(true);
  };

  return (
    <div className="flex flex-row p-2 gap-2 w-screen h-screen bg-black">
      <div className="flex flex-col w-full p-2 gap-2 h-full bg-[#121212] rounded">
        <div className="flex color-white font-light text-xl tracking-[1em] justify-around text-white">
          WEAVER
        </div>
        <div className="w-full h-1/2 bg-black rounded">
          {/* <VideoDisplay /> */}
        </div>
        <div className="flex justify-around w-full">
          <button
            onClick={() => {
              setBuildPressed(true);
            }}
            className="flex justify-around items-center w-3/4 h-20 text-2xl font-bold bg-green-50 rounded-full"
          >
            BUILD YOUR CUSTOM PLAYLIST
          </button>
          // test
          <button
            onClick={testPlaylistMade}
            className="flex justify-around items-center w-3/4 h-20 text-2xl font-bold bg-green-50 rounded-full"
          >
            TESTER
          </button>
        </div>
      </div>
      {buildPressed && !playlistMade && <LoadingPanel />}
      {buildPressed && playlistMade && <MusicPanel />}
    </div>
  );
}
