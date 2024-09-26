import React from "react";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import InfoApp from "@/components/homepage/InfoApp";
import FamilyEvent from "@/components/homepage/FamilyEvent";
import EnjoyTheSunshine from "@/components/homepage/EnjoyTheSunshine";
import TrendingList from "@/components/homepage/TrendingList";
import Directory from "@/components/homepage/Directory";
import Shopping from "@/components/homepage/Shopping";
import Community from "@/components/homepage/Community";
import Walks from "@/components/homepage/Walks";
import Wellbeing from "@/components/homepage/Wellbeing";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import { iconsHome } from "@/app/utils/homeIcon";
import { shoppingImages } from "@/app/utils/data";
import "@/app/tailwind.css";
import {
  getCategory,
  getApiWithIcon,
  getApiShoppingWithIcon,
  getDataForHome,
} from "@/app/action";
import LeaveFeedbackButton from "@/components/homepage/LeaveFeedbackButton";
import ScreenPageComps from "../homepage/ScreenPageComps";
import CustomBanner from "../AdComponent/CustomBanner";
import CategoriesComps from "../homepage/CategoriesComps";
import EventsByDate from "../homepage/EventsByDate";
import { getUpcoming } from "@/app/HomePageAction";
import { getClient, getAllPosts } from "@/lib/sanity.client";
import Blog from "../homepage/Blog";

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
  let familyEventdata = await getUpcoming("upcomming-events");
  familyEventdata = await familyEventdata.data.slice(0, 10);
  let enjoyTheSunshinedata = await getCategory("sun-shine");
  enjoyTheSunshinedata = await enjoyTheSunshinedata.data;
  let topAttractionsdata = await getCategory("google/top-attraction");
  topAttractionsdata = {
    name: topAttractionsdata[0]?.listName,
    id: topAttractionsdata[0]?._id,
    listData: topAttractionsdata[0]?.GoogleHomeScreenList?.slice(0, 10),
  };
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
  let Wellbeingdata = await getCategory("wellbeing-lists");

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
  const Shoppingdata = await getApiShoppingWithIcon(
    "shopping-lists",
    shoppingImages
  );
  const eventsCategories = await getApiWithIcon("event-list", iconsHome);
  const activities = await getApiWithIcon("activity-list", iconsHome);
  const client = getClient();
  const post = await getAllPosts(client);

  return (
    <>
      <SearchNFilter />
      <InfoApp />
      {/* <LocalCusine data={LocalCusinedata} /> */}
      <FamilyEvent data={familyEventdata} />
      <TrendingList {...{ listData }} />
      <ScreenPageComps data={LocalCusinedata} title="Dine Out" />
      <EnjoyTheSunshine data={enjoyTheSunshinedata} />
      <EventsByDate></EventsByDate>
      <ScreenPageComps data={beachLifedata} title="Beach life " />
      {/* <TopAttractions data={TopAttractionsdata[0]} /> */}
      <Directory />
      {/* <Bars dataPubs={bardata} /> */}/
      <ScreenPageComps data={bardata} title="Pubs" />
      <Shopping {...{ Shoppingdata }} />
      <CategoriesComps
        data={eventsCategories}
        type="event-category-list"
        name="Event List"
        title="Event Categories"
      />
      <CategoriesComps
        data={activities}
        type="activity-list"
        name="Activity List"
        title="Activity Categories"
      />
      {/* <BeachLife data={beachLifedata[0]} /> */}
      <Community {...{ listData }} />
      {/* <Sustainability data={sustainabilitydata[0]} /> */}
      <ScreenPageComps data={sustainabilitydata} title="Sustainability" />
      {/* <Heritage data={Heritagedata[0]} /> */}
      <ScreenPageComps data={Heritagedata} title="Heritage" />
      <Walks data={Walksdata} />
      <Wellbeing data={Wellbeingdata} />
      {/* <Outout data={Cocktaildata[0]} /> */}
      <ScreenPageComps data={Cocktaildata} title="Out Out" />
      <CycleRoutes />
      {/* <Surfing data={Surfingdata[0]} /> */}
      <ScreenPageComps data={Surfingdata} title="Surfing" />
      <ScreenPageComps data={topAttractionsdata} title="Top Attractions" />
      {post?.length != 0 && <Blog data={post} title={"Jersey Feed"}></Blog>}
      <LeaveFeedbackButton />
      <CustomBanner />
    </>
  );
};
export default DashBoard;
