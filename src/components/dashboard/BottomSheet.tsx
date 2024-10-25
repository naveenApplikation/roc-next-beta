// name :"yaso"
// updated:"24/10/2024"
//@ts-nocheck
'use client'
import { use, useEffect, useRef, useState } from 'react'
// import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
// import 'react-spring-bottom-sheet/dist/style.css';
import { createGlobalStyle } from 'styled-components';
import { Sheet, SheetRef } from 'react-modal-sheet';
 
import { styled } from 'styled-components';
import { head } from 'lodash';
// export default function Example({children}:{children:any}) {
//   const sheetRef = useRef<BottomSheetRef>()
//    const [currentHeight,setCurrentHeight]=useState(sheetRef.current?.height)
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState({mobile:false,tablet:false})
//   const comp=useRef<any>()
//   const heights:any[]=[]
//   for(let i=250;i<1000;i=i+100)
//   {
//      heights.push(i)
//   }
//   // Function to check screen size
//   const checkScreenSize = () => {
//     const width = window.innerWidth
//     function setVh() { const vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); }
//     if (width <= 500) { // 1024px is typically the breakpoint for tablets
//       setIsMobileOrTablet({...isMobileOrTablet,mobile:true})
//     }
//     else if(width<=800){
//          setIsMobileOrTablet({...isMobileOrTablet,tablet:true})
//     }
//     else{
//       if(isMobileOrTablet.mobile)
//         {
//           setIsMobileOrTablet({...isMobileOrTablet,mobile:false})
//         }
//         else{
//           setIsMobileOrTablet({...isMobileOrTablet,tablet:false})
//         }
//     }
//   }
//   const contentRef = useRef<any>(null);
//   const [scrollValue, setScrollValue] = useState(0);
//   console.log(scrollValue)
//   const handleScroll = () => {
//     if (contentRef.current) {
//       setScrollValue(contentRef.current.scrollTop);
//       if(contentRef.current.scrollTop==0)
//       {
//         //  setTimeout(()=>{
//         //   sheetRef.current?.snapTo(250)
//         //  },1000)
//       }
//     }
//   };
//   const handleSpring=(event)=>{
//     // console.log(sheetRef.current?.height)
//     // console.log(event)
//   }
//    useEffect(() => {
//     const contentEl = contentRef.current;
//     const selector=document.querySelector('[data-rsbs-scroll="true"]')
//     // const selector=contentRef.current
//     console.log(selector?.scrollHeight,"dd")
//     const handle=(event)=>{
//       console.log(selector?.scrollTop)
//       if(selector && selector.scrollTop==0)
//         {
//             if(sheetRef.current?.height!=250)
//             {
//               //  alert(sheetRef.current?.height)
//                console.log(Number(sheetRef.current?.height.toString().charAt(0))*100)
//                sheetRef.current?.snapTo(parseInt(sheetRef.current.height.toString().charAt(0))*100-100)
//             }
//             else
//             {
//               sheetRef.current?.snapTo(250)
//             }
//         }
//     }
//     if (selector) {
//       selector.addEventListener('touchstart', handle,{passive:true});
//     }
//     return () => {
//       if (selector) {
//         selector.removeEventListener('touchstart', handle);
//       }
//     };
//   }, [isMobileOrTablet]);
//   useEffect(() => {
//     // The content inside the BottomSheet is wrapped inside a div that becomes scrollable
//     checkScreenSize() // Initial check
//     window.addEventListener('resize', checkScreenSize) // Update on resize
//     // window.addEventListener('touchstart',handleScroll)
//     return () => {
//       window.removeEventListener('resize', checkScreenSize) // Cleanup listener on unmount
//     }
//   }, [sheetRef])
//   const bottomsheet=(event)=>{
//      console.log(window.screen.height)
//     if(sheetRef.current?.height<=window.screen.height)
//     {
//     sheetRef.current?.snapTo(1000)
//     }
//   }
//   return <>
//      { isMobileOrTablet.mobile || isMobileOrTablet.tablet ? (
//       <>
//   <GlobalStyle></GlobalStyle>
//     <BottomSheet open ref={sheetRef as any}
//     onSpringStart={handleSpring}
//     onSpringEnd={handleSpring}
//     onScrollCapture={bottomsheet}
//     snapPoints={({ minHeight, maxHeight }) => isMobileOrTablet.mobile?[...heights,maxHeight]:[250,maxHeight,1000]}
//     defaultSnap={({ maxHeight }) => isMobileOrTablet.mobile?300:320}
//     blocking={false}
//      scrollLocking={false}
//     skipInitialTransition
//     onScroll={handleScroll}
//     style={{maxHeight:"110vh"}}
//     >
//        {/* <div  data-body-scroll-lock-ignore   style={{height:"100vh",overflowY:"auto",WebkitOverflowScrolling: 'touch',touchAction:"auto"}} ref={contentRef}  > */}
//              {children}
//       {/* </div> */}
//     </BottomSheet>
//   </>
//   ):<>{children}</>}
//   </>
// }
// const GlobalStyle = createGlobalStyle`
//     :root {
//   --rsbs-backdrop-bg: red;
//   --rsbs-bg: #fff;
//   --rsbs-handle-bg: hsla(0, 0%, 0%, 0.14);
// }
//   [data-rsbs-overlay="true"] {
//     /* Allow interaction with elements behind the sheet */
//     transition:none;
//     overflow-y:scroll;
//   }
//   [data-rsbs-content="true"] {
//     pointer-events: all; /* Enable interaction only with the sheet content */
//     transition:none;
//   }
//   .react-spring-bottom-sheet{
//     transition:transform 0s
//   }
// `
export default function BottomSheetComp({ children }: { children: any }) {
  const sheetRef = useRef<SheetRef>()
  const containerRef = useRef<any>()
  const [position, setPosition] = useState<number>(0.48)
  const scrollRef = useRef<any>()
  const [currentSnap, setCurrentSnap] = useState(1)
  const [currentHeight, setCurrentHeight] = useState(10)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState({ mobile: true })
  console.log(position)
  const checkScreenSize = () => {
    const width = window.innerWidth
    const height: number = Number(window.innerHeight)
    if (currentSnap == 1) {
        if(width<400)
        {
            setPosition((height / 1866)-0.03)
        }
        else
        {
            setPosition(height / 1866)
        }
    }
   
    console.log(width)
    if (width > 800) {
      setIsMobileOrTablet({ ...isMobileOrTablet, mobile: false })
    }
    else {
      setIsMobileOrTablet({ ...isMobileOrTablet, mobile: true })
    }
  }
  useEffect(() => {
    
    checkScreenSize() 
    window.addEventListener('resize', checkScreenSize)  
    
    return () => {
      window.removeEventListener('resize', checkScreenSize) 
    }
  }, [sheetRef])
  useEffect(() => {
    const container = containerRef.current
    console.log(container)
    if (container) {
    //     container.style.maxHeight = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
    //   container.style.height = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
      if (currentSnap == 0) {
        container.style.borderTopRightRadius = "0px"
        container.style.borderTopLeftRadius = "0px"
      }
      else {
        container.style.borderTopRightRadius = "29px"
        container.style.borderTopLeftRadius = "29px"
      }
      console.log(container.style)
    }
  }, [currentSnap])
  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
    
        console.log("prevented",e.defaultPrevented)
        // disable default behaviour on bottom 
        console.log("calling",e.touches[0],e.touches[0].clientY,window.scrollY,window.innerHeight*0.8<e.touches[0].clientY)
        if (e.touches[0].clientY > window.innerHeight * 0.8 && window.scrollY === 0 && currentSnap==1) {
           console.log("preventing",e,currentSnap) 
            //for prevent the scroll and smooth drag from bottom
            // e.preventDefault();
        }
      };
    window.addEventListener('touchstart', preventPullToRefresh, { passive: false });
  
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const handleScroll = () => {
        setCurrentHeight(scrollContainer.scrollTop)
        console.log(scrollContainer.scrollTop)
      }
      scrollContainer.addEventListener('scroll', handleScroll)
    }
    
    return ()=>{
        window.removeEventListener('touchstart', preventPullToRefresh);
    }
    
   
  }, [currentSnap])
  
//   const enableScroll=()=>{
//      console.log("yes")
//      window.removeEventListener('touchstart', preventPullToRefresh, { passive: false });
//   }
 
  console.log(sheetRef.current?.y.current)
  return <>
    {isMobileOrTablet.mobile ?
      <CustomSheet isOpen={true}
          
        draggable={false}
        ref={sheetRef}
        snapPoints={[1, position]}
        initialSnap={1}
        onClose={() => { }}
        detent="full-height"
        style={{ zIndex: 1, WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
     
        onSnap={(index) => {
            //  if(index==0)
            //  {
            //      enableScroll()
            //  }
            const container = containerRef.current
            if (container) {
                container.style.maxHeight = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
              container.style.height = 'min(100vh, calc(100% - env(safe-area-inset-top) - 0px))';
            }
          console.log("motion", sheetRef.current?.y)
          setCurrentSnap(index)
          if (index == 0 && sheetRef.current && sheetRef.current.y.prev + 6.2< sheetRef.current.y.current) {
            console.log(index, "y", sheetRef.current.y.current, sheetRef.current.y.prev, position)
            setPosition((window.innerHeight / 1866)-0.03)
            sheetRef.current?.snapTo(1)
          }
          if (index == 1 && sheetRef.current && (sheetRef.current.y.prev - 7) > sheetRef.current.y.current) {
            console.log(index, "ya", sheetRef.current.y.prev, sheetRef.current.y.current)
            sheetRef.current?.snapTo(0)
          }
        }
        }
        onPanEnd={() => {
          if (sheetRef.current?.y?.current > 500) {
            sheetRef.current?.snapTo(1)
          }
          console.log("end", currentSnap)
        }
        }
        disableScrollLocking={false}
       
        tweenConfig={{ ease:"linear", duration: 0.3}}
        
      >
        <CustomContainer ref={containerRef} data-body-scroll-lock-ignore  >
          <Sheet.Content data-body-scroll-lock-ignore >
            <Sheet.Scroller
              data-body-scroll-lock-ignore 
              ref={scrollRef}
              style={{ overflowY: currentSnap == 1 ? 'hidden' : 'scroll',scrollBehavior: "smooth", WebkitOverflowScrolling: "touch", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}
            
                 >
              {children}
            </Sheet.Scroller>
          </Sheet.Content>
        </CustomContainer>
        {/* <Sheet.Backdrop /> */}
      </CustomSheet> : children
    }
  </>
}
const CustomSheet = styled(Sheet)`
  .${'react-modal-sheet-container '}{
        //  max-height: min(760px, calc(100% - env(safe-area-inset-top) - 0px));
        // height: min(760px, calc(100% - env(safe-area-inset-top) - 0px));
  }
`;
const CustomContainer = styled(Sheet.Container)`
//   height: 100vh;
//   max-height: min(900px, calc(100% - env(safe-area-inset-top) - 0px));
`;