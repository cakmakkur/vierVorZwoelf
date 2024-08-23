"use client";

interface PropTypes {
  setSelectedPlistId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  playlist?: {
    _id: string;
    name: String;
    songs: String[];
  };
  setShouldFetchPlists?: React.Dispatch<React.SetStateAction<string | boolean>>;
  shouldFetchPlists?: string | boolean;
}

export default function PlistCard({
  playlist,
  setSelectedPlistId,
  setShouldFetchPlists,
  shouldFetchPlists,
}: PropTypes) {
  const handleEditPlaylist = (id: string) => {
    if (setSelectedPlistId) {
      setSelectedPlistId(id);
    }
  };

  const handleAddNewPlaylist = async () => {
    try {
      const response = await fetch("/api/playlists/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log("Failed to update playlist");
        throw new Error("Failed to update the playlist");
      }
      if (setShouldFetchPlists) {
        if (typeof shouldFetchPlists === "string") {
          setShouldFetchPlists(true);
        }
        setShouldFetchPlists((prev) => !prev);
      }
    } catch {
      console.error("Failed to create playlist");
    }
  };

  if (!playlist) {
    return (
      <div
        onClick={handleAddNewPlaylist}
        className="playlists__card playlists__card--new"
      >
        +<span>New Playlist</span>
      </div>
    );
  } else {
    return (
      <div
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
