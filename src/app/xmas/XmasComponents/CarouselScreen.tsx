'use client'
 import Image from "next/image";
import { useEffect, useState } from "react";
import { RocLogoIcon } from "../utils/XmasImagePath";
import { MenuIcon } from "@/app/utils/ImagePath";

import '../style.css'
import { transform } from "lodash";

 const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 5000; // 4 seconds

  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    // Auto-scroll to the next slide every 4 seconds
    const interval = setInterval(() => {
      goToNext();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    console.log(e)
    touchStartX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      
      goToNext();
    }
    if (touchStartX - touchEndX < -50) {
     
      goToPrevious();
    }
  };

  const RenderImage=()=>{
     return <>
        <div 
      className="carousel-container absolute w-full h-full top-0 max-w-[470px] mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-inner flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`,}}>
        {slides.map((slide, index) => (
          <div key={index} className="relative carousel-item min-w-full">
                <Image
                      layout='cover'
                       objectFit='fill'
                       
                       src={slide.image}
                       alt=''
                       className='w-full h-[320px] object-cover'
                        
                       priority
                  //      style={{height:"490px"}}
                    
                    
                      ></Image>
                   <Image
                      layout='cover'
                       objectFit='fill'
                     
                       src={slide.image}
                       alt=''
                       style={{transform: 'rotateX(190deg)'}}
                       className='w-full  h-[320px] object-cover'
                       priority
                  //      style={{height:"490px"}}
                    
                    
                      ></Image>
             
          
                 
              
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
    

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500/50'}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
     </>
  }

  return <>
     <div className='min-[800px]:hidden fixed  top-0 h-[550px] w-full z-[1]'>
             <RenderImage></RenderImage>
             {/* <button onClick={goToPrevious} className="absolute  left-0 top-[45%] transform -translate-y-1/2 bg-black/30 text-white p-2">
        ‹
      </button>
      <button onClick={goToNext} className="absolute right-0   top-[45%] transform -translate-y-1/2 bg-black/30 text-white p-2">
        ›
      </button> */}
               <div className='w-full fixed top-0 flex justify-between items-center  px-[24px] pt-[30px]'>
                  
                  <Image
                   src={RocLogoIcon}
                   alt=''
                   height={500}
                   width={500}
                   className='w-[117px] h-[48px]'
                  >
         
                  </Image>
                  <div className='flex bg-[#F40035] rounded-[10px] text-white justify-between gap-[8px] items-center px-[10px] py-[9px]'>
                        <p className='text-[15px] font-[700]'>Xmas Guide</p>
                        <Image
                          src={MenuIcon}
                          alt=''
                          height={500}
                          width={500}
                          className='relative h-[16px] w-[20px]'
                        ></Image>
                  </div>
        
               </div>
               
               <div 
                          style={{ color:'#fff' }}   onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                        className='backdropEffect'>
                              <p className='font-[400] text-[18px]' >21st Nov - 8th Dec</p>
                              <p className='font-[550] text-[22px] leading-[25px]'>Genuine Jersey - <br/> Simply Christmas Market</p>
                              <div>
                                    <p className='text-[16px] font-[500]'>View Details</p>
                              </div>
                              <div className='flex flex-row gap-[5px] p-[4px] w-[100px]'>
                                {[1,2,3].map((_,index)=>{
                                    return <>
                                         <div className={`${index === currentIndex ? 'bg-white':'bg-gray-500 '} w-full h-[3px] rounded-[100px]`}></div>
                                    </>
                                })}
                                    {/* <div className='bg-white w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div> */}
                              </div>
                      
                </div>
              
                 
                  
                </div>
  
   
    
  </>
};



export default Carousel