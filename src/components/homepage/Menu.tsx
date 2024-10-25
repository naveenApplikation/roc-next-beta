'use client'

import { useMyContext } from "@/app/Context/MyContext";
import Link from "next/link";
import fallback from "../../../assets/images/fallbackimage.png";
import MenuDetails from "../dashboard/MenuDetails";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import CommonButton from "../button/CommonButton";
export default function Menu({data,title}:{data:any,title:any}){
    const { menuClick } = useMyContext();
      return <>
            <MenuDetails
        isOpen={() => menuClick(data?.name, false, data?.id)}
        title={title}
      />
      </>
}

export function BlogMenu()
{
    const router=useRouter()
    const menuClick=()=>{
          router.push('/blog') 
    }
    
    return <>
     <MenuDetails
        isOpen={() => menuClick()}
        title={"Jersey Feed"}
      />
</>
}

export function OpenModal({item,children,url}:{item:any,children:any,url?:any}){
    const { modalClick, menuClick } = useMyContext();
console.log(url)
    if(url)
    {
         return <>
           <div key={item} onClick={()=>{
              modalClick(
                "eventListing",
                item,
                url ? url : fallback
              )
           }}>
         {children}
      </div>
         </>
    }
      return <div key={item} onClick={()=>{modalClick(
        "ModalContent",
        item,
        item?.data_type === "google"
          ? item?.photoUrl
          : item.photoUrl
            ? item.photoUrl
            : fallback
      )}}>
         {children}
      </div>
}

export function UpcomingMenu({data}:{data:any})
{
    const router = useRouter();
    const { modalClick} = useMyContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const placeId = urlParams.get("search");

      if (placeId) {
        const temp = {
          data_type: "google",
          place_id: placeId,
        };

        modalClick("ModalContent", temp, fallback);
      }
    }
  }, [data]);
    const {resetFilters}=useMyContext()
    const navigate = () => {
      resetFilters();
      router.push("/eventCategory/upcoming");
    };
     return <>
      <MenuDetails isOpen={() => navigate()} title="Upcoming Events" />
     </>
}

 

export function OpenEventModal()
{
    const { modalClick,menuClick} = useMyContext();
    const clickOnCreate = () => {
        const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;
        if (loginToken) {
          menuClick("AddToCreate")
        } else {
          modalClick("LoginSignupModal")
        }
      }
    return <>
        <div style={{ padding: "0px 40px" }} onClick={() => clickOnCreate()}>
         <CommonButton text="Create a List" />
       </div>
    </>
}
export function EventMenu({title,menuLink}:{title:any,menuLink:string})
{
      const router=useRouter()
      return <>
       <MenuDetails
        isOpen={()=>{
            router.push(menuLink)
        }}
        title={title}
        hideShowAll={title=="Events By date"}
      />
      </>
}