
import React from "react";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from "@/app/utils/date";
import Image from "next/image";
import fallback from '../../../assets/images/fallbackimage.png'
import Menu, { OpenModal } from "./SunshineMenu";
import { convertGCSUrl } from "@/app/utils/commanFun";

interface DashboardProps {
  data?: any;
}
 
const EnjoyTheSunshine: React.FC<DashboardProps> = ({data}) => {

  const ImageUrlData = data.map((item:any) => item.acf.header_image_data);
  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <Menu></Menu>
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        { data?.slice(0, 10).map((item: any, index: any) => {
              return (
                <OpenModal key={index} {...{item}} url={filteredUrls[index]}>
                  <div
                    className="flex w-[120px] flex-col flex-shrink-0 cursor-pointer"
                  >
                    <div className="rounded-[4px] bg-[#c4c4c4] h-[64px] self-stretch">
                      <Image className="w-[140px] h-[64px] rounded-6px"
                        src={
                          filteredUrls[index] ? filteredUrls[index] : fallback
                        }
                        alt=""
                        width={500}
                        height={80}
                        style={{
                          borderRadius: 4,
                          maxWidth: "100%",
                          objectFit: "cover",
                        }}
                       
                        
                      />
                    </div>
                    <p className="text-[13px] font-normal leading-normal mt-[8px] block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.acf.title}
                    </p>
                    <p className="overflow-hidden text-black/[0.48] text-ellipsis text-[12px] font-normal leading-normal mt-[8px]">
                      £ {item.acf.price_from}
                    </p>
                  </div>
                  </OpenModal>
              );
            })}
      </div>
    </>
  );
};

export default EnjoyTheSunshine;

const filterUrls = (ImageUrlData: any) => {
  const imageUrls: string[] = [];
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