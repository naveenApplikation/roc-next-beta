import HighLightButton from "./HighLightButton"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { calendarImage, foodAndDrink, GenuineJersy, HighlightsShopping, LightsImage, SantaImage, ShoppingBag } from "@/app/xmas/utils/XmasImagePath"
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
const HighLights=()=>{
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
                    <RenderHighLights data={data}></RenderHighLights>
                    </div>
               </div>
          
         </div>
      </>

}

export default HighLights


const RenderHighLights=({data}:{data:{content:string,date:string,image:StaticImageData}[]})=>{
    console.log(data.length)
      return data.map((item:any)=>{
             return <>
                
                          <div className="relative h-[150px] w-full rounded-[16px]">
                          <Image 
                                src={item.image}
                                alt=""
                                height={500}
                                width={500}
                                objectFit="cover"
                                className="h-full w-full rounded-[16px]"   
                              >

                              </Image>
                         {item.date &&     <div className="w-max absolute top-2 rounded-[16px] py-[5px] px-[12px] left-2 bg-[#F40035]">
                               <p className="text-white font-[500] text-[14px] overflow-hidden text-ellipsis line-clamp-2">{item.date}</p>
                          </div>}
                          {/* <div className="w-full absolute bottom-[42px] h-[25px] w-full backdrop-blur-[30px] backdrop-brightness-[0.5] border-none opacity-[0.3]  "></div> */}
                          <div style={{ boxShadow: '0px -30px 20px rgba(0,0,0, 0.5)' }} className="h-[48px] overflow-hidden truncate box-border w-full backdrop-blur-[40px]  border-0 flex backdrop-brightness-[1] items-end  absolute bottom-[0px] px-[12px] pb-[5px] pt-[5px]  rounded-b-[16px] ">
                            <p className="text-white text-[12px] font-[600] text-wrap overflow-hidden text-ellipsis line-clamp-2">{item.content}</p>
                          </div>
                          </div>
                          
                         
                  
             </>
      })
}