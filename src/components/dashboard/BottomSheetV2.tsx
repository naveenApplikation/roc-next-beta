"use client";
import React, { useState, useEffect, useRef, use, Fragment } from "react";
import { useSpring, animated, easings,useResize } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styles from "./BottomSheet.module.css";
import { usePathname } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import { useRouter } from "next/navigation";
import Loading from "./Loader";


type BottomSheetProps = {
  children: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [initialY, setInitialY] = useState(0);
  const {position}=useMyContext()
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResize({})
  const router=useRouter()
  // let minY = 0; // Minimum Y position (distance from the top)
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const[minY,setMinY]=useState(0)
  const [halfHeight,setHeight]=useState(0)
  // let halfHeight=position+80;
  const[loading,setIsLoading]=useState(true)
  useEffect(()=>{
       setHeight(position) 
      
  },[position])
  // if(screenHeight<700)
  //   {
  //     halfHeight =screenHeight*0.79;
  //   } else if(screenHeight<750)
  //     {
  //       halfHeight =screenHeight*0.75;
  //     }
  //  alert(halfHeight)
  const [{ y }, api] = useSpring(() => ({
      y: halfHeight,config: { 
      tension: 120, friction: 14,precision: 0.01,duration:0, easing: easings.steps(5),damping:true },
      onRest: {
        y: (e) =>{
           
            if(e.value<=minY+1 && contentRef.current)
            {
            
                contentRef.current.style.overflow="scroll"
                 
            }
            else if(contentRef.current)
            {
                contentRef.current.style.overflow="hidden"
            }
            
        },
      }
}))
useEffect(()=>{
   
   api.start({y:halfHeight})

   const scrollTop=sessionStorage.getItem("scrollTop") as number | any
   const snapPosition=sessionStorage.getItem("snapPosition") as number | any
   if(sheetRef.current)
    {
    setMinY(sheetRef.current.scrollHeight-window.innerHeight)
     
    setHeight(position+sheetRef.current.scrollHeight-window.innerHeight+69)
   
    }
    
    
   if(snapPosition=="top")
   {
   
   if(contentRef.current && sheetRef.current)
   {
  
      api.start({y:(minY),immediate:true})
       contentRef.current?.scrollTo({
           top:parseInt(scrollTop)
       })

      contentRef.current.style.overflow="auto"
      contentRef.current.style.borderRadius="0"
      sheetRef.current.style.borderRadius="0"
      
   }
  
}
 setTimeout(()=>{
  setIsLoading(false)
 },1000)
},[halfHeight])

 
  useEffect(() => {
    const height = window.innerHeight;
    const initY = height * 0.6; // Start at 70% from the top (30% visible)
  
    setInitialY(initY);
    // api.start({ y: halfHeight, immediate: true });
  }, [api, pathname]);
  
  useEffect(()=>{

    const scrollableDiv = contentRef.current;
  
 
   
    const handleScroll=()=>{
       
    if(scrollableDiv)
        {
            sessionStorage.setItem("scrollTop", scrollableDiv.scrollTop.toString());
           
      };
    }
    if(scrollableDiv)
    { scrollableDiv.addEventListener('scroll', handleScroll,false);
    scrollableDiv.addEventListener('touchstart', handleScroll,false);
    scrollableDiv.removeEventListener('touchstart', handleScroll,false);
    
    }
    
        return () => {
if(scrollableDiv){
            scrollableDiv.removeEventListener('scroll', handleScroll);
            scrollableDiv.removeEventListener('touchstart', handleScroll);
            scrollableDiv.removeEventListener('touchend', handleScroll);
         
        };
    }
  
},[])

  const bind = useDrag(
    ({
      last,
      movement: [, my],
      velocity: [, vy],
      direction: [, dy],
      cancel,
      memo = y.get(),
    }) => {
      if (initialY === 0) return; // Wait until initialY is set

      const isAtTop = y.get() <= minY + 1;
      const contentEl = contentRef.current;

      if (contentEl) {
        const scrollTop = contentEl.scrollTop;
        const scrollHeight = contentEl.scrollHeight;
        const clientHeight = contentEl.clientHeight;
        const isContentAtTop = scrollTop <= 0;
        const isContentAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Determine if we should handle the gesture or let the content scroll
        if (isAtTop) {
          if (
            (dy > 0 && isContentAtTop) || // Pulling down at top of content
            (dy < 0 && isContentAtBottom) // Pulling up at bottom of content
          ) {
            
            // Allow the sheet to move
          } else {
            // Let the content handle the scroll
            cancel();
            return;
          }
        }
      }

      if (last) {
        if (my < -5 || (vy > 0 && dy < 0)) {
          // Snap to top (minY)   
          sessionStorage.setItem("snapPosition","top");
          api.start({ y: minY });            
        } else if (my > 5 || (vy > 0 && dy > 0)) {
          // Snap to bottom (initialY)
          sessionStorage.setItem("snapPosition","bottom");
          api.start({ y: halfHeight});     
        } else {
          // Return to current position
          
          api.start({ y: y.get() });
        }
      } else {
        // During drag
        let newY = memo + my;
        newY = Math.max(minY, Math.min(newY, initialY)); // Clamp between minY and initialY
        api.start({ y: newY, immediate: true });
      }

      return memo;
    },
    {
      from: () => [0, y.get()],
      axis: "y",
      filterTaps: true,
      pointer: { touch: true },
      preventDefault: true,
    }
  );
//  alert(y.get()+""+minY)
  return <>
     {loading&&<Loading></Loading>}
  
    <animated.div
      className={styles.sheet}
      style={{
        zIndex:"2",
        transform: y.to((y) => `translateY(${y}px)`),
        borderRadius: y.to((py) => (py == minY ? 0 : 16)),
        willChange:"transform",transitionDuration:"1s",marginTop:"480px"
      }}
      {...bind()}
      onTouchMove={(event)=>event.preventDefault()}
      ref={sheetRef}
      
    >
      <animated.div
        className={styles.content}
        ref={contentRef}
        style={{
          zIndex:"2",
          overflowY:  y.to((py) => (py <= minY + 1 ? "auto" : "hidden")),
          borderRadius: y.to((py) => (py==minY?0:16)),
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  </>;
};

export default BottomSheet;
