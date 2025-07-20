import Song from "./Song";
import "./components.css";

interface MusicPanelProps {
  background: string;
}

function MusicPanel(props: MusicPanelProps) {
  const songs = [
    { title: "AnySong", description: "some description" },
    { title: "AnySong1", description: "another description" },
    { title: "AnySong2", description: "new description" },
  ];

  return (
    <div className={`flex flex-col gap-2 w-full ${props.background}`}>
      {songs.map((song) => (
        <Song
          key={song.title}
          songTitle={song.title}
          artist={song.description}
          image="/default-image.png"
        />
      ))}
    </div>
  );
}

export default MusicPanel;
