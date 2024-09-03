"use client";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  // Starting fade-in animation
  const pageRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!pageRef.current) return;
      pageRef.current.style.opacity = "1";
    }, 200);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="gallery__background"></div>
      <div ref={pageRef} className="gallery__main">
        <h1>GALLERY</h1>
        <video className="gallery__video" controls>
          <source src="/gallery/bassman.mp4" type="video/mp4" />
          Your browser does not support the video.
        </video>
        <article className="gallery__gridbox">
          <img
            className="gallery__gridbox__image"
            src="/gallery/1.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/2.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/3.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/4.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/5.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/6.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/7.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/8.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/6.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/8.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/5.jpeg"
            alt="gallery picture"
          />
          <img
            className="gallery__gridbox__image"
            src="/gallery/4.jpeg"
            alt="gallery picture"
          />
          {/* filler elements for the page bottom */}
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </article>
      </div>
    </>
  );
}
