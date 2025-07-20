import React, { useEffect, useState } from "react";
import "./components.css";
import Image from "next/image";

export default function LoadingPanel() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Initializing...");

  useEffect(() => {
    // Timer to update seconds elapsed
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Simulate progress updates
    const progressUpdates = [
      { time: 3, message: "Analyzing video content..." },
      { time: 8, message: "Extracting hashtags and themes..." },
      { time: 15, message: "Generating playlist using AI..." },
      { time: 20, message: "Fetching song details from Spotify..." },
      { time: 25, message: "Finalizing playlist..." },
      { time: 30, message: "Validating playlist data..." },
      { time: 40, message: "Optimizing playlist for Spotify..." },
      { time: 50, message: "Preparing playlist for display..." },
      { time: 60, message: "Finishing touches..." },
    ];

    const updateProgress = setInterval(() => {
      const update = progressUpdates.find((u) => u.time === secondsElapsed);
      if (update) {
        setProgressMessage(update.message);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(updateProgress);
    };
  }, [secondsElapsed]);

  return (
    <div className="loading-panel flex flex-col w-full h-full items-center justify-center bg-main">
      <Image
        src="/beaver-loading.gif"
        alt="loading gif"
        width={400}
        height={200}
        className="w-1/2 h-auto"
      />
      <div className="text-center mt-4">
        <p className="text-white text-lg font-medium">{progressMessage}</p>
        <p className="text-gray-400 text-sm mt-2">
          Time elapsed: {secondsElapsed} seconds
        </p>
      </div>
    </div>
  );
}
