'use client'
import { PagelayoutMainContainer } from '@/app/style';
import React, { useEffect, useRef, useState } from 'react'
interface Props{
    children:any
}
const ScrollSet:React.FC<Props>= (props) => {
  
   const [scrollHeight, setScrollHeight] = useState<number>(0);
   const scrollContainerRef = useRef<any>();
   const handleScroll = () => {     
       setScrollHeight(scrollContainerRef.current?.scrollTop);
   };
   useEffect(()=>{
    const scrollTop=sessionStorage.getItem('scroll')
    
     if(scrollTop && scrollContainerRef.current)
        {
              scrollContainerRef.current.scrollTop=parseInt(scrollTop) 
        }
       
   },[])


   useEffect(() => {
     const scrollContainer = scrollContainerRef.current;
     if (scrollContainer) {
       scrollContainer.addEventListener("scroll", handleScroll);
     }
 
    if(scrollHeight!=0)
        { 
    sessionStorage.setItem("scroll", scrollHeight.toString());
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
}

export default ScrollSet