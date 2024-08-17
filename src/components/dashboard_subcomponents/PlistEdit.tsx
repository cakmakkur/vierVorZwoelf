"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import Image from "next/image";

interface PlaylistType {
  _id: string;
  name: string;
  songs: string[];
}

interface PropTypes {
  initialPlaylist?: PlaylistType[];
  setSelectedPlistId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlaylists: React.Dispatch<
    React.SetStateAction<undefined | PlaylistType[]>
  >;
}

export default function PlistEdit({
  initialPlaylist,
  setSelectedPlistId,
  setPlaylists,
}: PropTypes) {
  const [playlist, setPlaylist] = useState<PlaylistType | undefined>(undefined);
  const [updatedPlaylist, setUpdatedPlaylist] = useState<
    PlaylistType | undefined
  >(undefined);
  const [toggledSong, setToggledSong] = useState<string>("");
  const [toggleDelConfirm, setToggleDelConfirm] = useState<number | undefined>(
    undefined
  );
  const [newSong, setNewSong] = useState<string>("");
  const [tooltip, setTooltip] = useState("");
  const tooltipTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!initialPlaylist?.length) return;
    setPlaylist(initialPlaylist[0]);
    // array will have only one object in it, with the playlist...
    setUpdatedPlaylist(initialPlaylist[0]);
  }, [initialPlaylist]);

  const handleChangeName = (name: string) => {
    if (!updatedPlaylist) return;
    const newUpdatedPlaylist = { ...updatedPlaylist, name };
    setUpdatedPlaylist(newUpdatedPlaylist);
  };
  const handleCloseEdit = () => {
    setPlaylist(undefined);
    setSelectedPlistId(undefined);
    setToggledSong("");
  };
  const handleToggleSong = (song: string) => {
    setToggledSong(song);
  };
  const handleSongNameChange = (newSongName: string, i: number) => {
    if (!updatedPlaylist) return;
    const newSongs = [...updatedPlaylist.songs];
    newSongs[i] = newSongName;
    const newUpdatedPlaylist = { ...updatedPlaylist, songs: newSongs };
    setUpdatedPlaylist(newUpdatedPlaylist);
  };
  const handleRevertChanges = () => {
    if (!initialPlaylist) return;
    setPlaylist(initialPlaylist[0]);
    setUpdatedPlaylist(initialPlaylist[0]);
  };
  const handleOrderDown = (i: number) => {
    if (!updatedPlaylist || i === updatedPlaylist.songs.length - 1) return;
    const newSongs: string[] = [...updatedPlaylist.songs];
    [newSongs[i], newSongs[i + 1]] = [newSongs[i + 1], newSongs[i]];
    const newUpdatedPlaylist = { ...updatedPlaylist, songs: newSongs };
    setUpdatedPlaylist(newUpdatedPlaylist);
    setPlaylist(newUpdatedPlaylist);
  };
  const handleOrderUp = (i: number) => {
    if (!updatedPlaylist || i === 0) return;
    const newSongs: string[] = [...updatedPlaylist.songs];
    [newSongs[i], newSongs[i - 1]] = [newSongs[i - 1], newSongs[i]];
    const newUpdatedPlaylist = { ...updatedPlaylist, songs: newSongs };
    setUpdatedPlaylist(newUpdatedPlaylist);
    setPlaylist(newUpdatedPlaylist);
  };
  const handleAddNewSong = (e: FormEvent) => {
    e.preventDefault();
    if (!updatedPlaylist || newSong.trim() === "") return;
    const newSongs: string[] = [...updatedPlaylist.songs, newSong.trim()];
    const newUpdatedPlaylist: PlaylistType = {
      ...updatedPlaylist,
      songs: newSongs,
    };
    setUpdatedPlaylist(newUpdatedPlaylist);
    setPlaylist(newUpdatedPlaylist);
    setNewSong("");
  };
  const handleToggleDelConfirm = (i: number) => {
    if (toggleDelConfirm === i) {
      setToggleDelConfirm(undefined);
    } else {
      setToggleDelConfirm(i);
    }
  };
  const handleDeleteSong = (i: number) => {
    if (!updatedPlaylist) return;
    const newSongs: string[] = [...updatedPlaylist.songs];
    newSongs.splice(i, 1);
    const newUpdatedPlaylist = { ...updatedPlaylist, songs: newSongs };
    setUpdatedPlaylist(newUpdatedPlaylist);
    setPlaylist(newUpdatedPlaylist);
    setToggleDelConfirm(undefined);
  };
  // delete
  const handleDeletePlaylist = async () => {
    try {
      const response = await fetch("/api/playlists/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: playlist?._id }),
      });
      if (!response.ok) {
        console.log("Failed to delete playlist");
        throw new Error("Failed to delete the playlist");
      }
      handleCloseEdit();
      setPlaylists(
        (prev) => prev?.filter((list) => list._id !== playlist?._id)
      );
    } catch (err) {
      console.log("Failed to delete playlist");
      throw new Error("Failed to delete the playlist");
    }
  };

  //TOOLTIP FUNCTIONS
  const handleMouseOver = (param: string) => {
    if (tooltipTimeoutRef.current !== null) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setTooltip(param);
    }, 1000);
  };
  const handleMouseOut = () => {
    if (tooltipTimeoutRef.current !== null) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setTooltip("");
  };

  useEffect(() => {
    setPlaylist(updatedPlaylist);
  }, [toggledSong]);

  return (
    <div className={`plistEdit__main ${playlist ? "plistEdit--active" : ""}`}>
      <button onClick={handleCloseEdit} className="plistEdit__closeBtn">
        <Image src="/close_icon.png" width={45} height={45} alt="close icon" />
      </button>

      <div className="plistEdit__display">
        <label className="plistEdit__title__label" htmlFor="playlist__title">
          Playlist Name:
          <br />
          <input
            id="playlist__title"
            className="plistEdit__title__input"
            onChange={(e) => handleChangeName(e.target.value)}
            type="text"
            value={updatedPlaylist?.name}
          />
        </label>
        <div className="plistEdit__songs">
          {playlist?.songs.map((song, i) => (
            <div
              onClick={() => handleToggleSong(song)}
              className="plistEdit__song"
              key={i}
              style={
                toggledSong === song ? { backgroundColor: "lightblue" } : {}
              }
            >
              {toggledSong === song ? (
                <input
                  className="plistEdit__song__name--input"
                  value={updatedPlaylist?.songs[i]}
                  onChange={(e) => handleSongNameChange(e.target.value, i)}
                ></input>
              ) : (
                <div className="plistEdit__song__name">{song}</div>
              )}
              {toggledSong === song ? (
                <div className="plistEdit__song__sort">
                  <Image
                    alt="arrow up"
                    width={40}
                    height={13}
                    src="/arrow_up-nr.png"
                    onClick={() => handleOrderUp(i)}
                  />
                  <Image
                    alt="arrow down"
                    width={40}
                    height={13}
                    src="/arrow_down-nr.png"
                    onClick={() => handleOrderDown(i)}
                  />
                </div>
              ) : (
                ""
              )}
              {toggledSong === song ? (
                <div className="plistEdit__song__del">
                  <Image
                    alt="arrow down"
                    width={22}
                    height={22}
                    src="/trash_bin-r.png"
                    onClick={() => handleToggleDelConfirm(i)}
                  />
                  <div
                    className={`plistEdit__song__del__confirmBox ${
                      toggleDelConfirm === i
                        ? "plistEdit__song__del__confirmBox--active"
                        : ""
                    }`}
                  >
                    Are you sure you want to delete the song?
                    <br />
                    <button onClick={() => setToggleDelConfirm(undefined)}>
                      No
                    </button>
                    <button onClick={() => handleDeleteSong(i)}>Yes</button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <form
          className="plistEdit__addNewSong"
          onSubmit={(e) => handleAddNewSong(e)}
        >
          <button type="submit">
            <Image
              width={50}
              height={50}
              alt="add button plus icon"
              src="/add_circle.png"
            />
          </button>
          <input
            value={newSong}
            onChange={(e) => setNewSong(e.target.value)}
            placeholder="Add a new song..."
            type="text"
            name=""
            id=""
          />
        </form>
        <div className="plistEdit__options">
          <div className="plistEdit__options--left">
            <button
              onMouseOver={() => handleMouseOver("download")}
              onMouseOut={handleMouseOut}
              className="plistEdit__display__downloadBtn"
              disabled={playlist !== updatedPlaylist}
            >
              <Image
                src="/download_icon.png"
                width={40}
                height={40}
                alt="download icon"
              />
              <span
                className={`playlistEdit__tooltip ${
                  tooltip === "download" ? "playlistEdit__tooltip--open" : ""
                }`}
              >
                Download PDF
              </span>
            </button>
            <button
              onMouseOver={() => handleMouseOver("revert")}
              onMouseOut={handleMouseOut}
              onClick={handleRevertChanges}
            >
              <Image
                src="/undo_icon.png"
                width={40}
                height={40}
                alt="undo icon"
              />
              <span
                className={`playlistEdit__tooltip ${
                  tooltip === "revert" ? "playlistEdit__tooltip--open" : ""
                }`}
              >
                Revert Changes
              </span>
            </button>
            <button
              onMouseOver={() => handleMouseOver("save")}
              onMouseOut={handleMouseOut}
            >
              <Image
                src="/save_icon.png"
                width={40}
                height={40}
                alt="save icon"
              />
              <span
                className={`playlistEdit__tooltip ${
                  tooltip === "save" ? "playlistEdit__tooltip--open" : ""
                }`}
              >
                Save Changes
              </span>
            </button>
          </div>
          <div className="plistEdit__options--right">
            <button
              onMouseOver={() => handleMouseOver("delete")}
              onMouseOut={handleMouseOut}
              onClick={() => handleDeletePlaylist()}
            >
              <Image
                src="/delete_icon.png"
                width={40}
                height={40}
                alt="delete icon"
              />
              <span
                className={`playlistEdit__tooltip ${
                  tooltip === "delete" ? "playlistEdit__tooltip--open" : ""
                }`}
              >
                Delete Playlist
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
