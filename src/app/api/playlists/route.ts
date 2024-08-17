import connectToDatabase from "@/lib/mongodb";
import Playlist from "@/models/Playlist";
import exp from "constants";
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
  const { name, songs } = await request.json();
  console.log("name" + name);
  console.log("songs" + songs);
  try {
    const playlist = await Playlist.create({
      name,
      songs,
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