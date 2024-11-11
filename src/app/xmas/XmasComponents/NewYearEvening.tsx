import { getDataForHome } from "@/app/action";
import { NewYearEveningImage } from "../utils/XmasImagePath";
import { getFoodandDrinks, getXmasEvents } from "../XmasAction";
import XmasEvent from "./Event";
import ImageLayout from "./ImageLayout";
import Places from "./Places";

export default async function NewYearEvening({ads}:{ads:any})
{

    const xmasEvents:any[]=await getXmasEvents("x-mas-events?limit=true") as any
    let bardata = await getDataForHome("Pubs","663f68c30c44bd6c026b0fc2");
  bardata = {
    name: bardata?.listName,
    id: bardata?._id,
    listData: bardata?.categoryList.slice(0, 10),
  };
  console.log(bardata.listData)
  
    return <>
        <div className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">New Year’s Eve</h1>
                </div>
                {/* <div>
                    <p className="text-[16px]  leading-[20px] text-gray-400 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div> */}
                <ImageLayout data={ads}>
                       {ads.title}
                </ImageLayout>
                <XmasEvent nav={"/eventCategory/xmas-events"} data={xmasEvents.slice(0,10)} title="Events"></XmasEvent>
                <Places nav="screens/Pubs?categoryID=663f68c30c44bd6c026b0fc2"   data={bardata.listData} title="Bars & Nightlife"></Places>
                 
         </div>
    </>
}