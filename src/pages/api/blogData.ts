import { getAllPosts, getClient } from "@/lib/sanity.client";
import { indexQuery } from "@/lib/sanity.queries";
import { NextApiRequest, NextApiResponse } from "next";


 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
     const client = getClient();
     const post = (await getAllPosts(client)) as [];
  
  res.status(200).json(post);
}