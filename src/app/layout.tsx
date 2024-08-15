import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./main.css";
import { Menubar } from "./Menubar";
import { Footer } from "./Footer";
import SessionWrapper from "@/utils/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vier vor Zwölf",
  description: "Landing page for the band Vier vor Zwölf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Menubar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
