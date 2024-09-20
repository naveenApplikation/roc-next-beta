import { getAllPosts, getClient } from "@/lib/sanity.client";

export async function GET()
{
         const client = getClient();
         const post = await getAllPosts(client);
         console.log(post);
      return Response.json(post);
}