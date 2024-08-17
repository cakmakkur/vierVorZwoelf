"use client";

import { useRef } from "react";

interface PropTypes {
  setSelectedPlistId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  playlist?: {
    _id: string;
    name: String;
    songs: String[];
  };
}

export default function PlistCard({ playlist, setSelectedPlistId }: PropTypes) {
  const delBtnRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!delBtnRef.current) return;
    delBtnRef.current.style.display = "flex";
  };
  const handleMouseLeave = () => {
    if (!delBtnRef.current) return;
    delBtnRef.current.style.display = "none";
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
        onClick={() => handleEditPlaylist(playlist._id)}
        className="playlists__card"
      >
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
