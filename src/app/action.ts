"use server";
import { cookies, headers} from "next/headers";
import { revalidateTag } from "next/cache";
import next from "next";
import { cache } from "react";
 
export async function addAndRomoveToken(loginToken?:any)
{
    console.log(loginToken,"line7")
      if(loginToken)
      {
      cookies().set('loginToken',loginToken)
      }
      else
      {
         cookies().delete('loginToken')
      }
}
export async function getCategory(params: string) {
  try {
    const url = `${process.env.NEXT_API_URL}/${params}`;
    const options =
      params === "events" || params === "Trending Lists"
        ? { next: { revalidate: 0 } }
        : undefined;
  
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      throw new Error("Received content is not JSON");
    }
  } catch (error) {
    console.log("test", params);
  }
}

export async function getData(slug: string, params: string) {
  try {

    
    const loginToken=cookies().get('loginToken')?.value
    console.log(loginToken,"line 47")
    const url = `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`;
    const options:any= loginToken
    ?{
          headers: {
            "x-login-token":loginToken ? loginToken.toString() : "",
          },   
          next:{tags:[slug],revalidate:30}
       }
      : { next: { revalidate:10}}
    const res = await fetch(url,options);

     
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      throw new Error("Received content is not JSON");
    }
  } catch (error) {
    console.log("tes2", params);
  }
}

export async function getDataForHome(slug: string, params: string) {
  try {
  
   
    const url = `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`;
   
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      throw new Error("Received content is not JSON");
    }
  } catch (error) {
    console.log("tes2", params);
  }
}

export async function updateLike(params: string) {
  revalidateTag(params);
}

export async function getDirectoryCatagories(params: string) {
  const res = await fetch(
    `${process.env.NEXT_API_URL}/directory?query=${params}`
  );
  return await res.json();
}

export async function getApiWithIcon(params: string, icons: any) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/${params}?limit=10`);
    const response = await res.json();
    if (res.status === 200) {
      response.forEach((list: any) => {
        const matchedIcon = icons.find(
          (icon: any) => icon.name === list.iconName
        );
        if (matchedIcon) {
          list.image = matchedIcon.image;
        }
      });
      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getApiShoppingWithIcon(params: string, icons: any) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/${params}?limit=10`);
    const response = await res.json();
    if (res.status === 200) {
      response.forEach((list: any) => {
        const matchedIcon = icons.find(
          (icon: any) => icon.listName === list.listName
        );
        if (matchedIcon) {
          list.image = matchedIcon.image;
        }
      });
      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// export async function handleLike(req: any, res: any) {
//   console.log("assasasask");
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { id, vote, categoryId } = req.body;
//   const loginToken = req.headers.authorization;

//   if (!loginToken) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_API_URL}/category/${
//         vote ? "removeVoting" : "addVoting"
//       }`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: loginToken,
//         },
//         body: JSON.stringify({ categroryId: categoryId, itemId: id }),
//       }
//     );

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || "Something went wrong!");
//     }

//     return res.status(200).json({ message: data.message });
//   } catch (error) {
//     console.error("Error updating vote:", error);
//     return res.status(500).json({ message: "Something went wrong!" });
//   }
// }
