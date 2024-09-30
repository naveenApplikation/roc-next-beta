//@ts-nocheck
import { getCategory } from "@/app/action";
import { handleEventEncoding } from "@/app/utils/commanFun";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
import EventPage from "@/components/EventComponets/EventPage";
import HeaderScreen from "@/components/header/HeaderScreen";
import Modal from "@/components/modal/Modal";
import React from "react";
export const maxDuration = 60;
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
  const data = response?.data;

  if (!data) {
    return <p>No events found or failed to load event data.</p>;
  }

  // Render the event page component with the fetched data
  return (
    <>
      <HeaderScreen title={"Events"} />
      <EventPage
        urlData={data}
        urlTitle={title}
        type="eventCategory"
        slug={params.event}
      />
      {/* <AdsBanner className="75px" /> */}
      {/* <BannerModal /> */}
    </>
  );
}
