"use server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { cache } from "react";
import axios from "axios";
import sharp from "sharp"
// Utility function to add timeout to fetch
async function fetchWithTimeout(
  resource: string,
  options: any,
  timeout = 15000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(id);
  return response;
}

export async function addAndRomoveToken(loginToken?: any) {
  if (loginToken) {
    cookies().set("loginToken", loginToken);
  } else {
    cookies().delete("loginToken");
  }
}

export async function getCategory(params: string) {
  try {
    const url = `${process.env.NEXT_API_URL}/${params}`;
    const res = await fetchWithTimeout(
      url,
      {
        next: { revalidate: 14400 ,tags:["event","activity"]}, // 4 hours cache duration
      },
      150000
    ); // 10 seconds timeout for fetch

    if (res.status === 404) {
      console.warn(`Resource not found for ${params}: ${res.statusText}`);
      return null;
    }

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
    console.error("Error fetching category:", params, error);
    return null;
  }
}

export async function getData(slug: string, params: string) {
  try {
    const loginToken = cookies().get("loginToken")?.value;
    const url = `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`;
    slug=slug
    .replaceAll("%20", " ")
    .replaceAll("%26", " ")
    const options: any = {
      headers: loginToken ? { "x-login-token": loginToken } : undefined,
      next: { tags: [slug,"updatePlaces"], revalidate: 3600 }, // 1 hour cache duration
    };

    const res = await fetchWithTimeout(url, options, 100000); // 10 seconds timeout

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
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getDataForHome(slug: string, params: string) {
  try {
    const url = `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`;
    const res = await fetchWithTimeout(url, {}, 100000); // 10 seconds timeout

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
    console.error("Error fetching data for home:", error);
    return null;
  }
}

export async function updateLike(params: string) {
  try {
    revalidateTag(params);
  } catch (error) {
    console.error("Error updating like:", error);
  }
}

export async function getDirectoryCategories(params: string) {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_API_URL}/directory?query=${params}`,
      {},
      100000
    );
    return await res.json();
  } catch (error) {
    console.error("Error fetching directory categories:", error);
    return null;
  }
}

export async function getApiWithIcon(params: string, icons: any) {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_API_URL}/${params}?limit=10`,
      {},
      100000
    );
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
    console.error("Error fetching data with icon:", error);
    return [];
  }
}

export async function getApiShoppingWithIcon(params: string, icons: any) {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_API_URL}/${params}?limit=10`,
      {},
      100000
    );
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
    console.error("Error fetching shopping data with icon:", error);
    return [];
  }
}

export async function addAndRemoveBookmark(params: string, categoryId: string) {
  const loginToken = cookies().get("loginToken")?.value;
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_API_URL}/${params}/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "x-login-token": loginToken ? loginToken.toString() : "",
        },
      },
      100000 // 10 seconds timeout
    );

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error adding/removing bookmark:", error);
    return false;
  }
}

export async function getBookMark(params: string) {
  const loginToken = cookies().get("loginToken")?.value;
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_API_URL}/${params}`,
      {
        headers: {
          "x-login-token": loginToken ? loginToken.toString() : "",
        },
        next: { revalidate: 0 }, // Always fresh
      },
      100000
    );

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching bookmark:", error);
    return null;
  }
}


export async function getAdsOnScreens()
{
    try
    {
      const response=await fetch("https://v1.nocodeapi.com/cfroc/google_sheets/GGLEMFRVjirqychR?tabId=ads",{
        next:{revalidate:14400 }
     })
      return await response.json()
    }
    catch(error)
    {
       return []
    } 
}

export async function getAdsByCategory()
{
  try
  {
    const response=await fetch("https://v1.nocodeapi.com/cfroc/google_sheets/GGLEMFRVjirqychR?tabId=ad_categories",{
      next:{revalidate:14400 }
   })
    return await response.json()
  }
  catch(error)
  {
     return []
  } 
}
 export async function revalidatePlaces(categoryName:string)
 {
      revalidateTag(categoryName)
      revalidatePath('/','page')
 }
  
 export async function imageOptimization(events:any)
{
   return await Promise.all(
    events.map(async (item: any) => {
      try {
        const imageUrl = item.acf.header_image_data
          ? JSON.parse(item.acf.header_image_data)[0]?.url
          : "";
          
        if (
          imageUrl &&
          (imageUrl.endsWith(".jpg") ||
            imageUrl.endsWith(".png") ||
            imageUrl.endsWith(".jpeg"))
        ) {
          const validUrl = convertGCSUrl(imageUrl);
          if(validUrl.includes("storgage"))
          {
            item.acf.header_image_data =validUrl;
          }
          const response = await axios({
            url: validUrl,
            method: "GET",
            responseType: "arraybuffer",
          });

       

          if (response.status === 200) {
            const originalImage = Buffer.from(response.data);

            const optimizedImage = await sharp(originalImage)
              .resize({ width: 500 }) // Resize to max width of 500px
              .jpeg({ quality: 75 }) // Compress with 75% quality
              .toBuffer();

            const base64Image = optimizedImage.toString("base64");
            item.acf.header_image_data = `data:image/jpeg;base64,${base64Image}`;
          }
        }
      } catch (error) {
        // console.error("Error optimizing image for event:", item._id, error);
     
        item.acf.header_image_data ='';
      }

      return item;
    })
  );


}


function convertGCSUrl(gcsUrl: string) {
  // Check if the input URL is valid and in the expected format
  const regex = /^https:\/\/storage\.cloud\.google\.com\/(.+)\/(.+)$/;
  const match = gcsUrl.match(regex);

  if (match) {
    // Extract the bucket name and the path to the image
    const bucketName = match[1];
    const imagePath = match[2];

    // Construct the direct access URL
    return `https://storage.googleapis.com/${bucketName}/${imagePath}`;
  } else {
    return gcsUrl;
  }
}