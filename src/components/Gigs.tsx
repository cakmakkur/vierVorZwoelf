"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRef } from "react";

export default function Gigs() {
  const nextGigRef = useRef<HTMLDivElement>(null);
  const nextGigTitleRef = useRef<HTMLDivElement>(null);
  const upcomingGigTitleRef = useRef<HTMLDivElement>(null);
  const upcomingGig1Ref = useRef<HTMLDivElement>(null);
  const upcomingGig2Ref = useRef<HTMLDivElement>(null);
  const upcomingGig3Ref = useRef<HTMLDivElement>(null);
  const nextGigInfoRef = useRef<HTMLDivElement>(null);
  const upcomingGig1InfoRef = useRef<HTMLDivElement>(null);
  const upcomingGig2InfoRef = useRef<HTMLDivElement>(null);
  const upcomingGig3InfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !nextGigRef.current ||
      !nextGigTitleRef.current ||
      !upcomingGigTitleRef.current ||
      !upcomingGig1Ref.current ||
      !upcomingGig2Ref.current ||
      !upcomingGig3Ref.current ||
      !nextGigInfoRef.current ||
      !upcomingGig1InfoRef.current ||
      !upcomingGig2InfoRef.current ||
      !upcomingGig3InfoRef.current
    )
      return;
    nextGigTitleRef.current.style.animation =
      "come-in-view 200ms ease-in-out forwards, background-swing 3s ease-in-out infinite";
    nextGigRef.current.style.animation =
      "come-in-view 200ms ease-in-out forwards 200ms";
    upcomingGigTitleRef.current.style.animation =
      "come-in-view 200ms ease-in-out forwards 400ms, background-swing 3s ease-in-out infinite";
    upcomingGig1Ref.current.style.animation =
      "come-in-view 200ms ease-in-out forwards 600ms";
    upcomingGig2Ref.current.style.animation =
      "come-in-view 200ms ease-in-out forwards 800ms";
    upcomingGig3Ref.current.style.animation =
      "come-in-view 200ms ease-in-out forwards 1000ms";
    nextGigInfoRef.current.style.animation =
      "bring-text-in-view 300ms ease-in-out forwards 1300ms";
    upcomingGig1InfoRef.current.style.animation =
      "bring-text-in-view 300ms ease-in-out forwards 1300ms";
    upcomingGig2InfoRef.current.style.animation =
      "bring-text-in-view 300ms ease-in-out forwards 1300ms";
    upcomingGig3InfoRef.current.style.animation =
      "bring-text-in-view 300ms ease-in-out forwards 1300ms";
  }, []);

  return (
    <div className="gigs__main-div">
      <div>
        <div ref={nextGigTitleRef} className="next-gig-title gig_title ">
          Next gig
        </div>
        <div ref={nextGigRef} className="next-gig">
          <Image
            className="next-gig__img"
            src="/gigs/gig1.webp"
            alt="gig-1"
            width={200}
            height={200}
          />
          <div className="next-gig__info">
            <div ref={nextGigInfoRef} className="next-gig__overlay"></div>
            <b>14.02.2025 &#9679; 20:00</b> <br />
            <b>Howdy Concert Hall</b> <br />
            <span className="gig-address">Howl Str, 45 / 10200</span>
            <Image
              className="gig-maps-icon"
              src="/maps_icon.png"
              alt="gig-1"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
      <div className="gigs__main-div__right">
        <div ref={upcomingGigTitleRef} className="upcoming-gig-title gig_title">
          Upcoming...
        </div>
        <div ref={upcomingGig1Ref} className="upcoming-gig">
          <Image
            className="next-gig__img"
            src="/gigs/gig2.webp"
            alt="gig-2"
            width={50}
            height={50}
          />
          <div className="upcoming-gig__info">
            <div
              ref={upcomingGig1InfoRef}
              className="upcoming-gig__overlay"
            ></div>
            <b>25.05.2025 &#9679; 16:00</b> <br /> <span>Boullevard Stage</span>
            <Image
              className="gig-maps-icon--upcoming"
              src="/maps_icon.png"
              alt="gig-1"
              width={10}
              height={10}
            />
          </div>
        </div>
        <div ref={upcomingGig2Ref} className="upcoming-gig">
          <Image
            className="next-gig__img"
            src="/gigs/gig3.webp"
            alt="gig-2"
            width={50}
            height={50}
          />
          <div className="upcoming-gig__info">
            <div
              ref={upcomingGig2InfoRef}
              className="upcoming-gig__overlay"
            ></div>
            <b>10.06.2025 &#9679; 19:30</b> <br /> <span>Postmodern Hall</span>
            <Image
              className="gig-maps-icon--upcoming"
              src="/maps_icon.png"
              alt="gig-1"
              width={10}
              height={10}
            />
          </div>
        </div>
        <div ref={upcomingGig3Ref} className="upcoming-gig">
          <Image
            className="next-gig__img"
            src="/gigs/gig4.webp"
            alt="gig-2"
            width={50}
            height={50}
          />
          <div className="upcoming-gig__info">
            <div
              ref={upcomingGig3InfoRef}
              className="upcoming-gig__overlay"
            ></div>
            <b>13.08.2025 &#9679; 21:00</b> <br /> <span>Albert Stage</span>
            <Image
              className="gig-maps-icon--upcoming"
              src="/maps_icon.png"
              alt="gig-1"
              width={10}
              height={10}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
