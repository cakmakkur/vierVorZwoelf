"use client";

import React from "react";
import pList from "@/utils/tempPlist.json";
import PlistCard from "../dashboard_subcomponents/PlistCard";
import axiosPublic from "@/utils/axiosPublic";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PlaylistType {
  id: string;
  name: string;
  songs: string[];
}

const Playlist = () => {
  // const [playlists, setPlaylists] = useState<undefined | PlaylistType>(
  //   undefined
  // );
  const [hasFetchFailed, setHasFetchFailed] = useState<boolean>(false);
  const [selectedPlistId, setSelectedPlistId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("selected id: " + selectedPlistId);
  }, [selectedPlistId]);

  // useEffect(() => {
  //   async function fetchPlaylists() {
  //     try {
  //       const response = await axiosPublic.get("/route");
  //       const data = response.data;
  //       if (!data.length) {
  //         setHasFetchFailed(true);
  //         throw new Error("Failed to fetch the playlists");
  //       }
  //       setPlaylists(data);
  //     } catch (err) {
  //       alert("Failed to fetch the playlists");
  //     }
  //   }
  //   fetchPlaylists();
  // }, []);

  // // delete
  const deletePlaylist = async (id: string) => {
    try {
      const response = await axiosPublic.delete(`/route/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete the playlist");
        alert("Failed to delete the playlist");
      }
    } catch (err) {
      alert("Failed to delete the playlist");
    }
  };

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
        {pList.map((list, i) => (
          <PlistCard
            key={i}
            setSelectedPlistId={setSelectedPlistId}
            deletePlaylist={deletePlaylist}
            playlist={list}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
