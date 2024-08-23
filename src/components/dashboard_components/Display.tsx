import React, { Suspense, lazy } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const AccountSettings = lazy(
  () => import("../dashboard_display_components/AccountSettings")
);
const Homepage = lazy(() => import("../dashboard_display_components/Homepage"));
const Mails = lazy(() => import("../dashboard_display_components/Mails"));
const Newsletter = lazy(
  () => import("../dashboard_display_components/Newsletter")
);
const Playlist = lazy(() => import("../dashboard_display_components/Playlist"));
const SheetMusic = lazy(
  () => import("../dashboard_display_components/SheetMusic")
);

export default function Display({
  selectedComponent,
}: {
  selectedComponent: string;
}) {
  const renderComponent = () => {
    switch (selectedComponent) {
      case "accountSettings":
        return <AccountSettings />;
      case "homepage":
        return <Homepage />;
      case "mails":
        return <Mails />;
      case "newsletter":
        return <Newsletter />;
      case "playlists":
        return <Playlist />;
      case "sheetMusic":
        return <SheetMusic />;
      default:
        return <h1>Default Display</h1>;
    }
  };

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader
            color="blue"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }
    >
      {renderComponent()}
    </Suspense>
  );
}
