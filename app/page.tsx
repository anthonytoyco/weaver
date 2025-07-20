import MusicPanel from "./components/MusicPanel";
import UploadPanel from "./components/UploadPanel";

export default function Home() {
  return (
    <div className="flex flex-row p-2 gap-2 w-screen h-screen bg-black">
      <UploadPanel />
      <MusicPanel />
    </div>
  );
}
