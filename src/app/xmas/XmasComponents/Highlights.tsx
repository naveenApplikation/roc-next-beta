import HighLightButton from "./HighLightButton"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { calendarImage, foodAndDrink, GenuineJersy, HighlightsShopping, LightsImage, SantaImage, ShoppingBag } from "@/app/xmas/utils/XmasImagePath"
import { getHighlights } from "../XmasAction"
import RenderHighLights from "./HighlightSection"
const data:{content:string,image:StaticImageData,date:string}[]=[{
    content:"Christmas Lights Switch On and Parade",
    date:"Thu 14th Nov",
    image:LightsImage

},
{
    content:"Genuine Jersey Simply Christmas Market",
    date:"28 Nov - 8 Dec",
    image:GenuineJersy
},
{
    content:"Christmas Shopping Opening Times",
    date:"",
    image:HighlightsShopping
},
{
   content:"Santa’s Grotto Locations",
   date:"",
   image:SantaImage
}

]
export default async function HighLights(){
    const highlightData:any=await getHighlights()
   
     
      return <>
         <div className="grid grid-cols-1 px-[20px] gap-[16px]">
             
               <div className="flex flex-row gap-[4px] ">
                 
                    <HighLightButton title="Events" icon={calendarImage}></HighLightButton>
                    <HighLightButton title="Shopping" icon={ShoppingBag}></HighLightButton>
                    <HighLightButton title="Food & Drink" icon={foodAndDrink}></HighLightButton>
               </div>
               <div  className="grid grid-cols-1 py-[24px] gap-[16px]">

                    <div className="">
                        <h1 className="text-[#F40035] text-[32px] font-[900] ">Highlights</h1>
                    </div>
                    <div className="grid grid-cols-2 justify-between gap-[18px]">
                    <RenderHighLights data={highlightData}></RenderHighLights>
                    </div>
               </div>
          
         </div>
      </>

}

 


