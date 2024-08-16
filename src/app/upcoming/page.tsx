 
import { Suspense } from "react";
import { getCategory } from "../action"
import EventPage from "@/components/EventComponets/EventPage";
 

async function Page(){
      
      const response=await getCategory('upcomming-events')
      const data=response.data;
      const title=response.title
 
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