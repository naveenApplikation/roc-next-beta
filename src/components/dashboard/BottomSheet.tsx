// name :"yaso"
// updated:"24/10/2024"
 
'use client'
import { use, useEffect, useRef, useState } from 'react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css';
import { createGlobalStyle } from 'styled-components';
import { Sheet, SheetRef } from 'react-modal-sheet';
 
import { styled } from 'styled-components';
import { head } from 'lodash';
import { useDragControls, useMotionValue, } from 'framer-motion';
import { useSpring } from '@react-spring/web';
import { log } from 'console';
import PageLayout from '@/app/pageLayout';
import ScrollSet from './ScrollSet';
 
import { parse } from 'path';
import { SpringEvent } from 'react-spring-bottom-sheet/dist/types';
import Header from "@/components/header/page";
export default function BottomSheetComp({children}:{children:any}) {
    const [springs, api] = useSpring(
        () => ({
          y: 0,
          config: {
            mass: 3,
            friction: 20,
            tension: 20,
          },
        }),
        []
      )
      const [isScrolling,setIsScrolling]=useState(false)
     
  const sheetRef = useRef<BottomSheetRef>()
   const [currentHeight,setCurrentHeight]=useState(sheetRef.current?.height)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState({mobile:false,tablet:false})
  let initiate:any
 useEffect(()=>{
      
    const value=sessionStorage.getItem("currentHeight")
    console.log("value",currentHeight)
    if(value)
    {
     sheetRef.current?.snapTo(parseInt(value))
    }
      
     initiate=setTimeout(()=>{
        setIsMobileOrTablet({...isMobileOrTablet})
   },1000)
 },[])
  
  useEffect(()=>{
    const scrollValue=sessionStorage.getItem("scrollMobile")
    const contentEl = contentRef.current;
    console.log("scrollvalue",scrollValue)
    const selector=document.querySelector('[data-rsbs-scroll="true"]')
    console.log(selector)
   if(selector)
   {
      
      selector.scrollTop=scrollValue?parseInt(scrollValue):0
     
   }
   clearTimeout(initiate);
},[isMobileOrTablet])
  
  const [heights,setHeight]=useState(0)
  useEffect(()=>{
       setHeight(window.innerHeight-480)
  },[isMobileOrTablet])
 
  
  const checkScreenSize = () => {
    const width = window.innerWidth
       if (width <= 500) { // 1024px is typically the breakpoint for tablets
      setIsMobileOrTablet({...isMobileOrTablet,mobile:true})
    }
    else if(width<=800){
         setIsMobileOrTablet({...isMobileOrTablet,tablet:true})
    }
    else{
      if(isMobileOrTablet.mobile)
        {
          setIsMobileOrTablet({...isMobileOrTablet,mobile:false})
        }
        else{
          setIsMobileOrTablet({...isMobileOrTablet,tablet:false})
        }
    }
  }
//   const [appeared,setAppeared]=useState(false)
//   useEffect(()=>{

//      const value=setInterval(()=>{
//               if(sheetRef.current)
//               {
//                    setAppeared(true)
//               }
//       },2000)

//       if(appeared)
//       {
//           console.log("appeared")
//           const value1=sessionStorage.getItem("currentHeight")
//           console.log("appeared",value1)
//           if(value1)
//           {
//             console.log("appeared3",sheetRef.current)
//           sheetRef.current?.snapTo(931)
//           }
//          clearInterval(value)
//       }
//   },[appeared])
  const handleAtOpen=()=>{
    console.log("sheet",sheetRef)
    const value=sessionStorage.getItem("currentHeight")
    console.log("insideHandleopen",value)
    sheetRef.current?.snapTo(value?parseInt(value):heights)
    const scrollValue=sessionStorage.getItem("scrollMobile")
    console.log("scrollvalue",scrollValue)
    const selector=document.querySelector('[data-rsbs-scroll="true"]')
    console.log(selector)
   if(selector)
   {
      
      selector.scrollTop=scrollValue?parseInt(scrollValue):0
     
   }
//       sheetRef.current?.snapTo(({ snapPoints }) =>{ 
//           console.log(snapPoints)
//            console.log(snapPoints)
//           const value=sessionStorage.getItem("scrollMobile")
//           if(value?.includes("0"))
//           {
//              return 0
//           }
//           else
//           {
//           return 1
//           }
//   })
    }
  

  const contentRef = useRef<any>(null);
  const [scrollValue, setScrollValue] = useState(0);
  console.log(scrollValue)
  const handleScroll = () => {
    if (contentRef.current) {
      setScrollValue(contentRef.current.scrollTop);
      if(contentRef.current.scrollTop==0)
      {
        //  setTimeout(()=>{
        //   sheetRef.current?.snapTo(250)
        //  },1000)
      }
    }
  };
  const handleSpring=(event)=>{
    // console.log(sheetRef.current?.height)
    // console.log(event)
   
    if(event.type=="OPEN")
    {
        console.log("opened")
        
        handleAtOpen()

    }
    // if(event.type=="dragging")
    // {
    //      console.log("yes dragging")
    // }
    // if(event.source=="dragging")
    // {
    //     sessionStorage.setItem("currentHeight",sheetRef.current?sheetRef.current.height.toString():height.toString())
    // }

    console.log("yes",event.type,sheetRef.current?.height)
  }

 

   useEffect(() => {
    const contentEl = contentRef.current;
    const selector=document.querySelector('[data-rsbs-scroll="true"]')
    // const selector=contentRef.current
    console.log(selector,"dd")
    const handle=(event)=>{
      console.log(selector?.scrollTop)
      sessionStorage.setItem("scrollMobile",selector?selector.scrollTop.toString():"0")
      if(selector && selector.scrollTop==0)
        {
            if(sheetRef.current?.height!=250)
            {
              //  alert(sheetRef.current?.height)
               console.log(Number(sheetRef.current?.height.toString().charAt(0))*100)
               sheetRef.current?.snapTo(parseInt(sheetRef.current.height.toString().charAt(0))*100-100)
            }
            else
            {
              sheetRef.current?.snapTo(250)
            }
        }
    }
    if (selector) {
      selector.addEventListener("touchmove", handle,{passive:false});
    }
    return () => {
      if (selector) {
        selector.removeEventListener('touchmove', handle);
      }
    };
  }, [isMobileOrTablet,isScrolling]);
  useEffect(() => {
    // The content inside the BottomSheet is wrapped inside a div that becomes scrollable
    checkScreenSize() // Initial check
    window.addEventListener('resize', checkScreenSize) // Update on resize
    // window.addEventListener('touchstart',handleScroll)
    return () => {
      window.removeEventListener('resize', checkScreenSize) // Cleanup listener on unmount
    }
  }, [sheetRef])
   
  const springEnd=(e)=>{
      
      if(e.type=="SNAP")
      {
        
      sessionStorage.setItem("currentHeight",sheetRef.current?sheetRef.current?.height.toString():"0")
      }
  }
  return <>
     { isMobileOrTablet.mobile || isMobileOrTablet.tablet ? (
      <>
  <GlobalStyle></GlobalStyle>
    <BottomSheet open ref={sheetRef as any}
    onSpringStart={handleSpring}
    onSpringEnd={springEnd}
   
    snapPoints={({ minHeight, maxHeight }) => isMobileOrTablet.mobile?[maxHeight,heights]:[maxHeight,heights]}
    defaultSnap={({ maxHeight }) => isMobileOrTablet.mobile?300:320}

    blocking={false}
    scrollLocking={true}
    onScroll={handleScroll}
    expandOnContentDrag

    
    onTransitionStart={()=>{alert("yaso")}}
    style={{transitionDuration:"0s",transitionBehavior:"unset",animation:"none",zIndex:"1"}}
    >
         {children}
   
    </BottomSheet>
  </>
  ):<>
    <div className="h-screen scroll-smooth   overflow-auto  max-[800px]:h-auto max-[800px]:overflow-hidden max-[800px]:rounded-t-3xl max-[800px]:mt-[470px] max-[800px]:z-[1] max-[800px]:bg-white no-scrollbar">
          <PageLayout>
            <ScrollSet>
            <Header></Header>     
         {children}
        </ScrollSet>
          </PageLayout>
        </div>
  </>}
  </>
}
const GlobalStyle = createGlobalStyle`
    :root {
  --rsbs-backdrop-bg: red;
  --rsbs-bg: #fff;
  --rsbs-handle-bg: hsla(0, 0%, 0%, 0.14);
}
  @media (pointer: coarse) {
  [data-rsbs-root="true"]{
      
  }
}
  [data-rsbs-overlay="true"] {
    /* Allow interaction with elements behind the sheet */
 
    overflow-y:scroll;

  }
  [data-rsbs-content="true"] {
    pointer-events: all; /* Enable interaction only with the sheet content */
     
  }
  .react-spring-bottom-sheet{
 
    display:none;
  }
`
// export default function BottomSheetComp({ children }: { children: any }) {
//   const sheetRef = useRef<SheetRef>()
//   const containerRef = useRef<any>()
//   const [position, setPosition] = useState<number>(0.48)
//   const scrollRef = useRef<any>()
//   const [currentSnap, setCurrentSnap] = useState(1)
//   const [currentHeight, setCurrentHeight] = useState(10)
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState({ mobile: true })
//   const [currentValue,setCurrentValue]=useState<any>(-1);
//   const contentRef=useRef<any>()
//   const motionValue=useDragControls()
//   const [isScrolling,setIsScrolling]=useState(false)
//    useEffect(()=>{
//     const observer = new IntersectionObserver(([entry]) => {
 
//                 console.log("from bottom",entry.boundingClientRect.bottom)
      
//     },{threshold:0.1})
    
//     if (scrollRef.current) {
//         observer.observe(scrollRef.current);
//       }

      

//       return () => {
//         if (scrollRef.current) {
//           observer.unobserve(scrollRef.current);
//         }
//     }
//    },[currentSnap])
//   console.log(position)
//   const checkScreenSize = () => {
//     const width = window.innerWidth
//     const height: number = Number(window.innerHeight)
//     if (currentSnap == 1) {
//         if(width<400)
//         {
//             setPosition((height / 1866)-0.03)
//         }
//         else
//         {
//             setPosition(height / 1866)
//         }
//     }
   
//     console.log(width)
//     if (width > 800) {
//       setIsMobileOrTablet({ ...isMobileOrTablet, mobile: false })
//     }
//     else {
//       setIsMobileOrTablet({ ...isMobileOrTablet, mobile: true })
//     }
//   }
//   const controls=(e)=>{
     

//     console.log("useControls",e)
    
//     motionValue.start(e,{

//     snapToCursor:true
//   })}
//   useEffect(() => {
    
//     checkScreenSize() 
//     window.addEventListener('resize', checkScreenSize)  
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize) 
//     }
//   }, [sheetRef])
//   useEffect(() => {
//     const container = containerRef.current
//     console.log("container",sheetRef.current?.y.isAnimating())
//     if (container) {
//     //     container.style.maxHeight = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
//     //   container.style.height = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
//       if (currentSnap == 0) {
//         container.style.borderTopRightRadius = "0px"
//         container.style.borderTopLeftRadius = "0px"
//       }
//       else {
//         container.style.borderTopRightRadius = "29px"
//         container.style.borderTopLeftRadius = "29px"
//       }
//       console.log(container.style)
//     }
//   }, [currentSnap])
//   useEffect(() => {
//     const preventPullToRefresh = (e: TouchEvent) => {
    
//         console.log("prevented",e.defaultPrevented)
//         // disable default behaviour on bottom 
//         console.log("calling",e.touches[0],e.touches[0].clientY,window.scrollY,window.innerHeight*0.8<e.touches[0].clientY)
//         if (e.touches[0].clientY > window.innerHeight * 0.8 && window.scrollY === 0 && currentSnap==1) {
//            console.log("preventing",e,currentSnap) 
//             //for prevent the scroll and smooth drag from bottom
//             // e.preventDefault();
//         }
//       };
//     window.addEventListener('touchstart', preventPullToRefresh, { passive: false });
  
//     const scrollContainer = scrollRef.current
//     if (scrollContainer) {
//       const handleScroll = () => {
//         setCurrentHeight(scrollContainer.scrollTop)
//         console.log(scrollContainer.scrollTop)
//       }
//       scrollContainer.addEventListener('scroll', handleScroll)
//     }
    
//     return ()=>{
//         window.removeEventListener('touchstart', preventPullToRefresh);
//     }
    
   
//   }, [currentSnap])
  
// //   const enableScroll=()=>{
// //      console.log("yes")
// //      window.removeEventListener('touchstart', preventPullToRefresh, { passive: false });
// //   }
 
//   console.log(sheetRef.current?.y.current)
//   return <>
//     {isMobileOrTablet.mobile ?
//       <CustomSheet isOpen={true}
//        dragControls={motionValue}
//         draggable={true}
//         ref={sheetRef}
//         snapPoints={[1,position]}
//         initialSnap={1}
//         onClose={() => { }}
//         detent="full-height"
//         style={{ zIndex: 1,scrollBehavior: "smooth" }}
   
//         onSnap={(index) => {
//             //  if(index==0)
//             //  {
//             //      enableScroll()
//             // 
//             if(currentSnap==0)
//             {
//                console.log("current value",sheetRef.current?.y.get(),sheetRef.current?.y.getPrevious())
//             }
//             setCurrentValue(sheetRef.current?.y.get())
//             if(index==1)
//             {
//                 console.log("yes coming")
//                 // sheetRef.current?.y.jump(0,false)
//                 // sheetRef.current.y.setWithVelocity(233,0,32)
               
//             }
//             else(index==0)
//             {
//                 console.log("moving")
//                 // sheetRef.current?.y.jump(200,false)
//             }
           
//             const container = containerRef.current
//             if (container) {
//                 container.style.maxHeight = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
//               container.style.height = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
//             }
        
        
//           if (index == 0 && sheetRef.current && sheetRef.current.y.prev + 6.2< sheetRef.current.y.current) {
//             // console.log(index, "y", sheetRef.current.y.current, sheetRef.current.y.prev, position)
//             setPosition((window.innerHeight / 1866)-0.03)
//             sheetRef.current?.snapTo(1)
//             setCurrentSnap(1)
//           }
//           if (index == 1 && sheetRef.current && (sheetRef.current.y.prev - 7) > sheetRef.current.y.current) {
//             // console.log(index, "ya", sheetRef.current.y.prev, sheetRef.current.y.current)
//             sheetRef.current?.snapTo(0)
//             setCurrentSnap(0)
//           }
//         }
//         }
//         onPanEnd={() => {
//           if (sheetRef.current?.y?.current > 500) {
//             sheetRef.current?.snapTo(1)
//           }
//           console.log("end", currentSnap)
//         }
//         }
//         disableScrollLocking={true}
       
//         tweenConfig={{ ease:"linear", duration: 0.3}}
        
//       >
//         <CustomContainer ref={containerRef} data-body-scroll-lock-ignore   >
//           <Sheet.Content data-body-scroll-lock-ignore ref={contentRef} onAnimationStart={()=>{console.log("animation started")}} >
//             <Sheet.Scroller onTouchStart={controls}
//               data-body-scroll-lock-ignore 
//               ref={scrollRef}
//               style={{ overflowY: currentSnap==1 ? 'hidden' : 'scroll',scrollBehavior: "smooth", WebkitOverflowScrolling: "touch", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}
//               onScroll={()=>{setIsScrolling(true)}}
//                  >
//               {children}
//             </Sheet.Scroller>
//           </Sheet.Content>
//         </CustomContainer>
//         {/* <Sheet.Backdrop /> */}
//       </CustomSheet> : children
//     }
//   </>
// }
// const CustomSheet = styled(Sheet)`
//   .${'react-modal-sheet-container '}{
//         //  max-height: min(760px, calc(100% - env(safe-area-inset-top) - 0px));
//         // height: min(760px, calc(100% - env(safe-area-inset-top) - 0px));
//   }
// `;
// const CustomContainer = styled(Sheet.Container)`
// //   height: 100vh;
// //   max-height: min(900px, calc(100% - env(safe-area-inset-top) - 0px));
// `;