import connectToDatabase from "@/lib/mongodb";
import Mail from "@/models/Mail";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")

  try {
    if (type === "inbox") {
      const receiver = searchParams.get("receiver")
      const inboxMails = await Mail.find({ recipient: receiver });
      return new Response(JSON.stringify(inboxMails), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else if (type === "sent") {
      const sender = searchParams.get("sender")
      const sentMails = await Mail.find({ sender });
      return new Response(JSON.stringify(sentMails), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  catch (err) {
    return new Response(JSON.stringify("Failed to fetch mails"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const { sender, recipient, subject, message, parentId, threadId } = await request.json();

  try {
    if (!parentId) {
      // Create new mail
      const newMail = new Mail({
        sender,
        recipient,
        subject,
        message,
      });
      const savedMail = await newMail.save();
      savedMail.threadId = savedMail._id;
      await savedMail.save();
      return new NextResponse(JSON.stringify("Mail sent"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Create a reply
      const replyMail = new Mail({
        sender,
        recipient,
        subject,
        message,
        threadId,
        parentId,
      });
      await replyMail.save();
      return new NextResponse(JSON.stringify("Mail sent"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error("Mail could not be sent", err);
    return new NextResponse(JSON.stringify({ err: "Sending mail failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}