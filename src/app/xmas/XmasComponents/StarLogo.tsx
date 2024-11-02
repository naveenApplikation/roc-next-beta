
import Image from "next/image"
import { starImage } from "../utils/XmasImagePath"
export const StarLogo=()=>{
      return <div>

        <Image 
         src={starImage}
         height={56}

         alt=""
         objectFit="cover"
         className="w-full"
        />


      </div>
}