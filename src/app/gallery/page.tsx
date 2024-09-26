"use client";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  // loading manager
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const handleLoadedImage = () => {
    setLoadedImages((prev) => prev + 1);
  };
  const handleLoadedVid = () => {
    setVideoLoaded(true);
  };

  // Starting fade-in animation
  const pageRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (loadedImages === 12 && videoLoaded) {
      timeoutRef.current = setTimeout(() => {
        if (!pageRef.current) return;
        pageRef.current.style.opacity = "1";
      }, 200);
    }
  }, [loadedImages, videoLoaded]);

  useEffect(() => {
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
        <video
          onLoadedData={handleLoadedVid}
          className="gallery__video"
          controls
        >
          <source src="/gallery/bassman.mp4" type="video/mp4" />
          Your browser does not support the video.
        </video>
        <article className="gallery__gridbox">
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/1.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/2.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/3.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/4.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/5.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/6.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/7.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/8.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/6.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/8.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
            className="gallery__gridbox__image"
            src="/gallery/5.jpeg"
            alt="gallery picture"
          />
          <img
            onLoad={handleLoadedImage}
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
