'use client'
import { useEffect, useRef, useState } from "react";
import XmasDashboard from "./XmasDashBoard";
import PageLayoutClient from "@/components/dashboard/PageLayoutClient";



 const ScrollLayout=()=>{

    
    const ref=useRef<HTMLDivElement>(null)
    const [resize,setResize]=useState(0)
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
        const threshold = 50; 
        console.log(ref.current?.getBoundingClientRect().top)
        if(scrollableDiv&& Math.round(scrollableDiv?.getBoundingClientRect().top)<=threshold)
        {
            console.log("yes")
         
            scrollableDiv.style.overflowY = 'scroll';  
            scrollableDiv.style.borderTopRightRadius="0px"
            scrollableDiv.style.borderTopLeftRadius="0px"

        }
        else if(scrollableDiv)
        {
            scrollableDiv.style.overflowY = 'hidden';  
            scrollableDiv.style.borderTopRightRadius="24px"
            scrollableDiv.style.borderTopLeftRadius="24px"
        }
        const handleScroll = () => {
       
          console.log(scrollableDiv)
          if(scrollableDiv)
          {
        
          const topOffset = scrollableDiv.getBoundingClientRect().top;
    
          console.log(topOffset,threshold)
         
          if (parseInt(topOffset.toString())<= threshold) {
            scrollableDiv.style.overflowY = 'scroll';  
            scrollableDiv.style.borderTopRightRadius="0px"
            scrollableDiv.style.borderTopLeftRadius="0px"
          } else {
            scrollableDiv.style.overflowY = 'hidden';  
            scrollableDiv.style.borderTopRightRadius="24px"
            scrollableDiv.style.borderTopLeftRadius="24px"
          }
        };
    
       
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleScroll);
    window.removeEventListener('touchstart', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('touchstart', handleScroll);
          window.removeEventListener('touchend', handleScroll);
        };
      }, [resize]);
    
   useEffect(()=>{
        const scrollContainer=ref.current
        if(scrollContainer)
        {
        console.log(scrollContainer?.scrollTop)
        }
        const handleScroll=(e:Event)=>{
            //   console.log(e)
            console.log(scrollContainer?.scrollTop)
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

    return   <div className="flex justify-between max-[800px]:flex-col-reverse" data-body-scroll-lock-ignore>
    
    <div ref={ref} className='min-[800px]:w-[480px] min-[800px]:mt-[0px] overflow-hidden  min-[800px]:overflow-scroll w-full will-change-transform bg-white mt-[485px] z-[1]    h-screen no-scrollbar border'>

             <XmasDashboard></XmasDashboard>
       </div>
       <PageLayoutClient></PageLayoutClient>
       </div>
}



export default ScrollLayout