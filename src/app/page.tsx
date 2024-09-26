"use client";
import Image from "next/image";
import Gigs from "@/components/Gigs";
import { useHomepageContext } from "@/utils/HomepageContext";

export default function Home() {
  const { showGigs } = useHomepageContext();

  return (
    <main>
      <div className="image-background">
        <div className="image-background-overlay"></div>
      </div>
      {showGigs && <Gigs />}
      <div className="social-links__container fb">
        <div className="social-card" id="social__front">
          <Image src="/fb_icon.jpeg" alt="Facebook" width={50} height={50} />
        </div>
        <div className="social-card" id="social__left__fb"></div>
        <div className="social-card" id="social__right"></div>
        <div className="social-card" id="social__top__fb"></div>
        <div className="social-card" id="social__bottom"></div>
      </div>
      <div className="social-links__container insta">
        <div className="social-card" id="social__front">
          <Image src="/insta_icon.jpeg" alt="Facebook" width={50} height={50} />
        </div>
        <div className="social-card" id="social__left__insta"></div>
        <div className="social-card" id="social__right"></div>
        <div className="social-card" id="social__top__insta"></div>
        <div className="social-card" id="social__bottom"></div>
      </div>
    </main>
  );
}
