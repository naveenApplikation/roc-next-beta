
import EventAndActivities from "./EventsAndActivities";
import Highlights from "@/app/xmas/XmasComponents/Highlights";
import { StarLogo } from "./StarLogo";
import Shopping from "./Shopping";
import FoodAndDrink from "./FoodAndDrink";
import NewYearEvening from "./NewYearEvening";
import BottomButtonList from "./BottomButtonList";
import { LogoIcon, RocLogoIcon } from "../utils/XmasImagePath";
import Image from "next/image";
import Header from "./XmasHeader";
import { getAds, getHighlights } from "../XmasAction";

export default async function XmasDashboard()
{


     const ads=await getAds()
 
    return <>
         <Header></Header>
         <div className="grid grid-cols-1 py-[24px] gap-[16px]">
          
          <Highlights></Highlights>
          <StarLogo></StarLogo>
          <EventAndActivities ads={ads[0]}></EventAndActivities>
          <StarLogo></StarLogo>
          <Shopping ads={ads[1]}></Shopping>
          <StarLogo></StarLogo>
          <FoodAndDrink ads={ads[2]}></FoodAndDrink>
          <StarLogo></StarLogo>
          <NewYearEvening ads={ads[3]}></NewYearEvening>
          <StarLogo></StarLogo>
          <BottomButtonList></BottomButtonList>
          <div className="flex px-[20px] w-full justify-center w-full py-[8px]">
              <Image
              src={LogoIcon}
              alt=""
              height={32}
              width={120}
              ></Image>
          </div>
          </div>
    </>
}