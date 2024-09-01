"use client";

import Image from "next/image";
import { useState, lazy, Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Login from "@/components/menubar_components/Login";
import Signup from "@/components/menubar_components/Signup";
import SignedUp from "./SignedUp";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LoggedIn = lazy(() => import("@/components/menubar_components/LoggedIn"));

export default function AccountDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState("login");

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("session", session.user);
      const expiresAt = new Date(session.expires).getTime();
      const now = Date.now();
      if (now >= expiresAt) {
        setDropdownState("login");
      } else {
        setDropdownState("loggedIn");
      }
    }
  }, [session]);

  return (
    <>
      <Image
        id="menubar__account__icon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        width={25}
        height={25}
        alt="menubar account icon"
        src="/menubar_account_icon.png"
        className="menubar__account__icon"
      />
      {isDropdownOpen ? (
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="dropdown__modal"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="menubar__account__dropdown"
          >
            {dropdownState === "login" || dropdownState === "signup" ? (
              <div className="menubar__account__select__div">
                <div
                  className={`menubar__account__selector ${
                    dropdownState === "login"
                      ? ""
                      : "menubar__account__selector--signup"
                  }`}
                ></div>
                <button
                  className={`menubar__account__select__login ${
                    dropdownState === "login" ? "logOrSign" : ""
                  }`}
                  onClick={() => setDropdownState("login")}
                >
                  Log In
                </button>
                <button
                  className={`menubar__account__select__signup ${
                    dropdownState === "signup" ? "logOrSign" : ""
                  }`}
                  onClick={() => setDropdownState("signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              ""
            )}

            {dropdownState === "login" ? (
              <Login setDropdownState={setDropdownState} />
            ) : dropdownState === "signup" ? (
              <Signup setDropdownState={setDropdownState} />
            ) : dropdownState === "loggedIn" ? (
              <Suspense
                fallback={
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
                }
              >
                <LoggedIn
                  setIsDropdownOpen={setIsDropdownOpen}
                  setDropdownState={setDropdownState}
                />
              </Suspense>
            ) : dropdownState === "signedUp" ? (
              <SignedUp />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
