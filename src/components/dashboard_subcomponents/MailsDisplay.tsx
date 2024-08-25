import { useState } from "react";
import { useSession } from "next-auth/react";
import userMailMatcher from "@/utils/userMailMatcher";
import { lazy } from "react";

const Inbox = lazy(() => import("@/components/dashboard_subcomponents/Inbox"));
const Sent = lazy(() => import("@/components/dashboard_subcomponents/Sent"));

export default function MailsDisplay({
  selectedOption,
}: {
  selectedOption: string;
}) {
  const { data: session, status } = useSession();
  const sender = userMailMatcher(session?.user?.email) || undefined;

  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSendNewMail = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedRecipient === "") return;
    try {
      const response = await fetch("/api/personal_mails/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender,
          recipient: selectedRecipient,
          subject,
          message,
        }),
      });
      if (!response.ok) {
        console.log("Failed to send mail");
        throw new Error("Failed to send mail");
      }
      setSelectedRecipient("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log("Mail could not be send" + error);
    }
  };

  if (selectedOption === "New Mail") {
    return (
      <div className="newMail__main">
        <form className="newMail__form" action="">
          <select
            onChange={(e) => setSelectedRecipient(e.target.value)}
            id="mailSelect"
            value={selectedRecipient}
          >
            <option value={""}>-Select Recipient-</option>
            <option value={"David"}>David</option>
            <option value={"Georg"}>Georg</option>
            <option value={"Kürsat"}>Kürsat</option>
            <option value={"Lukas"}>Lukas</option>
            <option value={"Willi"}>Willi</option>
          </select>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder="Subject"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            name="mailBody"
            id=""
          ></textarea>
          <button onClick={(e) => handleSendNewMail(e)}>SEND</button>
        </form>
      </div>
    );
  } else if (selectedOption === "Inbox") {
    return <Inbox />;
  } else {
    return <Sent />;
  }
}
