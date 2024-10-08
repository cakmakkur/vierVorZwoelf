"use client";

import { useState, useRef, useEffect } from "react";
import github__logo from "../Assets/github-hp.png";
import linked__in__logo from "../Assets/linkedin.svg";
import Image from "next/image";

export default function ContactPage() {
  const sendMessageRef = useRef<HTMLDivElement>(null);
  const namePhRef = useRef<HTMLSpanElement>(null);
  const emailPhRef = useRef<HTMLSpanElement>(null);
  const subjectPhRef = useRef<HTMLSpanElement>(null);
  const messagePhRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState("");
  const [focus, setFocus] = useState("");
  const [messageStatus, setMessageStatus] = useState<string>("initial");
  const [failed, setFailed] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // INPUT FX
  useEffect(() => {
    namePhRef.current?.classList.remove("form__phc__text--active");
    emailPhRef.current?.classList.remove("form__phc__text--active");
    subjectPhRef.current?.classList.remove("form__phc__text--active");
    messagePhRef.current?.classList.remove("form__phc__text--active");

    if (focus === "name" || formData.name !== "") {
      namePhRef.current?.classList.add("form__phc__text--active");
    }
    if (focus === "email" || formData.email !== "") {
      emailPhRef.current?.classList.add("form__phc__text--active");
    }
    if (focus === "subject" || formData.subject !== "") {
      subjectPhRef.current?.classList.add("form__phc__text--active");
    }
    if (focus === "message" || formData.message !== "") {
      messagePhRef.current?.classList.add("form__phc__text--active");
    }
  }, [focus, formData]);

  // CONTACT FX
  useEffect(() => {
    sendMessageRef.current?.classList.remove("button__wrapper--active");
    if (isHovering === "hover") {
      sendMessageRef.current?.classList.add("button__wrapper--active");
    }
  }, [isHovering]);

  //REQUEST FORM
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setMessageStatus("sending");
      const response = await fetch("/contact/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setMessageStatus("sent");
      } else {
        setFailed(true);
        setMessageStatus("initial");
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setFailed(true);
      setMessageStatus("initial");
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="contact__page__main">
      {messageStatus === "initial" || messageStatus === "sending" ? (
        <form className="contact__form__div" onSubmit={handleSubmit}>
          <h1>{"GET IN TOUCH"}</h1>
          <label className="contact__label">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocus("name")}
              onBlur={() => setFocus("")}
              required
            />
            <span ref={namePhRef} className="form__phc__text">
              Name
            </span>
          </label>
          <label className="contact__label">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocus("email")}
              onBlur={() => setFocus("")}
              required
            />
            <span ref={emailPhRef} className="form__phc__text">
              E-Mail
            </span>
          </label>
          <label className="contact__label">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleChange(e)}
              onFocus={() => setFocus("subject")}
              onBlur={() => setFocus("")}
              required
            />
            <span ref={subjectPhRef} className="form__phc__text">
              Subject
            </span>
          </label>
          <label className="contact__label">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocus("message")}
              onBlur={() => setFocus("")}
              required
            />
            <span ref={messagePhRef} className="form__phc__text">
              Message
            </span>
          </label>
          {failed ? (
            <h6>❌ Message wasn&apos;t sent. Please try again.</h6>
          ) : (
            ""
          )}
          <div className="contact_button_div">
            <div
              ref={sendMessageRef}
              onMouseEnter={() => {
                setIsHovering("hover");
              }}
              onMouseLeave={() => {
                setIsHovering("");
              }}
              className="button__wrapper"
            >
              <button className="contact_button">
                {messageStatus === "initial" ? "CONTACT US" : "sending..."}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="sentSuccessfully">
          <h3>
            <Image
              src="/checkLogo-green.svg"
              alt="message sent successful icon"
              width={30}
              height={30}
            />{" "}
            Message Sent Successfully
          </h3>
          <div className="contact_button_div">
            <div
              ref={sendMessageRef}
              onMouseEnter={() => {
                setIsHovering("hover");
              }}
              onMouseLeave={() => {
                setIsHovering("");
              }}
              className="button__wrapper"
            >
              <button
                onClick={() => setMessageStatus("initial")}
                style={{ paddingTop: "0px" }}
                className="contact_button"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
