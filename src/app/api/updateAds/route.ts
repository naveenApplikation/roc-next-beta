import { revalidateTag } from "next/cache"

export async function GET()
{
       revalidateTag("ads")
     return Response.json("updated successfully")
}