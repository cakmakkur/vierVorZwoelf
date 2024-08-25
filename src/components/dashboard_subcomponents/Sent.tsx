import { useSession } from "next-auth/react";
import userMailMatcher from "@/utils/userMailMatcher";
import { useEffect, useState } from "react";
import { ObjectId, set } from "mongoose";
import ClipLoader from "react-spinners/ClipLoader";

interface Mail {
  sender: string;
  recipient: string;
  subject: string;
  message: string;
  createdAt: Date;
  parentId?: ObjectId | null;
  threadId: ObjectId;
}

export default function Sent() {
  const [sentMails, setSentMails] = useState<Mail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMail, setSelectedMail] = useState<null | number>(null);

  const { data: session, status } = useSession();
  const sender = userMailMatcher(session?.user?.email) || undefined;

  const fetchSentMails = async () => {
    try {
      const response = await fetch(
        `/api/personal_mails/?type=sent&sender=${sender}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      if (!response.ok) {
        console.log("Failed to fetch sent mails");
        throw new Error("Failed to fetch sent mails");
      }
      const data = await response.json();
      setSentMails(data);
    } catch (error) {
      console.log("Error fetching sent mails", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectMail = (index: number) => {
    if (selectedMail === null) {
      setSelectedMail(index);
    } else {
      setSelectedMail(null);
    }
  };

  useEffect(() => {
    fetchSentMails();
  }, []);

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
    <div className="inbox__main">
      <table className="inbox__table">
        <thead className="inbox__table__thead">
          <tr>
            <th>To</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody className="inbox__table__tbody">
          {sentMails.map((mail, i) => {
            return (
              <tr
                onClick={() => toggleSelectMail(i)}
                className="inbox__individualMail"
                key={i}
              >
                <td style={{ fontWeight: "600", color: "gray" }}>
                  {mail.recipient}
                </td>
                <td>{mail.subject}</td>
                {selectedMail === i && <div>{mail.message}</div>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
