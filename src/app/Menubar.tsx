"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AccountDropdown from "@/components/menubar_components/AccountDropdown";

export const Menubar = () => {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const controllerRef = useRef<number | null>(null);
  const [controller, setController] = useState<boolean>(true);
  const [navItems, setNavItems] = useState<String[]>([
    "We",
    "Gallery",
    "Gigs",
    "Contact",
  ]);

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
    switchFont(["We", "Gallery", "Gigs", "Contact"]);
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setNavItems(["We", "Gallery", "Gigs", "Contact"]);
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
    <div className="menubar__main">
      <div className="bandLogo">
        <Image
          className="bandLogo__img"
          width={55}
          height={55}
          alt="band logo"
          src="/logo.webp"
        />
      </div>
      <div className="menubar__nav__wrapper">
        <ul>
          {navItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          <AccountDropdown />
        </ul>
      </div>
    </div>
  );
};
