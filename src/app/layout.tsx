import type { Metadata } from "next";
import "./main.css";
import { Menubar } from "../components/Menubar";
import SessionWrapper from "@/utils/SessionWrapper";

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
      <body>
        <div className="image-background">
          <div className="image-background-overlay">
            <SessionWrapper>
              <Menubar />
              {children}
            </SessionWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
