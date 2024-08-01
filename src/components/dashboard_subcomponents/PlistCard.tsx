import { useRef } from "react";

interface PropTypes {
  setSelectedPlistId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  deletePlaylist?: (id: string) => void;
  playlist?: {
    id: string;
    name: String;
    songs: String[];
  };
}

export default function PlistCard({
  playlist,
  deletePlaylist,
  setSelectedPlistId,
}: PropTypes) {
  const delBtnRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!delBtnRef.current) return;
    delBtnRef.current.style.display = "flex";
  };
  const handleMouseLeave = () => {
    if (!delBtnRef.current) return;
    delBtnRef.current.style.display = "none";
  };

  const handleDeleteCart = (id: string) => {
    if (deletePlaylist) {
      deletePlaylist(id);
    }
  };

  const handleEditPlaylist = (id: string) => {
    if (setSelectedPlistId) {
      setSelectedPlistId(id);
    }
  };

  if (!playlist) {
    return (
      <div className="playlists__card playlists__card--new">
        +<span>New Playlist</span>
      </div>
    );
  } else {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleEditPlaylist(playlist.id)}
        className="playlists__card"
      >
        <div
          onClick={() => handleDeleteCart(playlist.id)}
          ref={delBtnRef}
          className="delete__btn__wrapper"
        >
          X
        </div>
        <ol>
          {playlist.songs.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
        <span>{playlist.name}</span>
      </div>
    );
  }
}
