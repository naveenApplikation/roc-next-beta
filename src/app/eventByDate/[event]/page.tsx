import { getAds, getAdsByCategory, getCategory, imageOptimization } from "@/app/action";
import { handleEventEncoding } from "@/app/utils/commanFun";
import { eventsByDate } from "@/app/utils/homeIcon";
import EventPage from "@/components/EventComponets/EventPage";
import HeaderScreen from "@/components/header/HeaderScreen";
import React from "react";
export const maxDuration = 300;

// This enables dynamic path generation using generateStaticParams
export async function generateStaticParams() {
  return eventsByDate.map((item: any) => ({
    event: handleEventEncoding("encode", item.name),
  }));
}

export default async function Page({ params }: { params: { event: string } }) {
  const decodedEvent = handleEventEncoding("decode", params.event);
  const itemIndex = eventsByDate.findIndex(
    (val: any) => val.name === decodedEvent
  );

  let response:any = null;
  let title = "";

  if (itemIndex >= 0) {
    try {
      // Use fetch with the revalidate option for ISR
      response = await getCategory(
        `filter-events-day?query=${eventsByDate[itemIndex].name.toLowerCase()}`
      );
      response=await imageOptimization(response)
      title = eventsByDate[itemIndex].name;
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  }

  if (!response) {
    // console.log("testing for error", itemIndex, decodedEvent);
    return <p>Event not found or failed to load event data.</p>;
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
    

  return (
    <div>
      
      <EventPage
        urlData={response}
        urlTitle={title}
        adsData={arrangingAds}
        type="eventByDate"
        slug={params.event}
      />
    </div>
  );
}
