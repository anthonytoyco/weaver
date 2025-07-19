import MusicPanel from "./components/MusicPanel";

export default function Home() {
  return (
    <div className="flex flex-row p-2 gap-2 w-screen h-screen bg-black">
      <div className="flex flex-col w-1/3 p-2 gap-2 h-full bg-[#121212] rounded">
        <div className="flex color-white font-light text-xl justify-around text-white">
          WEAVER
        </div>
        <div className="w-full h-1/2 bg-black rounded"></div>
        <div className="flex justify-around w-full">
          <button className="flex justify-around items-center w-1/2 h-10 bg-green-50 rounded-full">
            UPLOAD
          </button>
        </div>
      </div>
      <MusicPanel />
    </div>
  );
}
