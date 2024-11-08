 
export async function GET(request: Request) {

    const params=new URL(request.url)
    const {searchParams}=params

    const result = await fetch(`${process.env.NEXT_API_URL}/highlight`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });
    const response = await result.json();
    const filter=response.filter((item)=>{
           return item.title==searchParams.get('title')
    })
  
    return Response.json({data:filter[0]});
  }
  