interface SongProps {
  image: string;
  songTitle: string;
  artist: string;
}

function Song(props: SongProps) {
  return (
    <div className="flex justify-evenly rounded items-center bg-white">
      <div className="bg-white w-1/4">
        <img src={props.image} alt="song image" />
      </div>
      <div className="bg-white w-1/4">
        <p>{props.songTitle}</p>
      </div>
      <div className="bg-white w-1/4">
        <p>{props.artist}</p>
      </div>
    </div>
  );
}

export default Song;
