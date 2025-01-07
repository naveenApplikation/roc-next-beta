import sharp from 'sharp';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { convertGCSUrl } from '@/app/utils/commanFun';
import fallback from "../../../../assets/images/fallbackimage.png"
export async function GET(req:Request) {
//   const imageUrl = 'https://example.com/large-image.jpg';
   

  const data=await fetch("https://beta-dot-roc-app-425011.nw.r.appspot.com/upcomming-events?type=limit")
  const result=await data.json()
  console.log(result.data[0].acf.header_image_data)
  const imageurl="https://cdn.jersey.com/image/upload/v1700128164/Listings/Jersey%20Heritage/4396371906_dscf0067.jpg"
  console.log(imageurl)
//   const response = await axios.head(imageurl); // Perform a HEAD request
//   const contentLength = response.headers['content-length']; // Get the Content-Length header

//   if (contentLength) {
//     console.log(`Image size: ${Math.round(Number(contentLength/1024/1024))} Mb`);
//     return parseInt(contentLength, 10); // Convert size to a number
//   } else {
//     console.log('Content-Length header not found');
     
//   }
try{
  const response = await axios({
    url: imageurl,
    method: 'GET',
    responseType: 'arraybuffer', // Get image as Buffer
  });

  const originalImage = Buffer.from(response.data);

  // Step 3: Optimize the image using Sharp
  const optimizedImage = await sharp(originalImage)
    .resize({ width: 500 }) // Resize to max width of 1200px
    .webp({ quality: 75 }) // Compress with 75% quality
    .toBuffer();

  // Step 4: Serve the optimized image as .jpg
  const base64Image = optimizedImage.toString('base64');
  const dataUri = `data:image/jpeg;base64,${base64Image}`; // Convert to Data URI format
  
  return new NextResponse(dataUri, {
   
  });
} catch (error) {
  console.error('Error optimizing image:', error);
  return NextResponse.json(
    { error: 'Failed to optimize the image' },
    { status: 500 }
  );
}

}

const filterUrls = (ImageUrlData: any) => {
    const imageUrls: string[] = [];
    console.log(ImageUrlData)
    ImageUrlData?.forEach((item: any) => {
      if (item) {
        try {
          const jsonData = JSON.parse(item);
          const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

          if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
            imageUrls.push(convertGCSUrl(url));
          } else {
            imageUrls.push(
              fallback.src
            ); // Push default image URL if URL is not valid
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          imageUrls.push(
            fallback.src          ); // Push default image URL if JSON parsing fails
        }
      } else {
        imageUrls.push(
          fallback.src        ); // Push default image URL if item is undefined
      }
    });
    return imageUrls;
  };