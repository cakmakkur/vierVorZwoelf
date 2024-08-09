"use client";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

interface DataType {
  time: String;
  id: String;
  name: String;
}

export default function Feed() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedData, setFeedData] = useState<null | DataType[]>();
  const [isToggledOn, setIsToggledOn] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const displayRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      await getFeed();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    };
    if (windowWidth > 860) {
      // this if statement needs to be changed.
      // bug: it scrolls to the hidden feed screen in mobile width
      scrollToBottom();
    }
  }, [feedData]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!displayRef.current) return;
    if (windowWidth > 860) {
      displayRef.current.style.transform = "translateX(0px)";
      return;
    }
    if (isToggledOn) {
      displayRef.current.style.transform = "translateX(0px)";
    } else {
      displayRef.current.style.transform = "translateX(100vw)";
    }
  }, [isToggledOn, displayRef, windowWidth]);

  // async function getFeed2() {
  //   try {
  //     const response = await fetch("https://api.restful-api.dev/objectssss");
  //     const data = await response.json();
  //     console.log(data);
  //     // throw new Error("Wrong");
  //   } catch (err) {
  //     console.log("ERRRRRRR");
  //   }
  // }

  const getFeed = () => {
    //fetching latency sim
    return new Promise((resolve) => {
      setTimeout(() => {
        setFeedData([
          {
            time: "Yesterday",
            id: "1",
            name: "Google Pixel 6 Pro",
          },
          {
            time: "1 day ago",
            id: "2",
            name: "Apple iPhone 12 Mini, 256GB, Blue",
          },
          {
            time: "Yesterday",
            id: "3",
            name: "Apple iPhone 12 Pro Max",
          },
          {
            time: "30min ago",
            id: "4",
            name: "Apple iPhone 11, 64GB",
          },
          {
            time: "2 day ago",
            id: "5",
            name: "Samsung Galaxy Z Fold2",
          },
          {
            time: "1 day ago",
            id: "6",
            name: "Apple AirPods",
          },
          {
            time: "30min ago",
            id: "7",
            name: "Apple MacBook Pro 16",
          },
          {
            time: "Yesterday",
            id: "8",
            name: "Apple Watch Series 8",
          },
          {
            time: "30min ago",

            id: "9",
            name: "Beats Studio3 Wireless",
          },
          {
            time: "20 min ago",

            id: "10",
            name: "Apple iPad Mini 5th Gen",
          },
          {
            time: "3 hours ago",

            id: "11",
            name: "Apple iPad Mini 5th Gen",
          },
          {
            time: "30min ago",

            id: "12",
            name: "Apple iPad Air",
          },
          {
            time: "30min ago",

            id: "13",
            name: "Apple iPad Air",
          },
        ]);
        resolve("Resolved");
      }, 2000);
    });
  };

  if (isLoading) {
    return (
      <div ref={displayRef} className="feed__loading">
        <ClipLoader
          color="blue"
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setIsToggledOn((prev) => !prev)}
          className="feed__toggle__btn"
        >
          T
        </button>
        <div ref={displayRef} className="feed__main">
          <h1>Feed</h1>

          <div className="feed__display">
            {feedData?.map((f, i) => (
              <div className="feed__message" key={i}>
                <div className="feed__message__tn">K</div>
                <div className="feed__message__body">
                  <h5>{f.name}</h5>
                  <h6>{f.time}</h6>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="feed__input">
            <input placeholder="Send a message" className="feed__textarea" />
            <button>Send</button>
          </div>
        </div>
      </>
    );
  }
}
