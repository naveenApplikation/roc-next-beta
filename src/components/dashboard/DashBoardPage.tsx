
import React from "react";
import dynamic from 'next/dynamic';

 
// const SearchNFilter = dynamic(() => import('@/components/homepage/SearchNFilter'), { ssr: false });
// const InfoApp = dynamic(() => import('@/components/homepage/InfoApp'), { ssr: false });
// const FamilyEvent = dynamic(() => import('@/components/homepage/FamilyEvent'), { ssr: false });
// const LeaveFeedbackButton = dynamic(() => import('@/components/homepage/LeaveFeedbackButton'), { ssr: false });
// const AdsBanner=dynamic(()=>import("../adsBanner/page"),{ssr:false})
import { iconsHome } from "@/app/utils/homeIcon";
 
import {
  getCategory,
  getApiWithIcon,
  getDataForHome,
} from "@/app/action";

import { getClient, getAllPosts } from "@/lib/sanity.client";
 
// const CycleRoutes= dynamic(()=>import("../homepage/CycleRoutes"),{ssr:false});
// const Blog=dynamic(()=>import("../homepage/Blog"),{ssr:false})
// const CategoriesComps =dynamic(()=>import("../homepage/CategoriesComps"),{ssr:false});
// const EnjoyTheSunshine=dynamic(()=>import("../homepage/EnjoyTheSunshine"),{ssr:false});
// const ScreenPageComps=dynamic(()=>import("../homepage/ScreenPageComps"),{ssr:false});
// const Walks=dynamic(()=>import("../homepage/Walks"),{ssr:false});
// const Directory=dynamic(()=>import("../homepage/Directory"),{ssr:false})

import AdsBanner from "../adsBanner/page";
import Blog from "../homepage/Blog";
import CategoriesComps from "../homepage/CategoriesComps";
import EnjoyTheSunshine from "../homepage/EnjoyTheSunshine";
import FamilyEvent from "../homepage/FamilyEvent";
import InfoApp from "../homepage/InfoApp";
import LeaveFeedbackButton from "../homepage/LeaveFeedbackButton";
import ScreenPageComps from "../homepage/ScreenPageComps";
import SearchNFilter from "../homepage/SearchNFilter";
import Walks from "../homepage/Walks";
import Directory from "../homepage/Directory";
import CycleRoutes from "../homepage/CycleRoutes";
 

const DashBoard = async () => {
  // const specificSectionRef = useRef<HTMLDivElement>(null);

  // const handleClick = (event: MouseEvent) => {
  //   if (
  //     specificSectionRef.current &&
  //     !specificSectionRef.current.contains(event.target as Node)
  //   ) {
  //   }
  // };
 
  const listData = await getApiWithIcon("category", iconsHome);
  let LocalCusinedata = await getCategory("google/dine-out");

  LocalCusinedata = {
    name: LocalCusinedata?.listName,
    id: LocalCusinedata?._id,
    listData: LocalCusinedata.GoogleHomeScreenList.slice(0, 10),
  };
  let familyEventdata = await getCategory("upcomming-events?type=limit");
  familyEventdata = await familyEventdata.data.slice(0, 10);
  let enjoyTheSunshinedata = await getCategory("sun-shine");
  enjoyTheSunshinedata = await enjoyTheSunshinedata.data;
  
  let bardata = await getDataForHome("Pubs", listData[0]?._id);
  bardata = {
    name: bardata?.listName,
    id: bardata?._id,
    listData: bardata?.categoryList.slice(0, 10),
  };

  let beachLifedata = await getCategory("google/beach-life");
  beachLifedata = {
    name: beachLifedata[0]?.listName,
    id: beachLifedata[0]?._id,
    listData: beachLifedata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };

  let sustainabilitydata = await getCategory("google/sustainability");
  sustainabilitydata = {
    name: sustainabilitydata[0]?.listName,
    id: sustainabilitydata[0]?._id,
    listData: sustainabilitydata[0].GoogleHomeScreenList?.slice(0, 10),
  };
  let Heritagedata = await getCategory("google/heritage");
  Heritagedata = {
    name: Heritagedata[0]?.listName,
    id: Heritagedata[0]?._id,
    listData: Heritagedata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };
  const Walksdata = await getCategory("walks");

  let Cocktaildata = await getCategory("google/cocktail-bars");
  Cocktaildata = {
    name: Cocktaildata[0]?.listName,
    id: Cocktaildata[0]?._id,
    listData: Cocktaildata[0]?.GoogleFoodAndDrinksList?.slice(0, 10),
  };

  let Surfingdata = await getCategory("google/surfing");
  Surfingdata = {
    name: Surfingdata[0]?.listName,
    id: Surfingdata[0]?._id,
    listData: Surfingdata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };
  let topAttractionsdata = await getCategory("google/top-attraction");
  topAttractionsdata = {
    name: topAttractionsdata[0]?.listName,
    id: topAttractionsdata[0]?._id,
    listData: topAttractionsdata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };
  const client = getClient();
  const post = await getAllPosts(client);

   
  return (
    <>
      
       
        <SearchNFilter />
      
      
        <InfoApp />
     
        <FamilyEvent data={familyEventdata} />
        
 
        <CategoriesComps
          type="activity-list"
          name=""
          title="Trending Lists"
        />
       
        <ScreenPageComps data={LocalCusinedata} title="Dine Out" />
     
        <EnjoyTheSunshine data={enjoyTheSunshinedata} />
     
        <CategoriesComps
        
          type="activity-list"
          name=""
          title="Events By date"
        />
      
        <ScreenPageComps data={beachLifedata} title="Beach life" />
    
        <Directory />
      
        <ScreenPageComps data={bardata} title="Pubs" />
      
        <CategoriesComps
        
          type="shopping"
          name=""
          title="Shopping"
        />
      
        <CategoriesComps
          
          type="event-category-list"
          name="list"
          title="Event Categories"
        />
      
        <CategoriesComps
       
          type="activity-list"
          name="list"
          title="Activity Categories"
        />
     
        <CategoriesComps
           
          type="activity-list"
          name=""
          title="Community"
        />
      
        <ScreenPageComps data={sustainabilitydata} title="Sustainability" />
     
        <ScreenPageComps data={Heritagedata} title="Heritage" />
     
        <Walks data={Walksdata} />
      
        <CategoriesComps
         
          type="activity-list"
          name=""
          title="Wellbeing"
        />
      
        <ScreenPageComps data={Cocktaildata} title="Out Out" />
    
       <CycleRoutes></CycleRoutes>
    
    
        <ScreenPageComps data={Surfingdata} title="Surfing" />
    

      
        <ScreenPageComps data={topAttractionsdata} title="Top Attractions" />
    

      {post?.length != 0 && (
        <>
          <Blog data={post} title="Jersey Feed" />
        </>
      )}

     
        <LeaveFeedbackButton />
     

   
      
    </>
  );
};
export default DashBoard;
