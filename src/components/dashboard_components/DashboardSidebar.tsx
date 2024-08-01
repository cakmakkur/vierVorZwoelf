import React from "react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface PropTypes {
  selectedComponent: String;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
}

export const DashboardSidebar = ({
  selectedComponent,
  setSelectedComponent,
}: PropTypes) => {
  const [isToggledOn, setIsToggledOn] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const displayRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleClick = (component: string) => {
    setSelectedComponent(component);
    // for mobile:
    setIsToggledOn(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!displayRef.current) return;
    if (windowWidth > 860) {
      displayRef.current.style.transform = "translateX(0px)";
      return;
    }
    if (isToggledOn) {
      displayRef.current.style.transform = "translateX(0px)";
    } else {
      displayRef.current.style.transform = "translateX(-100vw)";
    }
  }, [isToggledOn, displayRef, windowWidth]);

  useEffect(() => {
    if (!selectorRef.current) return;
    let baseHeight = 48;
    // values from css
    if (windowWidth > 860) {
      baseHeight = 48;
    } else {
      baseHeight = 62.4;
    }

    switch (selectedComponent) {
      case "playlists":
        selectorRef.current.style.transform = "translateY(0px)";
        break;
      case "sheetMusic":
        selectorRef.current.style.transform = `translateY(${baseHeight}px)`;
        break;
      case "mails":
        selectorRef.current.style.transform = `translateY(${baseHeight * 2}px)`;
        break;
      case "homepage":
        selectorRef.current.style.transform = `translateY(${baseHeight * 3}px)`;
        break;
      case "newsletter":
        selectorRef.current.style.transform = `translateY(${baseHeight * 4}px)`;
        break;
      case "accountSettings":
        selectorRef.current.style.transform = `translateY(${baseHeight * 5}px)`;
        break;
      default:
        selectorRef.current.style.transform = `translateY(-${baseHeight}px)`;
    }
  }, [selectedComponent]);

  return (
    <>
      <button
        onClick={() => setIsToggledOn((prev) => !prev)}
        className="nav__toggle__btn"
      >
        R
      </button>
      <nav ref={displayRef} className="dashboardSidebar__main">
        <span ref={selectorRef} className="nav__selector"></span>
        <ul>
          <li onClick={() => handleClick("playlists")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/playlists_icon.png"
            />
            <span>Playlists</span>
          </li>
          <li onClick={() => handleClick("sheetMusic")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/note_icon.png"
            />
            Sheet Music
          </li>
          <li onClick={() => handleClick("mails")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/mails_icon.png"
            />
            Mails
          </li>
          <li onClick={() => handleClick("homepage")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/homepage_icon.png"
            />
            Homepage
          </li>
          <li onClick={() => handleClick("newsletter")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/newsletter_icon.png"
            />
            Newsletter
          </li>
          <li onClick={() => handleClick("accountSettings")}>
            <Image
              className="dashboardSidebar__icon"
              style={{ display: "inline-block" }}
              height={20}
              width={20}
              alt="note icon"
              src="/account_icon.png"
            />
            Account Settings
          </li>
        </ul>
      </nav>
    </>
  );
};
