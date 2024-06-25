
export async function GET(request: Request) {
  
  const data=new URL(request.url)
  const {searchParams}=data
  console.log(searchParams.get('placeId'))
  
  
   const result = await fetch(
     `https://beta-dot-roc-app-425011.nw.r.appspot.com/google/place/${searchParams.get('placeId')}`,
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
 