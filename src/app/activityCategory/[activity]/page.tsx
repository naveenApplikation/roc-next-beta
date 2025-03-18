//@ts-nocheck
import { getAds, getAdsByCategory, getCategory } from "@/app/action";
import { handleEventEncoding } from "@/app/utils/commanFun";
import ActivityPage from "@/components/ActivityComponents/ActivityPage";
import AdsBanner from "@/components/adsBanner/page";
import EventPage from "@/components/EventComponets/EventPage";
import HeaderScreen from "@/components/header/HeaderScreen";
import React from "react";
export const maxDuration = 300;
// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const category = await getCategory("activity-list");

  const staticGeneration = category.map((item: any) => {
    return {
      activity: handleEventEncoding("encode", item.listName),
    };
  });

  staticGeneration.push({
    activity: "activity",  
  },{
    actvity:"Enjoy the sunshine",
  });

  return staticGeneration;
}

export default async function Page({
  params,
}: {
  params: { activity: string };
}) {
  let response = null;
  let title = null;

  // Fetch event categories
  let others=[{name:"Enjoy the sunshine",param:"sun-shine"},{name:"All Activities",param:"activity"}].find((elem)=>{
      return params.activity.toLowerCase().replaceAll("%20", " ")==elem.name.toLowerCase()
  })

  if (others) {
    response = await getCategory(others.param);
    title =others.name;
  } else {
    const category = await getCategory("activity-list");
    const itemIndex = category.findIndex(
      (val: any) =>
        val.listName === handleEventEncoding("decode", params.activity)
    );

    // If a matching category is found, fetch its events
    if (itemIndex >= 0) {
      response = await getCategory("activity-list/" + category[itemIndex]._id);
      title = category[itemIndex].listName;
    }
  }

  // Extract the event data if available
  const data = response?.data;

  if (!data) {
    return <p>No Activity found or failed to load event data.</p>;
  }
  
        const adsData=await getAds()
        const adsDataByCategory=await getAdsByCategory() as {data:any}
      
        const filterCategoryHaveAds=adsDataByCategory?.data?.find((item)=>{
            return item?.Title==params.activity.replace("%20","")
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
      {/* <HeaderScreen title={"Activity"} /> */}
      <ActivityPage
        urlData={data}
        urlTitle={title}
        adsData={arrangingAds}
        type="activityCategory"
        slug={params.activity}
        bookmarkState={true}
      />
    </>
  );
}
