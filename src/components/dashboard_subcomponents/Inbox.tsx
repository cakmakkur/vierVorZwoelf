"use client";

import { useSession } from "next-auth/react";
import userMailMatcher from "@/utils/userMailMatcher";
import { useEffect, useState, useRef } from "react";
import { ObjectId } from "mongoose";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { send } from "process";

interface Mail {
  _id: ObjectId;
  sender: string;
  recipient: string;
  subject: string;
  message: string;
  createdAt: Date;
  parentId?: ObjectId | null;
  threadId: ObjectId;
}

// TODO
// implement chain of replies in incoming mails

export default function Inbox() {
  const [replyBody, setReplyBody] = useState<string>("");
  const [hasReplied, setHasReplied] = useState<boolean>(false);
  const inboxDisplayRef = useRef<HTMLDivElement>(null);
  const [inboxMails, setInboxMails] = useState<Mail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedIndividualMail, setSelectedIndividualMail] =
    useState<Mail | null>(null);

  const { data: session, status } = useSession();
  const receiver = userMailMatcher(session?.user?.email) || undefined;

  const fetchInboxMails = async () => {
    try {
      const response = await fetch(
        `/api/personal_mails/?type=inbox&receiver=${receiver}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        console.log("Failed to fetch inbox mails");
        throw new Error("Failed to fetch inbox mails");
      }
      const data = await response.json();
      setInboxMails(data);
    } catch (error) {
      console.log("Error fetching inbox mails", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInboxMails();
  }, []);

  // Select a mail to slide to mail body
  const handleSelectMail = (index: number) => {
    inboxDisplayRef.current?.classList.add("inbox--mailSelected");
    setSelectedIndividualMail(inboxMails[index]);
  };
  const handleTurnBack = () => {
    setHasReplied(false);
    inboxDisplayRef.current?.classList.remove("inbox--mailSelected");
  };

  // Send reply

  const handleSendReply = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedIndividualMail === null) return;
    try {
      const response = await fetch("/api/personal_mails/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: receiver,
          recipient: selectedIndividualMail.sender,
          subject: `Re: ${selectedIndividualMail.subject}`,
          message: replyBody,
          parentId: selectedIndividualMail._id,
          threadId: selectedIndividualMail.threadId,
        }),
      });
      if (!response.ok) {
        console.log("Failed to send mail");
        throw new Error("Failed to send mail");
      }
      setHasReplied(true);
    } catch (error) {
      console.log("Mail could not be send" + error);
    }
  };

  if (isLoading) {
    <div className="inbox__main">
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
    </div>;
  }

  return (
    <div ref={inboxDisplayRef} className="inbox__main">
      <table className="inbox__table">
        <thead className="inbox__table__thead">
          <tr>
            <th>Sender</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody className="inbox__table__tbody">
          {inboxMails.map((mail, i) => {
            return (
              <tr
                onClick={() => handleSelectMail(i)}
                className="inbox__individualMail"
                key={i}
              >
                <td style={{ fontWeight: "600", color: "gray" }}>
                  {mail.sender}
                </td>
                <td>{mail.subject}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="inbox__body">
        {selectedIndividualMail ? (
          <div className="inbox__body__main">
            <div className="inbox__body__main__top">
              <div>
                From: <span>{selectedIndividualMail.sender}</span> &#183; at{" "}
                <span>
                  {new Date(
                    selectedIndividualMail.createdAt
                  ).toLocaleDateString()}
                </span>
                <Image
                  onClick={handleTurnBack}
                  src="/return_icon.png"
                  alt="return_icon"
                  width={30}
                  height={30}
                />
              </div>
              <div>
                Subject: <span>{selectedIndividualMail.subject}</span>
              </div>
              <div>{selectedIndividualMail.message}</div>
            </div>
            <form action="">
              <textarea
                disabled={hasReplied}
                placeholder="Reply"
                name="text"
                className="inbox__body__reply"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
              />
              <button
                disabled={hasReplied}
                style={
                  hasReplied
                    ? {
                        backgroundColor: "green",
                        color: "white",
                        cursor: "auto",
                      }
                    : {}
                }
                onClick={(e) => handleSendReply(e)}
              >
                {hasReplied ? "Replied" : "Send"}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
