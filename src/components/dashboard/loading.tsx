
import "@/app/tailwind.css"
import { Loader } from "@/app/utils/ImagePath"
import Image from 'next/image'
export default function Loading()
{ 
      console.log("loaded")
      return <>
            <div  className="absolute inset-0 opacity-30 bg-black"></div>
            <div className="absolute  inset-x-0 top-10  flex items-center justify-center">
                  
                  <Image
                   className='animate-spin'
                  src={Loader}
                  height={50}
                  width={50}
                  alt=''
                  />
 
            </div>

      </>
}