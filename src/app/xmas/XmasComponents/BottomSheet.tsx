'use client';

import React, { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { usePathname } from "next/navigation";

const BottomSheetContainer = styled(animated.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding:0px;
  overscroll-behavior: none;
  overflow: hidden;
  touch-action: none;
  will-change: transform;
    @media screen and (min-width: 800px) {
    display:none;
}

`;

const SheetHeader = styled.div`
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const SheetContent = styled.div<{ isScrollable: boolean }>`
  overflow-y: ${(props) => (props.isScrollable ? "auto" : "hidden")};
  scroll-behavior: smooth;
  touch-action:auto;
  flex: 1;
  padding:0px;
  &::-webkit-scrollbar {
    display: none;
  }
  
`;

const BottomSheet = ({ children }: { children: React.ReactNode }) => {

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  let halfHeight=screenHeight*0.6;
  if(screenHeight<700)
    {
      halfHeight =screenHeight*0.79;
    } else if(screenHeight<750)
      {
        halfHeight =screenHeight*0.75;
      }
   
    
 

 
  const fullHeight = 70;
  const mainRef= useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [{ y }, api] = useSpring(() => ({ y: halfHeight,config: { tension: 170, friction: 26 },onRest: {
    y: (e) =>{
       
        if(e.value<100)
        {
            setIsScrollable(true)
        }
        else
        {
            setIsScrollable(false)
        }
    },
}}));
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [browser, setBrowser] = useState('');
  const pathname=usePathname();
  useEffect(()=>{
    const userAgent = navigator.userAgent;

 
    if (userAgent.indexOf('Chrome') > -1) {
      setBrowser('Chrome');
    } else if (userAgent.indexOf('Firefox') > -1) {
      setBrowser('Firefox');
    } else if (userAgent.indexOf('Safari') > -1) {
      setBrowser('Safari');
    } else if (userAgent.indexOf('Edge') > -1) {
      setBrowser('Edge');
    } else {
      setBrowser('Other');
    }
  },[pathname])
   useEffect(()=>{
 
         const scrollTop=sessionStorage.getItem("scrollTop") as number | any
         const snapPosition=sessionStorage.getItem("snapPosition") as number | any
         if(parseInt(snapPosition)<100)
         {
         if(contentRef)
         {
            api.start({y:parseInt(snapPosition),})
             contentRef.current?.scrollTo({
                 top:parseInt(scrollTop)
             })
             setIsScrollable(true)
             
         }
        }
        
   },[])
//   useEffect(() => {
//     if (contentRef.current) {
//       disableBodyScroll(contentRef.current);
//     }

//     return () => {
//       if (contentRef.current) {
//         enableBodyScroll(contentRef.current);
//       }
//     };
//   }, []);
let touchStartX = 0;
let touchEndX = 0;
const handleTouchStart = (e) => {
    console.log(e);
    touchStartX = e.changedTouches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientY;
    handleSwipe();
  };
  const handleSwipe=()=>{
 
    if (touchStartX - touchEndX < -50 && contentRef.current && contentRef.current?.scrollTop<0) {
          
         api.start({y:halfHeight,})
         sessionStorage.setItem("snapPosition",halfHeight.toString());
         setIsScrollable(false);

      }
      
  }
useEffect(()=>{

    const scrollableDiv = contentRef.current;
  
    console.log(contentRef.current?.getBoundingClientRect().top)
    const handleTouch=(e:TouchEvent)=>{
       console.log(e.changedTouches[0].clientX)
       
    }
    const handleScroll=()=>{
       
    if(scrollableDiv)
        {
            sessionStorage.setItem("scrollTop", scrollableDiv.scrollTop.toString());
           
      };
    }
    if(scrollableDiv)
    { scrollableDiv.addEventListener('scroll', handleScroll);
    scrollableDiv.addEventListener('touchstart', handleScroll);
    scrollableDiv.removeEventListener('touchstart', handleScroll);
    scrollableDiv.addEventListener('touchstart', handleTouch);
    }
    
        return () => {
if(scrollableDiv){
            scrollableDiv.removeEventListener('scroll', handleScroll);
            scrollableDiv.removeEventListener('touchstart', handleScroll);
            scrollableDiv.removeEventListener('touchend', handleScroll);
            scrollableDiv.removeEventListener('touchstart', handleTouch);
        };
    }
  
},[])

  const handleScroll = () => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      setIsAtTop(scrollTop === 0);
    }
  };

  const bind = useDrag(
    ({
      last,
      movement: [, my],
      direction: [, dy],
      cancel,
      event,
    }) => {

      requestAnimationFrame(() => {
      const scrollTop = contentRef.current?.scrollTop || 0;
      // Allow normal scrolling if content is not at the top
      if (dy > 0 && scrollTop > 0) {
        // cancel();
       
      }
      console.log(event)
      // Prevent default behavior for dragging down
      if (dy > 0 && isAtTop) {
        // event.preventDefault();
      }
  
      if (last) {
        if (dy > 0 && my > halfHeight / 2) {
          // Dragging down to half-height
        
          setIsScrollable(false);
         
          api.start({ y: halfHeight, });
        } else if (dy < 0 && my < halfHeight / 2) {
          // Dragging up to full height
          sessionStorage.setItem("snapPosition", fullHeight.toString());
          setIsScrollable(true);
         
          api.start({
            y: fullHeight,
            
             
          });
        }
        else if(dy > 0 && contentRef.current?.scrollTop==0)
            {
                setIsScrollable(false);
                sessionStorage.setItem("snapPosition",halfHeight.toString());
                  api.start({y:halfHeight})
            }
      } else {
        // Restrict movement within bounds
        // alert("yes")
        api.start({ y: Math.max(fullHeight, Math.min(my, halfHeight)), });
        // sessionStorage.setItem("snapPosition", y.get().toString());
      }
       })
    },
    {
      
      bounds: { top: fullHeight, bottom: halfHeight },
      rubberband: true,
      preventDefault:true,
      filterTaps:true
    
    }
  );

  return (
    <BottomSheetContainer  style={{ transform: y.to((val) => `translate3d(0, ${val}px, 0)`) }} body-scroll-lock-ignore ref={mainRef}  {...bind()}>
      <SheetHeader>
        <div style={{ width: 40, height: 5, background: "#ccc", borderRadius: 5 }} />
      </SheetHeader>
      <SheetContent
        
         onTouchMove={(e)=>e.preventDefault()}
           onTouchStart={handleTouchStart}
           onTouchEnd={handleTouchEnd}
        ref={contentRef}
        isScrollable={isScrollable}
        onScroll={handleScroll}
        tabIndex={-1} // Make content focusable
      >
        {children}
      </SheetContent>
    </BottomSheetContainer>
  );
};

export default BottomSheet;
