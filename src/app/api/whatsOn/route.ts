export async function GET(request: Request) {
  const data = new URL(request.url);
  const { searchParams } = data;
 
  try
  {
 
  const result = await fetch(
    `${
      process.env.NEXT_API_URL
    }/filter/avtivities-events?query=${searchParams.get('value')}&parish=${searchParams.get('parish')}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-cache",
    }
  );
   if(!result.ok)
   {
      return Response.json([])
   }
  const response = await result.json();
   console.log(response)
  return Response.json(response);
}
 catch(error)
 {
     console.log(error)
     return Response.json([])
 }
}
