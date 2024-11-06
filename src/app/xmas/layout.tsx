import './style.css'
import '@/app/tailwind.css'
import ScrollLayout from './XmasComponents/ScrollLayout';
import { LogoNew, MenuIcon } from '../utils/ImagePath';
import Image from 'next/image';
import { EventLayout, RocLogoIcon, ShoppingLayout, winterDomes, XmasBgImage } from './utils/XmasImagePath';
import { url } from 'inspector';
import Carousel from './XmasComponents/CarouselScreen';
import { getCarouselData } from './XmasAction';
export default async function Layout({children}:{children:any}){
  

      //  const data=await getCarouselData()
      //  console.log(data)
      const slides=[
            {
               image:XmasBgImage,
               
            }
            ,
            {
                  image:ShoppingLayout
            },
            {
                  image:EventLayout
            }
      ]
      return <>
      <div className='min-[800px]:hidden fixed z-[-2] top-0 h-screen bg-white w-full'></div>

               <Carousel slides={slides}></Carousel>
            
                 
                <ScrollLayout></ScrollLayout>        
      </>
}