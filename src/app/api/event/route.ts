
export async function GET(request: Request) {
  
  const data=new URL(request.url)
  const {searchParams}=data
  console.log(searchParams.get('placeId'))
  // async (data: any) => {
  //   if (data?.data_type === "google") {
  //     try {
  //       const result = await Instance.get(`place/${data?.place_id}`);
  //       if (result?.status === 200) {
  //         return result?.data;
  //       }
  //     } catch (error) {}
  //   } else {
  //     return data;
  //   }
  // };
  
   const result = await fetch(
     `https://beta-dot-roc-app-425011.nw.r.appspot.com/place/${searchParams.get('placeId')}`,
     {
       headers: {
         "Content-Type": "application/json",
       },
       cache:'force-cache'
     }
   );
  const product=await result.json()
   
  return Response.json(product);
}
const params = [{ params:"ChIJ_dz9laBSDEgRgQZiqZM_nyI" }];


export async function generateStaticParams() {
  return params.map((item) => {
    return { eventName: item.params };
  });
}