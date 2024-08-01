"use client";

export default function Page() {
  const backgroundUrl = "/bck.png";
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          zIndex: "10",
          opacity: "0.5",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "50px",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          boxShadow: "0px 2px 15px 2px rgba(0, 0, 0, 0.5",
        }}
      ></div>
      <h1
        style={{
          zIndex: "50",
          fontSize: "2.2rem",
          margin: "25px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Dashboard
      </h1>
    </div>
  );
}
