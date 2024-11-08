'use client'
import { useEffect, useRef, useState } from "react";
import XmasDashboard from "./XmasDashBoard";
import PageLayoutClient from "@/components/dashboard/PageLayoutClient";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { EventImage, winterDomes, XmasBgImage } from "../utils/XmasImagePath";
import Image from "next/image";
import { shopping } from "@/app/utils/ImagePath";

 const ScrollLayout=({children}:{children:any})=>{

    
  


    const ref=useRef<HTMLDivElement>(null)
   
    const [resize,setResize]=useState(0)
    // useEffect(() => {
    //   if (ref.current) {
    //     // When opening the bottom sheet
    //     // disableBodyScroll(ref.current);
    
    //     return () => {
    //       // When closing the bottom sheet
    //       enableBodyScroll(ref.current);
    //     };
    //   }
    // }, [resize]);
    useEffect(() => {
      const scrollTop = sessionStorage.getItem("xmasScroll");
      console.log(window.innerWidth);
      if (window.innerWidth <= 768) {
        console.log("mobile scroll", scrollTop);
        // mobile
        const scrollMobile = sessionStorage.getItem("scrollXmasMobile");
        window.scrollTo({
          top: parseInt(scrollMobile ? scrollMobile : "0"),
          behavior: "auto",
        });
      } else if (scrollTop && ref.current) {
        // web
        
        ref.current.scrollTop = parseInt(scrollTop);
      }
    }, []);
    useEffect(()=>{
        const handleResize=()=>{
             setResize(window.innerWidth)
        }
          window.addEventListener('resize',handleResize)
          return ()=>{
             window.removeEventListener('resize',handleResize)
          }
    },[])
    useEffect(() => {
        const scrollableDiv = ref.current;
        // const threshold = 50; 
        // console.log(ref.current?.getBoundingClientRect().top)
        // if(scrollableDiv&& Math.round(scrollableDiv?.getBoundingClientRect().top)<=threshold)
        // {
        //     console.log("yes")
         
        //     // scrollableDiv.style.overflowY = 'scroll';  
        //     scrollableDiv.style.borderTopRightRadius="0px"
        //     scrollableDiv.style.borderTopLeftRadius="0px"

        // }
        // else if(scrollableDiv)
        // {
        //     // scrollableDiv.style.overflowY = 'hidden';  
        //     scrollableDiv.style.borderTopRightRadius="24px"
        //     scrollableDiv.style.borderTopLeftRadius="24px"
        // }
        const handleScroll = () => {
       

             sessionStorage.setItem("scrollXmasMobile", window.scrollY.toString());
           
        //   if(scrollableDiv)
        //   {
        
        //   const topOffset = scrollableDiv.getBoundingClientRect().top;
    
        //   console.log(topOffset,threshold)
         
        //   if (parseInt(topOffset.toString())<= threshold) {
        //     scrollableDiv.style.overflowY = 'scroll';  
        //     scrollableDiv.style.borderTopRightRadius="0px"
        //     scrollableDiv.style.borderTopLeftRadius="0px"
        //   } else {
        //     scrollableDiv.style.overflowY = 'hidden';  
        //     scrollableDiv.style.borderTopRightRadius="24px"
        //     scrollableDiv.style.borderTopLeftRadius="24px"
        //   }
        // };
    
       
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleScroll);
    window.removeEventListener('touchstart', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('touchstart', handleScroll);
          window.removeEventListener('touchend', handleScroll);
        };
      }, []);
    
   useEffect(()=>{
        const scrollContainer=ref.current
        if(scrollContainer)
        {
        console.log(scrollContainer?.scrollTop)
        }
        const handleScroll=(e:Event)=>{
            //   console.log(e)
            console.log(scrollContainer?.scrollTop)
            sessionStorage.setItem('xmasScroll',scrollContainer?.scrollTop?scrollContainer?.scrollTop.toString():"0")
        }
        if(scrollContainer)
        {
             scrollContainer.addEventListener("touchstart",handleScroll,{passive:true})
             scrollContainer.addEventListener("touchend",handleScroll,{passive:true})
             scrollContainer.addEventListener("scroll",handleScroll,{passive:true})
        }
        return ()=>{
              scrollContainer?.removeEventListener("touchstart",handleScroll)
              scrollContainer?.removeEventListener("touchend",handleScroll)
              scrollContainer?.removeEventListener("touchend",handleScroll)
        }

   },[])

    return   <div className="overflow-hidden min-[800px]:h-screen flex justify-between max-[800px]:flex-col-reverse" body-scroll-lock-ignore>
    
    <div style={{WebkitOverflowScrolling:"touch",scrollBehavior:"smooth"}} body-scroll-lock-ignore ref={ref} className='min-[800px]:w-[480px] max-[800px]:rounded-t-[24px] min-[800px]:mt-[0px] overflow-hidden  min-[800px]:overflow-scroll w-full will-change-transform bg-white mt-[480px] z-[2] no-scrollbar'>
         
        {children}
     
       </div>
       <PageLayoutClient></PageLayoutClient>
       </div>
}



export default ScrollLayout

