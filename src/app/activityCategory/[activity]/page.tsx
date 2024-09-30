//@ts-nocheck
import { getCategory } from "@/app/action";
import { handleEventEncoding } from "@/app/utils/commanFun";
import ActivityPage from "@/components/ActivityComponents/ActivityPage";
import AdsBanner from "@/components/adsBanner/page";
import EventPage from "@/components/EventComponets/EventPage";
import HeaderScreen from "@/components/header/HeaderScreen";
import React from "react";
export const maxDuration = 60;
// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const category = await getCategory("activity-list");

  const staticGeneration = category.map((item: any) => {
    return {
      activity: handleEventEncoding("encode", item.listName),
    };
  });

  staticGeneration.push({
    activity: "all-activities",
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

  if (params.activity == "all-activities") {
    response = await getCategory("activity");
    title = "All Activities";
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

  // Render the event page component with the fetched data
  return (
    <>
      <HeaderScreen title={"Activity"} />
      <ActivityPage
        urlData={data}
        urlTitle={title}
        type="activityCategory"
        slug={params.activity}
        bookmarkState={true}
      />
    </>
  );
}
