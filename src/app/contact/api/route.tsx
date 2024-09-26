import connectToDatabase from "@/lib/mongodb";
import { NextRequest } from "next/server";
import BandMail from "@/models/BandMail";

export async function GET(request: NextRequest) {
  await connectToDatabase();
  try {
    const mails = await BandMail.find();
    return new Response(JSON.stringify(mails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify("Failed to get messages"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const { name, email, subject, message } = await request.json();
    const newMail = new BandMail({
      name,
      email,
      subject,
      message,
    });
    const savedMail = await newMail.save();
    console.log("New post received");
    return new Response(JSON.stringify(savedMail), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify("Failed to send message"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase();
  try {
    const { id } = await request.json();
    const deletedMail = await BandMail.findByIdAndDelete(id);
    if (!deletedMail) {
      return new Response(JSON.stringify("Failed to delete message"), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify("Message deleted"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify("Failed to delete message"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
