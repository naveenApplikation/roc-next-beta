import { getCategory } from "@/app/action";

export async function GET(request: Request) {
  const data = new URL(request.url);
  const { searchParams } = data;
  console.log(searchParams.get("query"));
  const result=await getCategory(`filter/category?query=${searchParams.get("query")}`)
  const res =result;

  return Response.json(res);
}
