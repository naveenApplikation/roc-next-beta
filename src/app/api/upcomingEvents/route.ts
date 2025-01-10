import { imageOptimization } from "@/app/action";

export async function GET(request: Request) {
    try
    {
      const data=new URL(request.url)
      const {searchParams}=data
      
      
      const result = await fetch(
         
         `${process.env.NEXT_API_URL}/upcomming-events?type=range&date=${searchParams.get("range")}`,
         {
           headers: {
             "Content-Type": "application/json",
           },
           cache:"no-cache"
         }
       );
      const response=await result.json()
      const optimizedImage=await imageOptimization(response.data) 
      return Response.json(optimizedImage);
    }
    catch(error)
    {
       return Response.json({})
    }
    }