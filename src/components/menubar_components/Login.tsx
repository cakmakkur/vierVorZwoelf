"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

interface propTypes {
  setDropdownState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setDropdownState }: propTypes) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // INPUT FX
  const usernamePhRef = useRef<HTMLSpanElement>(null);
  const passwordPhRef = useRef<HTMLSpanElement>(null);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    usernamePhRef.current?.classList.remove("form__ph__text--active");
    passwordPhRef.current?.classList.remove("form__ph__text--active");

    if (focus === "username" || username !== "") {
      usernamePhRef.current?.classList.add("form__ph__text--active");
    }
    if (focus === "password" || password !== "") {
      passwordPhRef.current?.classList.add("form__ph__text--active");
    }
  }, [focus, username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setDropdownState("loggedIn");
      // router.push("/protectedPageWrapper");
    }
  };

  return (
    <div className="account__loginDiv">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="login__label">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocus("username")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={usernamePhRef} className="form__ph__text">
            Userame
          </span>
        </label>
        <label htmlFor="password" className="login__label">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
            required
          />
          <span ref={passwordPhRef} className="form__ph__text">
            Password
          </span>
        </label>
        {error && <span className="error__message__span">{error}</span>}
        <button className="account__form__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
