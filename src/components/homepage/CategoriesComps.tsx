 

import React from "react";

import Image from "next/image";
import { handleEventEncoding } from "@/app/utils/commanFun";
import Link from "next/link";
import { wellbeingImg } from "@/app/utils/ImagePath";
import { EventMenu, OpenEventModal } from "./Menu";
import { getCategory, getApiShoppingWithIcon, getApiWithIcon } from "@/app/action";
import { cycleRouteData, shoppingImages } from "@/app/utils/data";
import { eventsByDate, iconsHome } from "@/app/utils/homeIcon";
 
interface DashboardProps {
  data?: any;
  type: string;
  name: string;
  title: string;
}

const CategoriesComps: React.FC<DashboardProps> = async({
  data,
  name,
  type,
  title,
}) => {
  
  let currentLink:any
  let getLink:any=()=>{
     return "/"
  }
  let menuLink:any=()=>{
      return "/"
  }
  
  const getEventLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/eventCategory/${encodedName}`;

  };

  const getCategoryLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/activityCategory/${encodedName}`;
  };
  // console.log(data)
  let datas:any
  switch(title)
  {
    
    case "Wellbeing":
      console.log(title)
         datas=await getCategory("wellbeing-lists")
         console.log("yes")
         getLink=(item:any)=>{
             return `/screens/${item.listName}?categoryID=${item.categoryId}`
         }
         
            currentLink= `/categories/Wellbeing?search=wellbeing-lists`
      
         
         break;
    case "Shopping":
         datas=await getApiShoppingWithIcon(
          "shopping-lists",
          shoppingImages
        );
        getLink=(item:any)=>{
          return `/screens/${item.listName}?categoryID=${item.categoryId}`
      }
      
         currentLink= `/categories/Shopping?search=shopping-lists`
   
        break;
    case "Event Categories":
        datas=await getApiWithIcon("event-list", iconsHome)
        getLink=(item:any) => {
          const encodedName = handleEventEncoding("encode",item.listName);
          return `/eventCategory/${encodedName}`;
        };
       
            currentLink= '/eventCategory'
       
        break;
    case "Activity Categories":
        datas=await getApiWithIcon("activity-list", iconsHome)
        getLink=(item:any) => {
          const encodedName = handleEventEncoding("encode", item.listName);
          return `/activityCategory/${encodedName}`;
        };
        
              currentLink= '/activityCategory'
        
        break;
    case "Community":
        datas = await getApiWithIcon("category", iconsHome)
      getLink=(item:any)=>{
          return `/screens/${item.listName}?categoryID=${item._id}`
      }
      
            currentLink= '/categories/Community?search=category-item'
      
        break;
    case "Trending Lists":
        datas = await getApiWithIcon("category", iconsHome)
        getLink=(item:any)=>{
          return `/screens/${item.listName}?categoryID=${item._id}`
      }
      
        currentLink='/categories/Trending%20Lists?search=category-item'
 
        break;
    case "Events By date":
       datas=eventsByDate  
       getLink=(item: any) => {
        return `/eventByDate/${handleEventEncoding("encode", item.listName)}`;
      };
       
       break;
    default: 
        datas=[]

  }

   console.log(title,datas.length,currentLink)
  
  
  return (
    <>
       <EventMenu title={title} menuLink={currentLink} ></EventMenu>
      <div className="flex overflow-y-hidden gap-x-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        {  datas.length
            ? datas.map((item: any, index: any) => {
              
                return (
                  <Link
                    key={index}
                    href={
                        getLink(item)
                    }>
                    <div
                      className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                      style={{ background: item?.bgColor, cursor: "pointer" }}>
                      { title=='Shopping' || title.includes('Cycle') ? <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                      <Image
                        src={item?.image}
                        alt={""}
                       
                        
                      />
                    </p> : title=="Wellbeing" ? <p style={{ textAlign: "right" }}>
                      <Image
                        src={wellbeingImg}
                        alt=""
                        height={16}
                        width={16}
                        loading="lazy"
                      />
                    </p> : 
                        <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                      
                          {item?.image}
                  
                        </p>
                    
                      
                      }
                      <p
                        className="text-white text-[12px] font-medium leading-normal w-full"
                        style={{ paddingBottom: "5px" }}>
                        {item?.listName}
                      </p>
                    </div>
                  </Link>
                );
              })
            : ""}
      </div>
      {
         title=='Trending Lists' &&  <OpenEventModal ></OpenEventModal>
      }
    </>
  );
};

export default CategoriesComps;
