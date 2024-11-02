
import Image from "next/image"
import { RedArrow } from "../utils/XmasImagePath"
const ListingItems=({data}:{data:any[]})=>{
    return <>
    <div className="py-[16px] px-[24px] bg-[#F5F5F5] rounded-[16px]">
    {data.map((item:any,index)=>{
    return <div  key={index} className={`flex justify-between h-[48px] items-center  border border-x-0 border-t-0 ${index==data.length-1?"border-0":"border-b-gray-300"} `} >
     <div className="relative border-none flex items-center grow gap-[16px] py-[12px]">
      <Image
       alt="icon"
       width={20}
       height={24}
       src={item.image}

      ></Image>

     <p className="absolute text-[18px] left-[50px] font-[400]">{item.content}</p>

    </div>
    <Image
                  height={10}
                  width={8}
                  src={RedArrow}
                  alt=""
                  
                  >
                  </Image>
    </div>

    })
 }
 </div>
    </>
 
}

export default ListingItems