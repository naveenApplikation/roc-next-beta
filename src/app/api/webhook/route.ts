import { NextApiResponse } from "next"
import { revalidateTag } from "next/cache"
import { headers } from "next/headers"



export async function POST(request:Request)
{

       const {searchParams}=new URL(request.url)
       const type=searchParams.get("type") as string
       console.log(type)
       revalidateTag(type)
       
       return Response.json({status:"success"},{
          headers:{
            "Access-Control-Allow-Origin":"*"
          }
       })
}