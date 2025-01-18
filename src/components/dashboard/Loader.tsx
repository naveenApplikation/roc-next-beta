import "@/app/tailwind.css"
import Loader from "../../../assets/loader.svg"
import Image from 'next/image'
export default function Loading()
{ 
      console.log("loaded")
      return <>
            <div  className="flex fixed inset-0  h-screen  min-[800px]:hidden bg-white z-[4]"></div>
            <div className="fixed h-screen inset-0 min-[800px]:hidden  flex items-center z-[4] justify-center">
                  
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