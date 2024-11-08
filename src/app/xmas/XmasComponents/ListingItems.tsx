'use client'
import Image from "next/image"
import { RedArrow } from "../utils/XmasImagePath"
import dynamic from "next/dynamic"
import { useRouter } from "next-nprogress-bar"
import { handleEventEncoding } from "@/app/utils/commanFun"
const DynamicIcon=dynamic(()=>import("./IconComponent"))
const ListingItems=({data,title}:{data:any[],title:string})=>{
    

    const router=useRouter()
    const navigate=(item:any)=>{
          if(title=="food")
          {
               router.push(`/screens/${item.category.listName}?categoryID=${item.category._id}`)
          }
          else if(title=="shopping")
          {
            router.push(`/screens/${item.title}?categoryID=${item.categoryId}`)
          }
          else
          {
            router.push('/eventCategory/'+handleEventEncoding("encode", item?.listName))
          }
    }
    return <>
    <div className="py-[16px] px-[24px] bg-[#F5F5F5] rounded-[16px]">
    {data.map((item:any,index)=>{
    return <div  key={index} className={`flex justify-between h-[48px] items-center  border border-x-0 border-t-0 ${index==data.length-1?"border-0":"border-b-gray-300"} `} >
     <div className="relative border-none flex items-center grow gap-[16px] py-[12px]">
       <DynamicIcon  iconName={item?.xMasIcon?item.xMasIcon:item.icon} library={item?.iconPackage}></DynamicIcon>

     <p className="absolute text-[18px] left-[50px] font-[400]">{item?.listName?item.listName:item.title}</p>

    </div>
    <Image
                  height={10}
                  width={8}
                  src={RedArrow}
                  alt=""
                  onClick={()=>{navigate(item)}}
                  className="cursor-pointer"
                  >
                  </Image>
    </div>

    })
 }
 </div>
    </>
 
}

export default ListingItems