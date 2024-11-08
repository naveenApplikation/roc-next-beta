"use client";
import { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../../assets/images/fallbackimage.png";
import { convertGCSUrl, handleEventEncoding } from "@/app/utils/commanFun";
import { useRouter } from "next-nprogress-bar";
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
          imageUrls.push(fallback.src); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(fallback.src); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(fallback.src); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};
const RenderHighLights = ({
  data,
}: {
  data: { content: string; date: string; image: StaticImageData }[];
}) => {
  const { modalClick } = useMyContext();
  console.log(data.length);
  const router = useRouter();
  const navigate = (type: string, item: any) => {
    let link: any = "";
    switch (type) {
      case "event":
        console.log(item.event_id);

        const filteredUrls = filterUrls([item.event_id.acf.header_image_data]);
        console.log(filteredUrls);
        modalClick(
          "eventListing",
          {
            acf: item.event_id.acf,
          },
          filteredUrls[0] ? filteredUrls[0] : fallback
        );
        break;
      case "iframe":
        router.push(`/xmas/iframe/highlight/${item?._id}`);
        break;
      case "eventCategory":
        router.push(
          `/eventCategory/${handleEventEncoding("encode", item?.list_name)}`
        );

        break;
      case "place":
        modalClick(
          "eventListing",
          {
            place_id: item.place_id,
          },
          item?.img_url ? item?.img_url : fallback
        );
        break;
      default:
        router.push("/xmas");
    }
  };
  return data.map((item: any) => {
    return (
      <>
        <div
          key={item}
          onClick={() => {
            navigate(item.link_type, item);
          }}
          className="relative h-[150px] cursor-pointer w-full rounded-[16px]"
        >
          <Image
            src={item.img_url}
            alt=""
            height={500}
            width={500}
            objectFit="fill"
            className="h-full w-full rounded-[16px]"
          ></Image>
          {item.date && (
            <div className="w-max absolute top-2 rounded-[16px] py-[5px] px-[12px] left-2 bg-[#F40035]">
              <p className="text-white font-[500] text-[14px] overflow-hidden text-ellipsis line-clamp-2">
                {item.date}
              </p>
            </div>
          )}
          {/* <div className="w-full absolute bottom-[42px] h-[25px] w-full backdrop-blur-[30px] backdrop-brightness-[0.5] border-none opacity-[0.3]  "></div> */}

          <p className="text-white text-[12px] absolute bottom-[5px] left-[12px] font-[600] text-wrap overflow-hidden text-ellipsis line-clamp-2">
            {item.title}
          </p>
        </div>
      </>
    );
  });
};

export default RenderHighLights;
