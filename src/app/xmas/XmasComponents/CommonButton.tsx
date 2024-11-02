import { ReactElement } from "react";


export default function CommonButton({children}:{children:string})
{
     return <>
          <button className="text-white w-full bg-[#F40035] text-[14px] font-[600] rounded-[8px] px-[16px] py-[12px]" >{children}</button>
     </>
}