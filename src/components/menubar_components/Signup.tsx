"use client";

import { Span } from "next/dist/trace";
import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

interface propTypes {
  setDropdownState: React.Dispatch<React.SetStateAction<string>>;
}

interface errorTypes {
  email: "taken" | "invalid" | "";
  username: "tooShort" | "taken" | "";
  password: "tooShort" | "";
  confirmation: boolean;
}

export default function Signup({ setDropdownState }: propTypes) {
  const [formErrors, setFormErrors] = useState<errorTypes>({
    email: "",
    username: "",
    password: "",
    confirmation: true,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // INPUT FX
  const usernamePhRef = useRef<HTMLSpanElement>(null);
  const passwordPhRef = useRef<HTMLSpanElement>(null);
  const emailPhRef = useRef<HTMLSpanElement>(null);
  const passwordConfirmationPhRef = useRef<HTMLSpanElement>(null);
  const [focus, setFocus] = useState("");
  useEffect(() => {
    usernamePhRef.current?.classList.remove("form__ph__text--active");
    passwordPhRef.current?.classList.remove("form__ph__text--active");
    emailPhRef.current?.classList.remove("form__ph__text--active");
    passwordConfirmationPhRef.current?.classList.remove(
      "form__ph__text--active"
    );
    if (focus === "username" || formData.username !== "") {
      usernamePhRef.current?.classList.add("form__ph__text--active");
    }
    if (focus === "password" || formData.password !== "") {
      passwordPhRef.current?.classList.add("form__ph__text--active");
    }
    if (focus === "passwordConfirmation" || passwordConfirmation !== "") {
      passwordConfirmationPhRef.current?.classList.add(
        "form__ph__text--active"
      );
    }
    if (focus === "email" || formData.email !== "") {
      emailPhRef.current?.classList.add("form__ph__text--active");
    }
  }, [focus, formData, passwordConfirmation]);

  // Fill the form
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Check form input
  const inspectFormInput = () => {
    let hasFailed = false;

    if (formData.username.length < 8) {
      setFormErrors((prev) => ({ ...prev, username: "tooShort" }));
      hasFailed = true;
    } else {
      setFormErrors((prev) => ({ ...prev, username: "" }));
    }

    if (!formData.email.includes(".") || !formData.email.includes("@")) {
      setFormErrors((prev) => ({ ...prev, email: "invalid" }));
      hasFailed = true;
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }

    if (formData.password.length < 8) {
      setFormErrors((prev) => ({ ...prev, password: "tooShort" }));
      hasFailed = true;
    } else {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }

    if (formData.password !== passwordConfirmation) {
      setFormErrors((prev) => ({ ...prev, confirmation: false }));
      hasFailed = true;
    } else {
      setFormErrors((prev) => ({ ...prev, confirmation: true }));
    }

    console.log("has failed is: " + hasFailed + "returning");
    return hasFailed;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const hasFailed = inspectFormInput();
    if (hasFailed) return;

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDropdownState("signedUp");
      } else {
        const errorData = await res.json();
        console.log(errorData);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="account__signupDiv">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="login__label">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => setFocus("username")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={usernamePhRef} className="form__ph__text">
            Username
          </span>
        </label>
        {formErrors.username === "tooShort" ? (
          <span className="error__message__span">
            Username must be at least 8 characters!
          </span>
        ) : formErrors.username === "taken" ? (
          <span className="error__message__span">
            This username is already used!
          </span>
        ) : (
          ""
        )}
        <label htmlFor="email" className="login__label">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={emailPhRef} className="form__ph__text">
            Email
          </span>
        </label>
        {formErrors.email === "invalid" ? (
          <span className="error__message__span">Invalid email address!</span>
        ) : formErrors.email === "taken" ? (
          <span className="error__message__span">
            This email address is already used!
          </span>
        ) : (
          ""
        )}
        <label htmlFor="password" className="login__label">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={passwordPhRef} className="form__ph__text">
            Password
          </span>
        </label>
        {formErrors.password === "tooShort" ? (
          <span className="error__message__span">
            Password must be at least 8 characters
          </span>
        ) : (
          ""
        )}
        <label htmlFor="passwordConfirmation" className="login__label">
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            onFocus={() => setFocus("passwordConfirmation")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={passwordConfirmationPhRef} className="form__ph__text">
            Repeat Password
          </span>
        </label>
        {!formErrors.confirmation ? (
          <span className="error__message__span">
            Password doesn&apos;t match!
          </span>
        ) : (
          ""
        )}
        <button className="account__form__button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
