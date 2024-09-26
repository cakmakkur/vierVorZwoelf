import Sliderbar from "@/utils/Sliderbar";
import React from "react";
import { useState, useEffect, useRef } from "react";
import MailsDisplay from "../dashboard_subcomponents/MailsDisplay";
import BandMailsDisplay from "../dashboard_subcomponents/BandMailsDisplay";

const Mails = () => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("New Mail");

  const [isPersonal, setIsPersonal] = useState<boolean>(true);

  // set the display back to "new mail" after switching between personal and band
  useEffect(() => {
    setSelectedOption("New Mail");
  }, [isPersonal]);

  const handleClick = (component: string) => {
    setSelectedOption(component);
  };

  useEffect(() => {
    if (!selectorRef.current) return;

    let baseHeight = 44;

    switch (selectedOption) {
      case "New Mail":
        selectorRef.current.style.transform = `translateY(0px)`;
        break;
      case "Inbox":
        selectorRef.current.style.transform = `translateY(${baseHeight}px)`;
        break;
      case "Sent":
        selectorRef.current.style.transform = `translateY(${baseHeight * 2}px)`;
        break;
      default:
        selectorRef.current.style.transform = `translateY(0px)`;
    }
  }, [selectedOption]);

  const sidebarPersonal = ["New Mail", "Inbox", "Sent"];

  return (
    <div className="mails__main display__component">
      <div className="mails__nav">
        <span className={isPersonal ? "nav__item--hl" : ""}>Personal</span>
        <Sliderbar isPersonal={isPersonal} setIsPersonal={setIsPersonal} />
        <span className={!isPersonal ? "nav__item--hl" : ""}>Band</span>
      </div>
      {isPersonal ? (
        <div className="mails__display">
          <div className="mails__sidebar">
            <span ref={selectorRef} className="mails__selector"></span>
            <ul>
              {sidebarPersonal.map((selection, i) => {
                return (
                  <li onClick={() => handleClick(selection)} key={i}>
                    {selection}
                  </li>
                );
              })}
            </ul>
          </div>
          <MailsDisplay selectedOption={selectedOption} />
        </div>
      ) : (
        <BandMailsDisplay />
      )}
    </div>
  );
};

export default Mails;
