
const SearchNFilter = dynamic(() => import('@/components/homepage/SearchNFilter'), { ssr: false });
const InfoApp = dynamic(() => import('@/components/homepage/InfoApp'), { ssr: false });
const FamilyEvent = dynamic(() => import('@/components/homepage/FamilyEvent'), { ssr: false });
const LeaveFeedbackButton = dynamic(() => import('@/components/homepage/LeaveFeedbackButton'), { ssr: false });
import { getCategory, getApiWithIcon, getDataForHome } from "@/app/action";
import { iconsHome } from "@/app/utils/homeIcon";
import { getClient, getAllPosts } from "@/lib/sanity.client";
import Blog from "../homepage/Blog";
import CategoriesComps from "../homepage/CategoriesComps";
import EnjoyTheSunshine from "../homepage/EnjoyTheSunshine";
import ScreenPageComps from "../homepage/ScreenPageComps";
 
import Walks from "../homepage/Walks";
 
import dynamic from "next/dynamic";
import Directory from "../homepage/Directory";
import BottomSheetComp from "./BottomSheet";
import BottomSheet from "./BottomSheet";
import InfiniteScrollList from "./InfinitieList";


export default async function HomeComponents()
{
       
  let familyEventdata = await getCategory("upcomming-events?type=limit");
  familyEventdata = await familyEventdata.data.slice(0, 10);
  let LocalCusinedata = await getCategory("google/dine-out");

  LocalCusinedata = {
    name: LocalCusinedata?.listName,
    id: LocalCusinedata?._id,
    listData: LocalCusinedata.GoogleHomeScreenList.slice(0, 10),
  };
  let enjoyTheSunshinedata = await getCategory("sun-shine");
  enjoyTheSunshinedata = await enjoyTheSunshinedata.data;
  let beachLifedata = await getCategory("google/beach-life");
  beachLifedata = {
    name: beachLifedata[0]?.listName,
    id: beachLifedata[0]?._id,
    listData: beachLifedata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };
  const listData = await getApiWithIcon("category", iconsHome);
  let bardata = await getDataForHome("Pubs", listData[0]?._id);
  bardata = {
    name: bardata?.listName,
    id: bardata?._id,
    listData: bardata?.categoryList.slice(0, 10),
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

  const components=[
  <SearchNFilter key="1"></SearchNFilter>,
  <InfoApp key="info" />,
  <FamilyEvent key="family" data={familyEventdata} />,
  <CategoriesComps
    key={"trending list"}
    data={[]}
    type="activity-list"
    name=""
    title="Trending Lists"
  />,
  <ScreenPageComps key="dine out" data={LocalCusinedata} title="Dine Out" />, <EnjoyTheSunshine key={"sunshine"} data={enjoyTheSunshinedata} /> ,
  <CategoriesComps
  key={"events by date"}              
     data={[]}
     type="activity-list"
     name=""
     title="Events By date"
   />,
   <ScreenPageComps key="beach life" data={beachLifedata} title="Beach life" />,
   <Directory key={"directory"} />,
   <ScreenPageComps key={"pubs"} data={bardata} title="Pubs" />
   ,<CategoriesComps
   key="shopping"
   data={[] as any[]}
   type="shopping"
   name=""
   title="Shopping"
 />,
 <CategoriesComps
 key={"event"}
 data={[]}
 type="event-category-list"
 name="list"
 title="Event Categories"
/>,
<CategoriesComps
    key="activity"
     data={[]}
     type="activity-list"
     name="list"
     title="Activity Categories"
   />,
   <CategoriesComps
   key={"community"}
   data={[]}
   type="activity-list"
   name=""
   title="Community"
 />,
 <ScreenPageComps key="sustainability" data={sustainabilitydata} title="Sustainability" />,
 <ScreenPageComps key="heritage" data={Heritagedata} title="Heritage" />,
 <Walks key={"walks"} data={Walksdata} />,
 <CategoriesComps
 key="weelbeing"
 data={[]}
 type="activity-list"
 name=""
 title="Wellbeing"
/>,
<ScreenPageComps key={"dine out"} data={Cocktaildata} title="Out Out" />,
<CategoriesComps
key="cylce"
data={[]}
type="activity-list"
name=""
title="Cycle Routes"
/>,

<ScreenPageComps key="surfing" data={Surfingdata} title="Surfing" />,
<ScreenPageComps key="attraction" data={topAttractionsdata} title="Top Attractions" />,
  
 <Blog data={post} key="blog" title="Jersey Feed" />,
  
 <LeaveFeedbackButton key="feedback" />



]

 return <>
   <InfiniteScrollList items={components}></InfiniteScrollList>
 </>
}