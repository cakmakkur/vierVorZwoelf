"use client";

import { useEffect, useState, useRef, useContext } from "react";
import AccountDropdown from "@/components/menubar_components/AccountDropdown";
import Link from "next/link";
import { useHomepageContext } from "@/utils/HomepageContext";

export const Menubar = () => {
  const { toggleShowGigs } = useHomepageContext();

  const handleClick = () => {
    toggleShowGigs();
  };

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const controllerRef = useRef<number | null>(null);
  const [controller, setController] = useState<boolean>(true);
  const [navItems, setNavItems] = useState<String[]>([
    "We",
    "Gallery",
    "VierVorZwoelf",
    "Gigs",
    "Contact",
  ]);
  const navLinks = ["we", "gallery", "/", "/", "contact"];

  const randomChar = (): String => {
    const chars2 = ["a", "b", "c", "d", "e", "f", "p", "h", "z", "m", "k"];
    const randomChar =
      chars2[parseFloat((Math.random() * (chars2.length - 1)).toFixed(0))];
    return randomChar;
  };
  const switchFont = (navItems: string[]): void => {
    intervalRef.current = window.setInterval(() => {
      let newNavItemsArray = navItems.map((item) => {
        let newStrArray: String[] = [];
        const originalItemLetters = Array.from(item);
        const randomIndex = parseFloat(
          (Math.random() * (originalItemLetters.length - 1)).toFixed(0)
        );
        originalItemLetters.forEach((l, i) => {
          if (i === randomIndex) {
            newStrArray.push(randomChar());
          } else {
            newStrArray.push(l);
          }
        });
        const newStr = newStrArray.join("");
        const newCapStr = newStr.charAt(0).toUpperCase() + newStr.slice(1);
        return newCapStr;
      });

      setNavItems(newNavItemsArray);
    }, 80);
  };

  useEffect(() => {
    switchFont(["We", "Gallery", "VierVorZwoelf", "Gigs", "Contact"]);
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setNavItems(["We", "Gallery", "VierVorZwoelf", "Gigs", "Contact"]);
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [controller]);

  useEffect(() => {
    controllerRef.current = window.setInterval(() => {
      setController((prev) => !prev);
    }, 13000);
    return () => {
      if (controllerRef.current !== null) clearInterval(controllerRef.current);
    };
  }, []);

  return (
    <div id="menubar" className="menubar__main">
      <div className="menubar__nav__wrapper">
        <ul>
          {navItems.map((item, i) => (
            <Link className={`menu-nav-li__${i}`} href={navLinks[i]} key={i}>
              <li onClick={handleClick}>{item}</li>
            </Link>
          ))}
        </ul>
        <AccountDropdown />
      </div>
    </div>
  );
};
