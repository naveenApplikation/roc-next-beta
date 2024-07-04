'use client';


import { ScrollIcon } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ScrollProps{
    children: any
}

const ScrollTopLayout: React.FC<ScrollProps> = ({children}) => {
    const scrollContainerRef = useRef<any>();

    const setScrollTop = () => {
      scrollContainerRef.current.scrollIntoView({ top: 0, behavior: 'smooth' })

    }

    const [scrollHeight, setScrollHeight] = useState<number>(0);

    const handleScroll = () => {
      setScrollHeight(scrollContainerRef.current?.scrollTop);
    };
    useEffect(() => {
      const scrollTop = sessionStorage.getItem('childScroll')
  
      if (scrollTop && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = parseInt(scrollTop)
      }
  
    }, [])
  
  
    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll);
      }
  
      if (scrollHeight != 0) {
        sessionStorage.setItem("childScroll", scrollHeight.toString());
      }
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }, [scrollHeight]);
  return (
    <div ref = {scrollContainerRef}>
        {children}
        <Image
        className='scroll_image'
            onClick={setScrollTop}
            src={ScrollIcon} alt="scroll"
          />
    </div>
  )
}

export default ScrollTopLayout