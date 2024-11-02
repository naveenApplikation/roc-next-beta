import Image from "next/image"
import Link from "next/link"
const HighLightButton=({title,icon}:{title:string,icon:any})=>{
    return <>
       
       <Link className="px-[12px] py-[8px] w-full text-white rounded-[16px] bg-[#F40035] flex flex-col items-center justify-center gap-[4px]" href={""} >
              <Image
              src={icon}
              alt=""
              width={14}
              height={16}
              
              >




              </Image>
              <p className="capitalize text-[13px] font-[500]">{title}</p>
       </Link>

 
    
    </>
}


export default HighLightButton