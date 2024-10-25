'use client'
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "../dashboard/MenuDetails";
import fallback from '../../../assets/images/fallbackimage.png'
import { Children } from "react";
 
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
 
import "react-loading-skeleton/dist/skeleton.css";
export default function Menu()
{
    const { modalClick, menuClick } = useMyContext();
     return <>
       <MenuDetails
        isOpen={() => menuClick("Enjoy the sunshine", true, "sun-shine")}
        title="Enjoy the sunshine"
      />
     </>
}

export function OpenModal({item,url,children}:{item:any,url:any,children:any})
{
    const { modalClick, menuClick } = useMyContext();

         return <>
           <div key={item} onClick={()=>{
              modalClick(
                "activities",
                item,
                url ? url : fallback
              )
           }}>
            {children}
            </div>
      </>
}

export function WalksAndCycleModel({item,children}:{item:any,children:any})
{
    const { modalClick } = useMyContext();
    return <>
       <div onClick={() => modalClick("walksModal", item)}>
          {children}
       </div>
    </>
}
 
 