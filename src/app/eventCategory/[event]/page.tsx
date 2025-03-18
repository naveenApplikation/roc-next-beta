//@ts-nocheck
import { getAds, getAdsByCategory, getCategory, imageOptimization } from "@/app/action";
import { handleEventEncoding } from "@/app/utils/commanFun";
import { getXmasEvents } from "@/app/xmas/XmasAction";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
import EventPage from "@/components/EventComponets/EventPage";
import HeaderScreen from "@/components/header/HeaderScreen";
import Modal from "@/components/modal/Modal";
 
import React from "react";
export const maxDuration = 300;

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const category = await getCategory("event-list");

  const staticGeneration = category.map((item: any) => {
    return {
      event: handleEventEncoding("encode", item.listName),
    };
  });

  // Add "upcoming" as a static path
  staticGeneration.push({ event: "upcoming" });

  return staticGeneration;
}

export default async function Page({ params }: { params: { event: string } }) {
  let response = null;
  let title = null;

  if (params.event === "upcoming") {
    // Fetch upcoming events
    response = await getCategory("upcomming-events?type=limit");
    title = "Upcoming Events";
  } else if (params.event === "xmas-events") {
    response = await getXmasEvents("x-mas-events");
    title = "Xmas Events";
  } else {
    // Fetch event categories
    const category = await getCategory("event-list");
    const itemIndex = category.findIndex(
      (val: any) => val.listName === handleEventEncoding("decode", params.event)
    );

    // If a matching category is found, fetch its events
    if (itemIndex >= 0) {
      response = await getCategory(
        "event-category-list/" + category[itemIndex]._id
      );
      title = category[itemIndex].listName;
    }
  }

  // Extract the event data if available
  const data = response.data ? response.data : response;
  const responseData=await imageOptimization(data)
  if (!data) {
    return <p>No events found or failed to load event data.</p>;
  }
   
      const adsData=await getAds()
      const adsDataByCategory=await getAdsByCategory() as {data:any}
    
      const filterCategoryHaveAds=adsDataByCategory?.data?.find((item)=>{
          return item?.Title==params.event.replace("%20","")
      })
   
      const getFilteredAds=()=>{
          if(!filterCategoryHaveAds)
          {
             return [...adsData.data]
          }
          else
          {
            const arrangingAds:any[]=[]
            filterCategoryHaveAds?.ad_ids.split(',').forEach((rowId)=>{
                adsData.data.forEach((item)=>{
                      if(rowId==item.ad_id)
                      {
                         arrangingAds.push(item)
                      }
                })
           })
               return arrangingAds
          }
      }
     const arrangingAds=getFilteredAds()
  

  // Render the event page component with the fetched data
  return (
    <>
     
      <EventPage
        urlData={responseData}
        urlTitle={title}
        type="eventCategory"
        slug={params.event}
        adsData={arrangingAds}
      />
      {/* <AdsBanner className="75px" /> */}
      {/* <BannerModal /> */}
    </>
  );
}
