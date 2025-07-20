"use client";

import React, { useState } from "react";
import MusicPanel from "./components/MusicPanel";
import LoadingPanel from "./components/LoadingPanel";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  {/* useState */}
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buildPressed, setBuildPressed] = useState(false);
  const [playlistMade, setPlaylistMade] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    if (e.target.files && e.target.files.length == 1) {
      const selectedFile = e.target.files[0];

      // Basic validation
      if (!selectedFile.type.startsWith("video/")) {
        setError("Please select a video file");
        return;
      }

      setFile(selectedFile);
    }
  }

  async function handleUpload() {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("/api/twelve/upload", {
        method: "POST",
        body: formData,
      });
      setPlaylistMade(true)
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(error);
    }
  }

  {/* event handlers */}
  const handleButtonClick = () => setBuildPressed(true);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  {/* gradient for div element */}
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #feb47b, #5e77c4)`,
  };

  const playlistBackgroundColor = playlistMade ? "" : "bg-main"

  let buttonText = "BUILD YOUR CUSTOM PLAYLIST";
  if (buildPressed && !playlistMade) {
    buttonText = "BUILDING PLAYLIST"
  }
  else if (buildPressed && playlistMade) {
    buttonText = "REBUILD"
  }


  return (
    <div className="flex flex-row p-5 gap-2 w-screen h-screen bg-main">
      <div onMouseMove={handleMouseMove} className="flex flex-col w-full p-2 gap-2 h-full rounded-2xl" style={gradientStyle}>
        <div className={`${buildPressed ? "text-xl" : "text-4xl"} transition-all duration-1000 flex p-8 color-white font-light tracking-[1em] justify-around text-white`}>
          WEAVER
        </div>
        <input
          onChange={handleFileChange}
          type="file"
          accept="video/*"
          className="w-full h-1/2 bg-black rounded"
        ></input>
        <div className="flex justify-around w-full">
          <button
            onClick={() => {handleButtonClick(); handleUpload()}}
            className="flex justify-around items-center w-3/4 h-30 m-5 text-3xl font-bold rounded-full bg-button"
          >
            {buttonText}
          </button>
        </div>
      </div>
      {buildPressed && !playlistMade && <LoadingPanel />}
      {buildPressed && playlistMade && <MusicPanel background={playlistBackgroundColor} />}
    </div>
  );
}
