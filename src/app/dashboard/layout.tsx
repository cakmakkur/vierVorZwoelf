"use client";
import { useState, useRef } from "react";

import { DashboardSidebar } from "../../components/dashboard_components/DashboardSidebar";
import Display from "../../components/dashboard_components/Display";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface PropTypes {
  children: React.ReactNode;
  feed: React.ReactNode;
}

export default function RootLayout({ children, feed }: PropTypes) {
  const { data: session } = useSession();
  const timeoutRef = useRef<number | null | NodeJS.Timeout>(null);
  const [selectedComponent, setSelectedComponent] = useState<string>("default");

  //Change style of the menubar in the dashboard
  useEffect(() => {
    const menubar = document.getElementById("menubar");
    const accountIcon = document.getElementById("menubar__account__icon");
    menubar?.classList.add("menubar--dashboard");
    accountIcon?.classList.add("menubar__account__dropdown--dashboard");
    return () => {
      menubar?.classList.remove("menubar--dashboard");
      accountIcon?.classList.remove("menubar__account__dropdown--dashboard");
    };
  }, [session]);

  // Not authorized to access the dashboard
  useEffect(() => {
    if (!session || session.user.role !== "Admin") {
      timeoutRef.current = setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [session]);
  if (!session || session.user.role !== "Admin") {
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          color: "red",
        }}
      >
        <h3>You are not authorised to access the dashboard!</h3>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        {children}
        <div className="dashboard__main">
          <DashboardSidebar
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
          <Display selectedComponent={selectedComponent} />
          {feed}
        </div>
      </div>
    </>
  );
}
