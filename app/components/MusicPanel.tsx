import Song from "./Song";
import "./components.css";

function MusicPanel() {
  const songs = [
    { title: "AnySong", description: "some description" },
    { title: "AnySong1", description: "another description" },
    { title: "AnySong2", description: "new description" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full bg-black">
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
