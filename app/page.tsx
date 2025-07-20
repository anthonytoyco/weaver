"use client";

import React, { useState } from "react";
import MusicPanel from "./components/MusicPanel";
import LoadingPanel from "./components/LoadingPanel";

export default function Home() {
  {
    /* useState */
  }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buildPressed, setBuildPressed] = useState(false);
  const [playlistMade, setPlaylistMade] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [songs, setSongs] = useState([]);

  {
    /* event handlers */
  }
  const handleButtonClick = () => {
    if (file) {
      setBuildPressed(true);
      handleUpload();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    if (e.target.files && e.target.files.length === 1) {
      const selectedFile = e.target.files[0];

      // Basic validation
      if (!selectedFile.type.startsWith("video/")) {
        setError("Please select a video file");
        return;
      }

      setFile(selectedFile);
      setVideoURL(URL.createObjectURL(selectedFile)); // Create a URL for the video file
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

      if (!response.ok) {
        throw new Error("Failed to generate playlist");
      }

      const data = await response.json();

      // Define types for track and artist
      interface Artist {
        name: string;
      }

      interface Track {
        name: string;
        artists: Artist[];
      }

      // Format the songs data
      const formattedSongs = data.songDetails.map(
        (track: Track, index: number) => ({
          title: track.name,
          artist: track.artists.map((artist: Artist) => artist.name).join(", "),
          spotifyUrl: data.spotifyUrls[index],
        })
      );

      setSongs(formattedSongs);
      setPlaylistMade(true);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(error);
    }
  }

  const handleGenerateSongs = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("video", file);

    const response = await fetch("/api/twelve/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setSongs(data.songs);
  };

  {
    /* gradient for div element */
  }
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #feb47b, #5e77c4)`,
  };

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
        {/* Header with title */}
        <div className="flex justify-between items-center p-8">
          <div
            className={`${
              buildPressed ? "text-xl" : "text-4xl"
            } transition-all duration-1000 color-white font-light tracking-[1em] text-white`}
          >
            WEAVER
          </div>
        </div>

        {/* File input or video player */}
        {videoURL ? (
          <div className="flex justify-center items-center w-full h-1/2 bg-black rounded">
            <video
              src={videoURL}
              controls
              className="w-3/4 h-full rounded"
            ></video>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex justify-center items-center w-full h-1/2 bg-black rounded cursor-pointer text-gray-400"
          >
            <span>Click here to add video</span>
            <input
              id="file-upload"
              onChange={handleFileChange}
              type="file"
              accept="video/*"
              className="hidden"
            />
          </label>
        )}

        {/* Centered button */}
        <div className="flex justify-center items-center p-8">
          <button
            onClick={() => {
              if (!buildPressed) {
                handleButtonClick();
              } else {
                // Refresh the page to reset everything
                window.location.reload();
              }
            }}
            disabled={!file && !buildPressed}
            className={`flex justify-center items-center w-3/4 h-30 text-3xl font-bold rounded-full transition-all duration-300 ${
              file || buildPressed
                ? "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {buildPressed ? "RESET" : "BUILD YOUR CUSTOM PLAYLIST"}
          </button>
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
      {buildPressed && !playlistMade && <LoadingPanel />}
      {buildPressed && playlistMade && <MusicPanel songs={songs} />}
    </div>
  );
}
