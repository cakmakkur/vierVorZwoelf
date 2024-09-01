"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface propTypes {
  setDropdownState: React.Dispatch<React.SetStateAction<string>>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoggedIn({
  setDropdownState,
  setIsDropdownOpen,
}: propTypes) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>You are not logged in</div>;
  }

  function getInitialLetter() {
    const name = session?.user.username;
    if (!name) return;
    return <span>{name[0].toUpperCase()}</span>;
  }

  return (
    <div className="account__loginDiv">
      <div className="profileTn">{getInitialLetter()}</div>
      <h5>{session.user.email}</h5>
      <h3>Hello {session.user.username}</h3>
      {session && session.user.role === "User" && (
        <label htmlFor="subscribe">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={true}
            // onChange={(e) => setIsSubscribed(e.target.checked)}
          />
          Subscribe to newsletter
        </label>
      )}

      {session && session.user.role === "Admin" && (
        <Link
          onClick={() => setIsDropdownOpen(false)}
          className="go-to-dashboard"
          href="/dashboard"
        >
          <Image
            src="/dashboard_icon.png"
            width={20}
            height={20}
            alt="link to dashboard"
            style={{ display: "inline-block" }}
          />{" "}
          Go to Dashboard
        </Link>
      )}
      <div
        onClick={() => {
          setIsDropdownOpen(false);
          setDropdownState("login");
          signOut({ callbackUrl: "/" });
        }}
        className="signout__div"
      >
        <div className="go-to-dashboard">
          <Image
            style={{ display: "inline-block" }}
            width={20}
            height={20}
            alt="logout icon"
            src="/logout_icon.png"
          />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
