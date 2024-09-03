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
    </main>
  );
}
