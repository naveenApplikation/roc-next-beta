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
  const LocalCusinedata = await getCategory("google/dine-out");
  let familyEventdata = await getCategory("events");
  familyEventdata = familyEventdata.data;
  let enjoyTheSunshinedata = await getCategory("sun-shine");
  enjoyTheSunshinedata = enjoyTheSunshinedata.data;
  const TopAttractionsdata = await getCategory("google/top-attraction");
  const bardata = await getDataForHome("Pubs", listData[0]?._id);

  const beachLifedata = await getCategory("google/beach-life");
  const sustainabilitydata = await getCategory("google/sustainability");
  const Heritagedata = await getCategory("google/heritage");
  const Walksdata = await getCategory("walks");
  const Wellbeingdata = await getCategory("wellbeing-lists");
  const Cocktaildata = await getCategory("google/cocktail-bars");
  const Surfingdata = await getCategory("google/surfing");
  const Shoppingdata = await getApiShoppingWithIcon(
    "shopping-lists",
    shoppingImages
  );
  const eventsCategories = await getApiWithIcon("event-list", iconsHome);
  const activities = await getApiWithIcon("activity-list", iconsHome);
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
      <ScreenPageComps data={beachLifedata[0]} title="Beach life " />
      {/* <TopAttractions data={TopAttractionsdata[0]} /> */}
      <Directory />
      {/* <Bars dataPubs={bardata} /> */}/
      <ScreenPageComps data={bardata} title="Pubs" />
      <Shopping {...{ Shoppingdata }} />
      <CategoriesComps
        data={eventsCategories}
        type="event-list"
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
      <ScreenPageComps data={sustainabilitydata[0]} title="Sustainability" />
      {/* <Heritage data={Heritagedata[0]} /> */}
      <ScreenPageComps data={Heritagedata[0]} title="Heritage" />
      <Walks data={Walksdata} />
      <Wellbeing data={Wellbeingdata} />
      {/* <Outout data={Cocktaildata[0]} /> */}
      <ScreenPageComps data={Cocktaildata[0]} title="Out Out" />
      <CycleRoutes />
      {/* <Surfing data={Surfingdata[0]} /> */}
      <ScreenPageComps data={Surfingdata[0]} title="Surfing" />
      <ScreenPageComps data={TopAttractionsdata[0]} title="Top Attractions" />
      <LeaveFeedbackButton />
      <CustomBanner />
    </>
  );
};
export default DashBoard;
