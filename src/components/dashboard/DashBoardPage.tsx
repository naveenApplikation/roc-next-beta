import React from "react";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import InfoApp from "@/components/homepage/InfoApp";
import LocalCusine from "@/components/homepage/LocalCusine";
import FamilyEvent from "@/components/homepage/FamilyEvent";
import EnjoyTheSunshine from "@/components/homepage/EnjoyTheSunshine";
import TrendingList from "@/components/homepage/TrendingList";
import TopAttractions from "@/components/homepage/TopAttractions";
import Directory from "@/components/homepage/Directory";
import Bars from "@/components/homepage/Bars";
import Shopping from "@/components/homepage/Shopping";
import Community from "@/components/homepage/Community";
import BeachLife from "@/components/homepage/BeachLife";
import Sustainability from "@/components/homepage/Sustainability";
import Heritage from "@/components/homepage/Heritage";
import Walks from "@/components/homepage/Walks";
import Wellbeing from "@/components/homepage/Wellbeing";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import Outout from "@/components/homepage/Outout";
import Surfing from "@/components/homepage/Surfing";
import { iconsHome } from "@/app/utils/homeIcon";
import { shoppingImages } from "@/app/utils/data";
import {
  getCategory,
  getApiWithIcon,
  getData,
  getApiShoppingWithIcon,
} from "@/app/action";
import LeaveFeedbackButton from "@/components/homepage/LeaveFeedbackButton";

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
  const familyEventdata = await getCategory("family-events");
  const EnjoyTheSunshinedata = await getCategory("sun-shine");
  const TopAttractionsdata = await getCategory("google/top-attraction");
  const bardata = await getData("Pubs", listData[0]?._id);

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
  return (
    <>
      <SearchNFilter />
      <InfoApp />
      <LocalCusine data={LocalCusinedata} />
      <FamilyEvent data={familyEventdata} />
      <EnjoyTheSunshine data={EnjoyTheSunshinedata} />
      <TrendingList {...{ listData }} />
      <TopAttractions data={TopAttractionsdata[0]} />
      <Directory />
      <Bars dataPubs={bardata} />
      <Shopping {...{ Shoppingdata }} />
      <BeachLife data={beachLifedata[0]} />
      <Community {...{ listData }} />
      <Sustainability data={sustainabilitydata[0]} />
      <Heritage data={Heritagedata[0]} />
      <Walks data={Walksdata} />
      <Wellbeing data={Wellbeingdata} />
      <Outout data={Cocktaildata[0]} />
      <CycleRoutes />
      <Surfing data={Surfingdata[0]} />
      <LeaveFeedbackButton />
    </>
  );
};
export default DashBoard;
