import './style.css'
import '@/app/tailwind.css'
import ScrollLayout from './XmasComponents/ScrollLayout';
import { LogoNew, MenuIcon } from '../utils/ImagePath';
import Image from 'next/image';
import { EventLayout, RocLogoIcon, ShoppingLayout, winterDomes, XmasBgImage } from './utils/XmasImagePath';
import { url } from 'inspector';
import Carousel from './XmasComponents/CarouselScreen';
import { getCarouselData } from './XmasAction';
import XmasDashboard from './XmasComponents/XmasDashBoard';
import DashBoardModalScreen from '@/components/dashboard/DashBoardModalScreen';
import { Metadata } from 'next';
import {MetaImage} from './utils/XmasImagePath'
export const maxDuration = 300;
export default async function Layout({children}:{children:any}){
  

       const data:any=await getCarouselData()
      
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
      <div className='min-[800px]:hidden fixed z-[1] top-0 h-screen bg-white w-full'></div>

               <Carousel slides={data}></Carousel>
            
                 
                <ScrollLayout>
                  <XmasDashboard></XmasDashboard>
                  </ScrollLayout>

                  {children}    
                  <DashBoardModalScreen></DashBoardModalScreen>    
      </>
}



export const metadata: Metadata = {
      manifest: "/manifest.json",
      title: "Jersey Christmas Guide 2024 | Discover Festive Events, Shopping, Dining withROC",
      description: "Explore Jersey's ultimate Christmas guide with ROC! Find the best festive shopping spots, dining experiences, events, and New Year’s celebrations. Dive into the season’s magic and make memories with ROC’s complete guide to Christmas in Jersey, Channel Islands.",
      icons:
        "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
      twitter: {
        card: "summary_large_image",
        title: "ROC - What's #OnTheROC",
        description: "Your one-stop-shop for  Latest from ROC.",
        images:MetaImage.src
      },
      openGraph: {
        images:MetaImage.src
      },
    };
    