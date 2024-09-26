import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

interface BandMailType {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function BandMailsDisplay() {
  const [bandMails, setBandMails] = useState<BandMailType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetchFailed, setHasFetchFailed] = useState<boolean>(false);
  const [toggleDelConfirm, setToggleDelConfirm] = useState<boolean>(false);
  const [selectedBandMail, setSelectedBandMail] = useState<string | undefined>(
    undefined
  );

  const handleClick = (selectedMailId: string) => {
    setSelectedBandMail(selectedMailId);
  };

  const handleDelSong = async (selectedBandMail: string) => {
    try {
      const response = await fetch("/contact/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedBandMail,
        }),
      });
      if (!response.ok) {
        console.log("Failed to delete band mail");
        throw new Error("Failed to delete band mail");
      }
      setToggleDelConfirm(false);
      setSelectedBandMail(undefined);
      fetchMails();
    } catch (err) {
      console.log("Failed to delete band mail" + err);
    }
  };

  const fetchMails = async () => {
    try {
      const response = await fetch("/contact/api", { cache: "no-store" });
      if (!response.ok) {
        setHasFetchFailed(true);
        throw new Error("Failed to fetch band mails");
      }
      const data = await response.json();

      setBandMails(data.reverse());
    } catch (err) {
      console.log("Failed to fetch band mails" + err);
      setHasFetchFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMails();
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

  if (!isLoading && hasFetchFailed) {
    return (
      <div className="playlists__main--failed">
        <p>Failed to fetch the playlists</p>
        <button onClick={() => fetchMails()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="bandMails__display">
      <div className="mails__sidebar">
        <ul>
          {bandMails.map((mail, i) => {
            return (
              <li
                className="bandMails__display__li"
                onClick={() => handleClick(mail._id)}
                key={i}
              >
                <span> {mail.email}</span>
                <br />
                <span style={{ fontWeight: "600" }}> {mail.subject}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {bandMails.map((mail) => {
        if (mail._id === selectedBandMail) {
          return (
            <div key={mail._id} className="bandMails__display__main">
              <div className="bandMails__display__sender">
                From: <span>{mail.email}</span> <br />
                Name: <span>{mail.name}</span> <br />
                Date:{" "}
                <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
                <div className="mails_del_btn">
                  <Image
                    alt="delete playlist"
                    width={22}
                    height={22}
                    src="/trash_bin-r.png"
                    style={{ cursor: "pointer" }}
                    onClick={() => setToggleDelConfirm((prev) => !prev)}
                  />
                  <div
                    className={`mails_del_confirmBox ${
                      toggleDelConfirm
                        ? "mails_del_confirmBox_delMail--active"
                        : ""
                    }`}
                  >
                    Are you sure you want to delete this message?
                    <br />
                    <button onClick={() => setToggleDelConfirm(false)}>
                      No
                    </button>
                    <button onClick={() => handleDelSong(selectedBandMail)}>
                      Yes
                    </button>
                  </div>
                </div>
              </div>
              <div className="bandMails__display__message">{mail.message}</div>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}
