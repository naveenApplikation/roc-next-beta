 
import { Suspense } from "react";
import { getCategory } from "../action"
import EventPage from "@/components/EventComponets/EventPage";
export const maxDuration = 300;

async function Page(){
      
      const response=await getCategory('upcomming-events')
      const data=await  response?.data;
      const title=await response?.title
 
      return (
        <>
          <EventPage
             urlData={data}
             urlTitle={title}>
          </EventPage>
        </>
      );
}

export default Page