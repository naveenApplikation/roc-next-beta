import Image from 'next/image'
import React from 'react'
import ReactIconsTOSvg from '../IconToSvg'
import HomeMenu from './HomeMenu'
import Link from 'next/link'
import { handleEventEncoding } from '@/app/utils/commanFun'

const CategoryList = (
    {data,title,nav}:{data:any,title:string,nav:string}
) => {
 
    const navigate=(item:any):string=>{
           
                if(title.includes("Event"))
                {
                 const encodedName = handleEventEncoding("encode",item.listName);
                 return `/eventCategory/${encodedName}`
                }
                else if(title.includes("Activity"))
                {
                   const encodedName = handleEventEncoding("encode",item.listName);
                    return `/activityCategory/${encodedName}`
                }
                else if(item.listName)
                {
                     return `/Places/${item.listName}/${item._id?item._id:item.categoryId}`
                }
                else{
                     return ""
                }
          }
    

  return <>

   <HomeMenu link={nav}>{title}</HomeMenu>
   <div  className='grid grid-flow-col gap-[8px] px-[40px] max-[800px]:px-[16px] min-h-max overflow-y-hidden no-scrollbar'>

      { ( data || []).map((item,index)=>{return (
        
       
          <Link href={navigate(item)} key={index} style={{background:`${item.bgColor}`}} className={`bg-[${item.bgColor}] w-[80px] cursor-pointer rounded-[8px]  h-[80px] grid grid-flow-row  py-[7px] px-[8px]`}>
                <div className='flex flex-row-reverse'>
                    {item.image.src &&
                 <Image
                src={item.image.src}
                className='w-[16px] h-[16px] max-h-[16px]'
                alt='image'
                width={500}
                height={250}
                ></Image>  ||
               <ReactIconsTOSvg classNames='p-0 w-[30px] h-[20px]' icon={item.image} height='12' width='12'></ReactIconsTOSvg>}
                </div>
                <p   className="text-white text-[12px] font-medium leading-normal p-[0px] flex items-end">{item?.listName}</p>
          </Link>
       
      )
    })
      }
        </div>
  </>
}

export default CategoryList