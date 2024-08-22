import { getCategory } from '@/app/action';

import EventPage from '@/components/EventComponets/EventPage'
import React from 'react'
export const dynamic = 'force-static'
export default async function page({params}:{params:{event:string}}){
    let response
         if(params.event=='upcoming')
            {
     response = await getCategory("upcomming-events"); 
            } 
            else
            {
          response = await getCategory("event-category-list/"+params.event);
                }
         const data = response?.data;
         const title = response?.title;
  return <>
          <EventPage
             urlData={data}
             urlTitle={title}>
          </EventPage>
  </>
}

export async function generateStaticParams(){
   
     const category =await getCategory("event-list");
     
      const staticGeneration=category.map((item:any)=>{
        return {
            event:item._id
        }
      }
      )
      
      staticGeneration.push({event:"upcoming"})
      console.log(staticGeneration)
      return staticGeneration;
}