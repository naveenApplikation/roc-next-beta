import EventAndActivities from "./EventsAndActivities";
import Highlights from "@/app/xmas/XmasComponents/Highlights";
import { StarLogo } from "./StarLogo";
import Shopping from "./Shopping";
import FoodAndDrink from "./FoodAndDrink";
import NewYearEvening from "./NewYearEvening";
import BottomButtonList from "./BottomButtonList";
import { RocLogoIcon } from "../utils/XmasImagePath";
import Image from "next/image";
import Header from "./XmasHeader";

export default function XmasDashboard()
{
    return <>
         <Header></Header>
         <div className="grid grid-cols-1 py-[24px] gap-[16px]">
          
          <Highlights></Highlights>
          <StarLogo></StarLogo>
          <EventAndActivities></EventAndActivities>
          <StarLogo></StarLogo>
          <Shopping></Shopping>
          <StarLogo></StarLogo>
          <FoodAndDrink></FoodAndDrink>
          <StarLogo></StarLogo>
          <NewYearEvening></NewYearEvening>
          <StarLogo></StarLogo>
          <BottomButtonList></BottomButtonList>
          <div className="flex px-[20px] w-full justify-center w-full py-[8px]">
              <Image
              src={RocLogoIcon}
              alt=""
              height={32}
              width={120}
              ></Image>
          </div>
          </div>
    </>
}