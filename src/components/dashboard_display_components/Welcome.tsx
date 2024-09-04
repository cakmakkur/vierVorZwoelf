import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Welcome() {
  const welcomeAnmDiv = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const letters = ["w", "e", "l", "c", "o", "m", "e", " ", "b", "a", "c", "k"];

  useEffect(() => {
    if (!welcomeAnmDiv.current) return;

    timeoutRef.current = setTimeout(() => {
      if (welcomeAnmDiv.current) {
        welcomeAnmDiv.current.style.animationName = "rotateWelcomeAnmDiv";
      }
    }, 3000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      }
    };
  }, []);

  return (
    <div className="display__component--welcome">
      <div className="welcome-anm-div__whitespace"></div>
      <div ref={welcomeAnmDiv} className="welcome-anm-div">
        <div className="welcome-anm-div__back">
          <Image
            className="bandLogo__img"
            width={250}
            height={250}
            alt="band logo"
            src="/logo.webp"
          />
        </div>
        <div className="welcome-anm-div__front">
          {letters.map((letter, index) => (
            <div className="note-div" key={index}>
              <Image
                className={letter === " " ? "anm--hidden" : "anm-note"}
                src="/note_icon.png"
                width={30}
                height={40}
                alt="Note icon"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
              <div
                style={{ animationDelay: `${index * 0.1}s` }}
                className={letter === " " ? "anm--hidden" : "anm-shadow"}
              ></div>
              <span
                className={letter === " " ? "anm--hidden" : "anm-letter-span"}
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                {letter}
              </span>
              <div className="particle_div">
                {[...Array(8)].map((_, i) => (
                  <span
                    className={letter === " " ? "anm--hidden" : "particle"}
                    style={{
                      animationName: `m${i}`,
                      animationDelay: `${index * 0.1 + 0.4}s`,
                    }}
                    key={i}
                  ></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
