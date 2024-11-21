import { NextApiResponse } from "next"
import { revalidateTag } from "next/cache"
import { headers } from "next/headers"



export async function POST(request:Request)
{

    
       revalidateTag("highlight")
       
       return Response.json({name:"y"},{
          headers:{
            "Access-Control-Allow-Origin":"*"
          }
       })
}