"use client";
import { useState } from "react";

import { DashboardSidebar } from "../../components/dashboard_components/DashboardSidebar";
import Display from "../../components/dashboard_components/Display";

interface PropTypes {
  children: React.ReactNode;
  feed: React.ReactNode;
}

export default function RootLayout({ children, feed }: PropTypes) {
  // initiation "default"
  const [selectedComponent, setSelectedComponent] = useState<string>("default");

  return (
    <>
      {children}
      <div className="dashboard__main">
        <DashboardSidebar
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
        <Display selectedComponent={selectedComponent} />
        {feed}
      </div>
    </>
  );
}
