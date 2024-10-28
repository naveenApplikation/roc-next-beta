"use client";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  children: any;
}
const ScrollSet: React.FC<Props> = (props) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const scrollContainerRef = useRef<any>();

  const handleScroll = () => {
    setScrollHeight(scrollContainerRef.current?.scrollTop);
    console.log(scrollContainerRef.current?.scrollTop);
    console.log(window.scrollY);
  };
  //for mobile
  const handleTouchMove = () => {
    console.log(window.scrollY,window.innerHeight);
    // sessionStorage.setItem("scrollMobile", window.scrollY.toString());
  };
  useEffect(() => {
    const scrollTop = sessionStorage.getItem("scroll");
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      console.log("mobile scroll", scrollTop);
      // mobile
      const scrollMobile = sessionStorage.getItem("scrollMobile");
      window.scrollTo({
        top: parseInt(scrollMobile ? scrollMobile : "0"),
        behavior: "auto",
      });
    } else if (scrollTop && scrollContainerRef.current) {
      // web
      
      scrollContainerRef.current.scrollTop = parseInt(scrollTop);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      window.addEventListener("touchstart", handleTouchMove, {
        passive: true,
      });
    }

    if (scrollHeight != 0) {
      console.log(scrollHeight);
      sessionStorage.setItem("scroll", scrollHeight.toString());
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, [scrollHeight]);

  return (
    <div ref={scrollContainerRef} className="h-screen overflow-auto shadow-[0_-8px_40px_0_rgba(0,0,0,0.25)] z-[1] no-scrollbar max-[800px]:h-auto max-[800px]:overflow-hidden max-[800px]:z-10" data-body-scroll-lock-ignore>
      {props.children}
      </div>
 
  );
};

export default ScrollSet;
