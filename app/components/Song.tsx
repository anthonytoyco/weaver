import { useState } from "react";
interface SongProps {
  image: string;
  songTitle: string;
  artist: string;
}


function Song(props: SongProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #feb47b, #5e77c4)`,
  };

  return (
    <div onMouseOver={handleMouseMove} style={gradientStyle} className="flex-row song gap-2 flex w-full h-1/5 p-2 rounded items-center bg-[#191932]">
      <div className="text-white aspect-square w-1/6 font-light bg-black rounded-2xl">
        <img src={props.image} alt="" />
      </div>
      <div className="flex flex-col w-1/2 h-1/1">
        <div className="text-white w-1/4 font-light ">
          <p>{props.songTitle}</p>
        </div>
        <div className="text-white font-light w-full text-sm">
          <p>{props.artist}</p>
        </div>
      </div>
    </div>
  );
}

export default Song;
