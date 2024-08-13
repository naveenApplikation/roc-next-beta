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
  const handleTouchMove = () => {
    console.log(scrollHeight);
    localStorage.setItem("scroll", window.scrollY.toString());
  };
  useEffect(() => {
    const scrollTop = localStorage.getItem("scroll");
    console.log("scroll", scrollContainerRef.current.scrollTop);
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      console.log("mobile scroll", scrollTop);
      window.scrollTo({
        top: parseInt(scrollTop ? scrollTop : ""),
        behavior: "smooth",
      });
    } else if (scrollTop && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(scrollTop);
      console.log("scroll in ref", scrollContainerRef.current.scrollTop);
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
    console.log(scrollHeight);
    if (scrollHeight != 0) {
      console.log(scrollHeight);
      localStorage.setItem("scroll", scrollHeight.toString());
    }
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [scrollHeight]);

  return (
    <PagelayoutMainContainer ref={scrollContainerRef}>
      {props.children}
    </PagelayoutMainContainer>
  );
};

export default ScrollSet;
