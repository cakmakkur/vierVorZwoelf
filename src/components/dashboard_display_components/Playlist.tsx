"use client";

import React from "react";
import PlistCard from "../dashboard_subcomponents/PlistCard";
import { useState, useEffect } from "react";
import Image from "next/image";
import PlistEdit from "../dashboard_subcomponents/PlistEdit";

interface PlaylistType {
  _id: string;
  name: string;
  songs: string[];
}

const Playlist = () => {
  const [playlists, setPlaylists] = useState<undefined | PlaylistType[]>(
    undefined
  );
  const [hasFetchFailed, setHasFetchFailed] = useState<boolean>(false);

  const [selectedPlistId, setSelectedPlistId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch("/api/playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        if (!data.length) {
          setHasFetchFailed(true);
          throw new Error("Failed to fetch the playlists");
        }
        setPlaylists(data);
      } catch (err) {
        alert("Failed to fetch the playlists");
      }
    }
    fetchPlaylists();
  }, []);

  return (
    <div className="playlists__main display__component">
      <p>Playlists</p>
      <div className="playlists__searchbar">
        <input placeholder="Search playlist" type="search" />
        <button>
          <Image
            style={{ display: "inline-block" }}
            height={24}
            width={24}
            alt="search icon"
            src="/search_icon.png"
          />
        </button>
      </div>
      <div className="playlists__body">
        <PlistCard />
        {playlists?.map((list, i) => (
          <PlistCard
            key={i}
            setSelectedPlistId={setSelectedPlistId}
            playlist={list}
          />
        ))}
      </div>
      {/* Edit page / pop up */}
      <PlistEdit
        setPlaylists={setPlaylists}
        setSelectedPlistId={setSelectedPlistId}
        initialPlaylist={playlists?.filter((p) => p._id === selectedPlistId)}
      />
    </div>
  );
};

export default Playlist;
