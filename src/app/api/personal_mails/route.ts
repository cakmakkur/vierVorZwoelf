import connectToDatabase from "@/lib/mongodb";
import Mail from "@/models/mail";
import { NextRequest } from "next/server";

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

  if (!parentId) {
    // create new mail
    try {
      const newMail = new Mail({
        sender,
        recipient,
        subject,
        message,
      });
      const savedMail = await newMail.save();
      savedMail.threadId = savedMail._id;
      await savedMail.save();
      return new Response(JSON.stringify("Mail sent"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Mail could not be sent", err);
      return new Response(JSON.stringify({err: "Sending mail failed"})), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    }
  } else {
    // create a reply
    const replyMail = new Mail({
      sender,
      recipient,
      subject,
      message,
      threadId,
      parentId,
    })
    try {
      await replyMail.save();
      return new Response(JSON.stringify("Mail sent"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    catch (err) {
      console.error("Mail could not be sent", err);
      return new Response(JSON.stringify({err: "Sending mail failed"})), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    }
  }
}