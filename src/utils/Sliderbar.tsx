import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

interface PropTypes {
  isPersonal: boolean;
  setIsPersonal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sliderbar({ isPersonal, setIsPersonal }: PropTypes) {
  const sliderThumbRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsPersonal((prev) => !prev);
  };

  useEffect(() => {
    if (!sliderThumbRef.current) return;
    if (isPersonal) {
      sliderThumbRef.current.style.transform = `translateX(0)`;
    } else {
      sliderThumbRef.current.style.transform = `translateX(20px)`;
    }
  }, [isPersonal]);

  return (
    <div className="sliderbar__container">
      <div ref={sliderThumbRef} className="slider__ball"></div>
      <div className="circle__l"></div>
      <div onClick={handleClick} className="slider__mid"></div>
      <div className="circle__r"></div>
    </div>
  );
}
