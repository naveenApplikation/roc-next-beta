export async function GET(request: Request) {
  const data = new URL(request.url);
  const { searchParams } = data;
 
 
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

  const response = await result.json();
   
  return Response.json(response);
}
