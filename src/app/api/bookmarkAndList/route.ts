import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { URL } from "url";

export async function GET(request:NextRequest) {
    const {searchParams}=new URL(request.url)
    
    const cookie=cookies().get('loginToken')?.value
     console.log(cookie)
  const result = await fetch(`${process.env.NEXT_API_URL}/${searchParams.get('type')}`, {
    headers: {
      "Content-Type": "application/json",
      "x-login-token":cookie?cookie:''
    },
    cache:"no-cache",
  });
  const response = await result.json();

  return Response.json(response);
}
