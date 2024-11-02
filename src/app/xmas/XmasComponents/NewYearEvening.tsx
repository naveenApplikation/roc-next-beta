import { NewYearEveningImage } from "../utils/XmasImagePath";
import XmasEvent from "./Event";
import ImageLayout from "./ImageLayout";
import Places from "./Places";

export default function NewYearEvening()
{
    return <>
        <div className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">Food & Drink</h1>
                </div>
                <div>
                    <p className="text-[16px]  leading-[20px] text-gray-400 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div>
                <ImageLayout image={NewYearEveningImage}>
                New Years Eve Bohemia 2024
                </ImageLayout>
                <XmasEvent title="Events"></XmasEvent>
                <Places title="Bars & Nightlife"></Places>
                 
         </div>
    </>
}