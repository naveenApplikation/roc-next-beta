'use client'
import React from 'react'
import Image from 'next/image'
import { FrontArrow, XmasBgImage } from '@/app/xmas/utils/XmasImagePath'
import { LogoNew, MenuIcon, profileBrown } from '@/app/utils/ImagePath'
import { useMyContext } from '@/app/Context/MyContext'
import Link from 'next/link'
import { rightSideMenuMobile } from '@/app/utils/data'
import { useRouter } from 'next-nprogress-bar'
import bgImage from '../../../../assets/bgImage.jpg'
const MobileBackground = () => {

    
    const { modalClick, iconClick } = useMyContext();
    
      const router = useRouter();
    
      const menuClick = (item: any, condition?: boolean, id?: any) => {
        if (condition) {
          router.push(`/categories/${item}?search=${id}`);
        } else {
          router.push(`/screens/${item}?categoryID=${id}`);
        }
      };
    
      const click = (item: any) => {
        if (item.name === "Map") {
          iconClick("mapClick");
        }
      };
    
  return (
    <div className='fixed top-0 h-[510px] px-[16px]  pt-[16px] pb-[60px] min-[800px]:hidden z-[1] w-full grid grid-cols-1'>
         <Image
        alt=""
        src={bgImage}
        objectFit='cover'
        layout='fill'
        priority
        >
        </Image>
        <div className='relative flex row-span-12  justify-between w-full'>
                 <Image
                          src={LogoNew}
                          width={117}
                          height={48}
                          style={{ height: "48px" }}
                          alt="Logo Outline"
                        />
                        <div className='flex gap-[16px]  justify-between'>
                       <div className='w-[48px] h-[48px] flex items-center justify-center p-[5px] rounded-full  bg-white/20 '>
                       <Image
              src={profileBrown}
              width={20}
              height={17.5}
              alt="Logo Outline"
              onClick={() => modalClick("createAccountModal")}/>
                       </div>
                       <div className='relative w-[48px] h-[48px] flex items-center justify-center p-[5px] rounded-full bg-white/20'>

                             <Image
                                          src={MenuIcon}
                                          width={20}
                                          height={17.5}
                                          alt="Logo Outline"
                                          onClick={() => modalClick("createAccountModal")}
                                        />
                                        </div>
                        </div>
        </div>
       
    {/* Dont use blur effect here */}
        <div className='flex flex-col  gap-[10px]'>
         

                <div className='relative flex gap-[8px]'>
                      {rightSideMenuMobile.map((item, index) => {
                              return<>
                                    <div
                                     onClick={() => {
                                        if (index == 3) {
                                          click(item);
                                        } else {
                                          if (item.url == "upcoming") {
                                            router.push("/upcoming");
                                          } else {
                                            menuClick(
                                              index == 2 ? item.name : item.url,
                                              index == 2 ? true : false,
                                              index == 2 ? item.url : item.id
                                            );
                                          }
                                        }
                                      }}
                                    className=' flex flex-col items-between items-center gap-[8px]  py-[16px] rounded-[8px] cursor-pointer bg-gray-500/90  h-[70px] w-full '>
                                          <Image
                                                           src={item.image}
                                                           width={item.width}
                                                           height={item.height}
                                                           alt="icon"
                                                          
                                                         />
                                                         <p className='text-white text-[14px] font-normal leading-4'>{item.name}</p>
                                    </div>
                              </>
                      }
                      )}
                </div>
                {/* Dont use blur effect here */}
                <Link className='relative   flex w-full  bg-gray-500/90 box-border px-[16px] py-[12px] items-center justify-center rounded-[8px]' href={'/Places/Community'}>
                  
                  <p className='font-bold text-[14px] text-white'>All Categories</p> 
          
                {/* <div className='flex gap-[8px]'>
                   <p className='font-normal text-[14px] text-white'>Open</p>
                   <Image
                    width={9}
                    height={14}
                    src={FrontArrow}
                    alt=""
                   />
                </div>  */}
            
          </Link>
            
        </div>
 
    </div>
  )
}

export default MobileBackground