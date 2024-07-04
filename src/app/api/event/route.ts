
export async function GET(request: Request) {
  
  const data=new URL(request.url)
  const {searchParams}=data
  console.log(searchParams.get('placeId'))
  
  
   const result = await fetch(
     `${process.env.NEXT_API_URL}/google/place/${searchParams.get('placeId')}`,
     {
       headers: {
         "Content-Type": "application/json",
       },
       cache:'force-cache'
     }
   );
  const response=await result.json()
   
  return Response.json(response);
}
 