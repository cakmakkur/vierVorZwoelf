"use client";

import React, { useTransition } from "react";
import PlistCard from "../dashboard_subcomponents/PlistCard";
import { useState, useEffect } from "react";
import Image from "next/image";
import PlistEdit from "../dashboard_subcomponents/PlistEdit";
import ClipLoader from "react-spinners/ClipLoader";

interface PlaylistType {
  _id: string;
  name: string;
  songs: string[];
}

const Playlist = () => {
  const [isPending, startTransition] = useTransition();
  const [playlists, setPlaylists] = useState<undefined | PlaylistType[]>(
    undefined
  );
  const [searchQueryPlists, setSearchQueryPlaylists] = useState<
    undefined | PlaylistType[]
  >(undefined);
  const [hasFetchFailed, setHasFetchFailed] = useState<boolean>(false);
  const [shouldFetchPlists, setShouldFetchPlists] = useState<string | boolean>(
    "initial"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPlistId, setSelectedPlistId] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function fetchPlaylists(arg: string) {
    // during the initial fetching it shows the loading spinner
    // consequent fetchings use useTransition to avoid the loading spinner
    if (arg === "initial") {
      setIsLoading(true);
    }
    try {
      const response = await fetch("/api/playlists", { cache: "no-store" });
      if (!response.ok) {
        setHasFetchFailed(true);
        throw new Error("Failed to fetch playlists");
      }
      setHasFetchFailed(false);
      const data = await response.json();
      if (!data.length) {
        setHasFetchFailed(true);
        throw new Error("Failed to fetch the playlists");
      }
      setPlaylists(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (shouldFetchPlists === "initial") {
      fetchPlaylists("initial");
    } else {
      startTransition(() => {
        fetchPlaylists("update");
      });
    }
  }, [shouldFetchPlists]);

  useEffect(() => {
    if (searchQuery.length) {
      const filteredPlaylists = playlists?.filter((playlist) => {
        return playlist.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchQueryPlaylists(filteredPlaylists);
    }
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader
          color="blue"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!isLoading && hasFetchFailed) {
    return (
      <div className="playlists__main--failed">
        <p>Failed to fetch the playlists</p>
        <button onClick={() => fetchPlaylists("initial")}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="playlists__main display__component">
      <p>Playlists</p>
      <div className="playlists__searchbar">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search playlist"
          type="search"
        />
        {searchQuery === "" ? (
          <button>
            <Image
              style={{ display: "inline-block" }}
              height={24}
              width={24}
              alt="search icon"
              src="/search_icon.png"
            />
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="playlists__body">
        <PlistCard
          shouldFetchPlists={shouldFetchPlists}
          setShouldFetchPlists={setShouldFetchPlists}
        />
        {searchQuery === ""
          ? playlists?.map((list, i) => (
              <PlistCard
                key={i}
                setSelectedPlistId={setSelectedPlistId}
                playlist={list}
              />
            ))
          : searchQueryPlists?.map((list, i) => (
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
