
export async function GET(request: Request) {
  try
  {
    const data=new URL(request.url)
    const {searchParams}=data
    
    
    const result = await fetch(
       
       `${process.env.NEXT_API_URL}/manual-place/${searchParams.get('id')}`,
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
  catch(error)
  {
     return Response.json({})
  }
  }
   