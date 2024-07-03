"use server";

import { Erica_One } from "next/font/google";

export async function getCategory(params: string) {
  const res = await fetch(`${process.env.NEXT_API_URL}/${params}`,
    {
       next:{revalidate:10}
    }
  );
  return await res.json();
}

 
export async function getData(slug:string,params:string)
{
      
        console.log(params)
        const res = await fetch(
          `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`,
           {
             next:{revalidate:2}
           }
        );
        return await res.json();
}

export async function updateLike(vote: any, loginToken: any, data: any) {
  console.log("assasasask",vote,loginToken,data);

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/category/${
        vote ? "removeVoting" : "addVoting"
      }`,
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "X-Login-Token": loginToken,
        },
        
        body: JSON.stringify({categroryId:data.categoryId,itemId:data.itemId }),
      }
    );
    
    const res= await response.json();
    console.log(res)
    if(!response.ok)
      {
          throw Error()
      }
    console.log(res)
     
    return res as {message:string}
  } catch (error) {
    console.error("Error updating vote:", error);
    return { message: "Something went wrong!"}
  }
}


export async function getDirectoryCatagories(params: string) {
  console.log(params);
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
