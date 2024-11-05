import './style.css'
import '@/app/tailwind.css'
import ScrollLayout from './XmasComponents/ScrollLayout';
import { LogoNew, MenuIcon } from '../utils/ImagePath';
import Image from 'next/image';
import { RocLogoIcon, XmasBgImage } from './utils/XmasImagePath';
import { url } from 'inspector';
export default function Layout({children}:{children:any}){
  
      return <>
      <div className='min-[800px]:hidden fixed z-[-2] top-0 h-screen bg-white w-full'></div>
               <div className='min-[800px]:hidden fixed  top-0 h-[550px] w-full z-[1]'>
                
                <div> 
                      <Image
                      layout='cover'
                       objectFit='fill'
                     
                       src={XmasBgImage}
                       alt=''
                       className='w-full  object-cover'
                       priority
                  //      style={{height:"490px"}}
                    
                    
                      ></Image>
                </div>
                <div className='w-full absolute top-0 flex justify-between items-center  px-[24px] pt-[30px]'>
                  
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
                  
                  {/* <div
                        style={{ boxShadow: `10 -30px 10px rgba(0, 0, 0, 0.5),  
                       ` }} 
                  className='absolute h-[100px] bottom-[170px] z-[5] w-full bg-gradient-to-t from-[#5a3621] to-transparent  '>
                   </div>
                   <div
                        style={{ boxShadow: `10 -30px 10px rgba(0, 0, 0, 0.5),  
                       ` }} 
                  className='absolute h-[100px] bottom-[170px] right-0 z-[6] w-full bg-gradient-to-t from-[#301c14] to-transparent  '>
                   </div> */}
                        {/* <div 
                          style={{ boxShadow: ` 0 -80px 60px rgba(44, 26, 17, 0.3),  
        0 -30px 50px rgba(44, 26, 17, 0.3), 
        0 -30px 50px rgba(44, 26, 17, 0.5)` }} 
                        className='bg-gradient-to-r from-[#5c3822] via-dark-brown to-dark-brown text-white absolute bottom-0 w-full   z-[1] box-border grid grid-cold-1 px-[16px] pb-[50px] pt-[5px] gap-[8px] backdrop-blur-[0px] '>
                              <p className='font-[500] text-[18px]' >21st Nov - 8th Dec</p>
                              <p className='font-[700] text-[22px] leading-[25px]'>Genuine Jersey - <br/> Simply Christmas Market</p>
                              <div>
                                    <p className='text-[16px] font-[700]'>View Details</p>
                              </div>
                              <div className='flex flex-row gap-[4px] p-[4px] w-[88px]'>
                                    <div className='bg-white w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                              </div>
                      
                </div> */}
                <div className='absolute bottom-0 h-full w-full '
                
                >
                                          
                </div>
                </div>
                 
                <ScrollLayout></ScrollLayout>        
      </>
}