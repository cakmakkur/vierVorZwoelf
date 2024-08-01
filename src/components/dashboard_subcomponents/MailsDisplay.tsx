import { useState } from "react";

export default function MailsDisplay({
  selectedOption,
}: {
  selectedOption: string;
}) {
  const [selectedRecipient, setSelectedRecipient] = useState<
    string | undefined
  >(undefined);

  if (selectedOption === "New Mail") {
    return (
      <div className="newMail__main">
        <form className="newMail__form" action="">
          <select id="mailSelect">
            <option onChange={() => setSelectedRecipient(undefined)} value="">
              -Select Recipient-
            </option>
            <option
              onChange={() => setSelectedRecipient("David")}
              value={"David"}
            >
              David
            </option>
            <option
              onChange={() => setSelectedRecipient("Georg")}
              value={"Georg"}
            >
              Georg
            </option>
            <option
              onChange={() => setSelectedRecipient("Kürsat")}
              value={"Kürsat"}
            >
              Kürsat
            </option>
            <option
              onChange={() => setSelectedRecipient("Lukas")}
              value={"Lukas"}
            >
              Lukas
            </option>
            <option
              onChange={() => setSelectedRecipient("Willi")}
              value={"Willi"}
            >
              Willi
            </option>
          </select>
          <input type="text" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message" name="mailBody" id=""></textarea>
          <button>SEND</button>
        </form>
      </div>
    );
  } else if (selectedOption === "Inbox") {
    return (
      <div className="inbox__main">
        <table className="inbox__table">
          <thead className="inbox__table__thead">
            <tr>
              <th>Sender</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody className="inbox__table__tbody">
            <tr>
              <td style={{ fontWeight: "600", color: "gray" }}>Kürsi</td>
              <td>About the stuff I asked...</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "gray" }}>Sabriña</td>
              <td>This and that</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "gray" }}>
                Herr Kredithai
              </td>
              <td>Where is my money, man???</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
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
            <tr>
              <td style={{ fontWeight: "600", color: "gray" }}>
                Herr Kredithai
              </td>
              <td>
                Man, I got your money. Like almost.. I need some more time man!!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
