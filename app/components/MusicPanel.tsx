"use client";

import React, { useState } from "react";
import "./components.css";

interface Song {
  title: string;
  artist: string;
  spotifyUrl: string;
}

interface MusicPanelProps {
  songs: Song[];
}

const MusicPanel: React.FC<MusicPanelProps> = ({ songs }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Mouse X relative to the MusicPanel
    const y = event.clientY - rect.top; // Mouse Y relative to the MusicPanel
    setMousePos({ x, y });
  };

  const handleSongClick = (spotifyUrl: string) => {
    // Open the Spotify URL in a new tab
    window.open(spotifyUrl, "_blank");
  };

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #feb47b, #5e77c4)`,
  };

  return (
    <div
      className="music-panel p-4 rounded-2xl shadow-md w-full h-full overflow-y-auto"
      style={gradientStyle}
      onMouseMove={handleMouseMove}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Generated Playlist</h2>
      <ul className="space-y-4">
        {songs.map((song, index) => (
          <li
            key={index}
            className="flex items-center p-4 rounded-lg bg-white/20 backdrop-blur-md text-white shadow-md hover:bg-white/30 transition-all duration-300 cursor-pointer"
            onClick={() => handleSongClick(song.spotifyUrl)}
          >
            {/* Placeholder for album art */}
            <div className="w-16 h-16 bg-black rounded-md mr-4"></div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{song.title}</p>
              <p className="text-sm">{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPanel;
