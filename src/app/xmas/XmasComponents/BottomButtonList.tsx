import Image from "next/image"
import Link from "next/link"
import { calendarImage, dining, foodAndDrink, ShoppingBag } from "../utils/XmasImagePath"
 
export default function BottomButtonList()
{
      return <>
          <div className="grid grid-cols-1  px-[20px] py-[16px]">
                
            <div className="flex flex-row gap-[4px] ">
           {  data.map((item)=>{return <>
            <Link href={`#${item.nav}`} className="px-[12px] py-[16px] w-full text-white rounded-[16px] bg-[#374957] flex flex-col items-center justify-center gap-[4px]"  >
              <Image
              src={item.icon}
              alt=""
              width={14}
              height={16}
              >




              </Image>
              <p className="capitalize text-[13px] font-[500]">{item.title}</p>
       </Link> 
       </>})  }
                  
            </div>
         </div>
      </>
}


const data=[
    {
         icon:calendarImage,
         title:"Events",
         nav:"events"
    },
    {
        icon:ShoppingBag,
        title:"Shopping",
        nav:"shopping"
    },
    {
        icon:foodAndDrink,
        title:"Food",
        nav:"food & drink"
    }
]