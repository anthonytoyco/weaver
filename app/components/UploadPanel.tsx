"use client";
import { ReactNode, useState } from "react";
export default function UploadPanel(): ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      console.log(await response.json())
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(error);
    }
  }

  return (
    <div className="flex flex-col w-1/3 p-2 gap-2 h-full bg-[#121212] rounded">
      <div className="flex color-white font-light text-xl justify-around text-white">
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
          onClick={handleUpload}
          className="flex justify-around items-center w-1/2 h-10 bg-green-50 rounded-full"
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
}
