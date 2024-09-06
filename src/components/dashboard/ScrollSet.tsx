"use client";
import { PagelayoutMainContainer } from "@/app/style";
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
    console.log(scrollHeight);
    sessionStorage.setItem("scrollMobile", window.scrollY.toString());
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
        behavior: "instant",
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
      scrollContainer.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
    }

    if (scrollHeight != 0) {
      console.log(scrollHeight);
      sessionStorage.setItem("scroll", scrollHeight.toString());
    }
    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        handleScroll,
        handleTouchMove
      );
    };
  }, [scrollHeight]);

  return (
    <PagelayoutMainContainer ref={scrollContainerRef}>
      {props.children}
    </PagelayoutMainContainer>
  );
};

export default ScrollSet;
