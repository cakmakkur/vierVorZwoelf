import connectToDatabase from "@/lib/mongodb";
import Playlist from "@/models/Playlist";
import { NextRequest } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const playlists = await Playlist.find();
    return new Response(JSON.stringify(playlists), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch playlists:", err);
  }

  return new Response(JSON.stringify({ error: "Failed to fetch playlists" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  // const { name, songs } = await request.json();
  let name = "New Playlist";
  const existing = await Playlist.findOne({ name });
  if (existing) {
    for (let i = 1; i < 100; i++) {
      const newName = `${name} #${i + 1}`;
      const newPlaylist = await Playlist.findOne({ name: newName });
      if (!newPlaylist) {
        name = newName;
        break;
      }
    }
  }
  try {
    const playlist = await Playlist.create({
      name,
      songs: [],
    });
    return new Response(JSON.stringify("Playlist created successfully"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to create playlist:", err);
  }
  return new Response(JSON.stringify({ error: "Failed to create playlist" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase();
  const { id } = await request.json();
  try {
    const playlist = await Playlist.findByIdAndDelete(id);
    return new Response(JSON.stringify("Playlist deleted successfully"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to delete playlist:", err);
  }
  return new Response(JSON.stringify({ error: "Failed to delete playlist" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: NextRequest) {
  await connectToDatabase();
  const { _id, name, songs } = await request.json();
  try {
    const playlist = await Playlist.findByIdAndUpdate(_id, {
      name,
      songs,
    });
    return new Response(JSON.stringify("Playlist updated successfully"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to update playlist:", err);
  }
  return new Response(JSON.stringify({ error: "Failed to update playlist" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}