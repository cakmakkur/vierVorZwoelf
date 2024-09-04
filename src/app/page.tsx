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
      {/* <div className="home__social-links">
        <div className="social__icon__wrapper">
          <Image
            className="social__icon__img"
            src="/fb_icon.jpeg"
            alt="fb-icon"
            width={300}
            height={300}
          />
        </div>

        <Image
          src="/insta_icon.jpeg"
          alt="insta-icon"
          width={300}
          height={300}
        />
      </div> */}
    </main>
  );
}
