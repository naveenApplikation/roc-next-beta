 
import '@/app/tailwind.css'
import ScrollLayout from './XmasComponents/ScrollLayout';
import { LogoNew, MenuIcon } from '../utils/ImagePath';
import Image from 'next/image';
import { XmasBgImage } from './utils/XmasImagePath';
export default function Layout({children}:{children:any}){
  
      return <>
      <div className='min-[800px]:hidden fixed z-[-2] top-0 h-screen bg-white w-full'></div>
               <div className='min-[800px]:hidden fixed  top-0 h-[510px] w-full z-[1]'>
                
                <div> 
                      <Image
                      
                  //      objectFit='fill'
                       layout='fill'
                       objectFit='cover'
                       src={XmasBgImage}
                       alt=''
                       className='w-full object-fit'
                       priority
                  //      style={{height:"490px"}}
                    
                    
                      ></Image>
                </div>
                <div className='w-full absolute top-0 flex justify-between items-center  px-[24px] pt-[30px]'>
                  
                   <Image
                    src={LogoNew}
                    alt=''
                    height={48}
                    width={117}
                   >

                   </Image>
                   <div className='flex bg-[#F40035] rounded-[10px] text-white justify-between gap-[8px] items-center px-[10px] py-[8px]'>
                         <p className='text-[14px] font-[500]'>Xmas Guide</p>
                         <Image
                           src={MenuIcon}
                           alt=''
                           height={17.5}
                           width={20}
                       
                         ></Image>
                   </div>

                </div>
              
                        <div  style={{ boxShadow: '10px -50px 30px rgba(0, 0, 0, 0.5)' }}  className='text-white absolute bottom-0 w-full  z-[1] box-border grid grid-cold-1 px-[16px] pb-[50px] pt-[10px] gap-[12px] backdrop-blur-[20px] '>
                              <p className='font-[500] text-[18px]' >21st Nov - 8th Dec</p>
                              <p className='font-[700] text-[22px] leading-[22px]'>Genuine Jersey - Simply Christmas Market</p>
                              <div>
                                    <p className='text-[16px] font-[700]'>View Details</p>
                              </div>
                              <div className='flex flex-row gap-[4px] p-[4px] w-[88px]'>
                                    <div className='bg-white w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                              </div>
                      
                </div>
                </div>
                <ScrollLayout></ScrollLayout>        
      </>
}