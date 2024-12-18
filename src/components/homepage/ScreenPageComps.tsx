"use client";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import fallback from "../../../assets/images/fallbackimage.png";
import Skeleton from "react-loading-skeleton";
import { skeletonItems } from "@/app/utils/date";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Image from "next/image";
import ShopBrachSkeleton from "../skeleton Loader/ShopBrachSkeleton";
import { MaskGroupImg } from "@/app/utils/ImagePath";
interface DashboardProps {
  data?: any;
  title: string;
}

const ScreenPageComps: React.FC<DashboardProps> = ({ data, title }) => {
  const { filterUrls,modalClick, menuClick,modalClickRocPlaces } = useMyContext();
  data.listData.push(
    {
    "_id": {
      "$oid": "67603198a384fa1d3ea9b9b4"
    },
    "acf": {
      "title": "test1",
      "short_description": "FREE Event’s at Jersey Library this Christmas holidays. \n[aimed at children aged 5 and up.]\nJoin in for some holiday arts and crafts! From making your own Christmas stockings, to snow globes, to New Year sparklers, it’s set to be a lot of fun!\nThe events are all FREE, but booking is required, so pop into the library to secure your place.",
      "types": [
        {
          "label": "Indoor",
          "value": "indoor"
        },
        {
          "label": "Family friendly",
          "value": "family-friendly"
        },
        {
          "label": "Seasonal",
          "value": "seasonal"
        }
      ],
      "header_image_data": "[{\"url\":\"https://storage.googleapis.com/roc-app-425011.appspot.com//Events/photo/festive activitiesz.jpeg\"},{\"url\":\"https://storage.googleapis.com/roc-app-425011.appspot.com//Events/photo/festive activitiesz.jpeg\"}]",
      "website": "https://www.facebook.com/photo/?fbid=589442893639676&set=a.173918131858823",
      "telephone_number": {
        "area_code": "+44",
        "prefix": "63",
        "number": "865792934",
        "formatted": "+44 (63) 865792934"
      },
      "email_address": "je.library@gov.je",
      "address": {
        "place_name": "Jersey Public Library",
        "address_line_1": "78-80 Halkett Pl",
        "address_line_2": "St Helier",
        "postcode": "JE2 4WD"
      },
      "parish": {
        "label": "St. Helier",
        "value": "st-helier"
      },
      "opening_hours": {
        "Monday": {
          "closes": "",
          "opens": "6.00",
          "is_open": "0"
        },
        "Tuesday": {
          "closes": "",
          "opens": "9.00",
          "is_open": "0"
        },
        "Wednesday": {
          "closes": "",
          "opens": "",
          "is_open": "0"
        },
        "Thursday": {
          "closes": "",
          "opens": "",
          "is_open": "0"
        },
        "Friday": {
          "closes": "",
          "opens": "",
          "is_open": "0"
        },
        "Saturday": {
          "closes": "",
          "opens": "",
          "is_open": "0"
        },
        "Sunday": {
          "closes": "",
          "opens": "",
          "is_open": "0"
        }
      },
      "creatorId": "663d2e6171b6ab006a2ced37"
    },
    "manual": true,
    "type": "roc_places",
    "createdAt": {
      "$date": "2024-12-16T13:56:40.580Z"
    },
    "updatedAt": {
      "$date": "2024-12-16T13:56:40.580Z"
    },
    "__v": 0
  })
  console.log(data.listData)
 const rocPlaces=(item:any,index:number)=>{
    const imageUrls:any[]=[item.acf.header_image_data]
    console.log(item)
    const filteredUrls=filterUrls(imageUrls)
    console.log(filteredUrls)
    return <>
             <RatingMenu 
                     
                      headerImage={filteredUrls[0]}
                      containerImageUrl={true}
                      MenutitleDetail={item.acf.title}
                      isOpen={() =>
                        modalClickRocPlaces("rocPlaces",item,filteredUrls[0])
                      }
                    />
    </>
 }
  
  return (
    
    <>
      <MenuDetails
        isOpen={() => menuClick(data?.name, false, data?.id)}
        title={title}
      />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                {title.includes("Top Attractions") ? (
                  <div key={index}>
                    <Skeleton
                      width={80}
                      height={80}
                      style={{ borderRadius: "100%" }}
                    />
                    <Skeleton
                      width={80}
                      height={15}
                      style={{ marginTop: 8, borderRadius: 6 }}
                    />
                  </div>
                ) : title.includes("Beach life") ? (
                  <ShopBrachSkeleton />
                ) : (
                  <CommonSkeletonLoader />
                )}
              </div>
            ))
          : title.includes("Beach life")
            ? data.listData?.slice(0, 10).map((item: any, index: any) => {
              console.log(item.type)
                  if(item?.type=="roc_places")
                  {
                  
                     return rocPlaces(item,index)
                  }
                
                return (
                  <div
                    key={index}
                    className="h-[120px] min-w-[120px] bg-black/[0.01] bg-bottom bg-no-repeat flex flex-col items-end relative cursor-pointer justify-between"
                    onClick={() =>
                      modalClick(
                        "ModalContent",
                        item,
                        item?.data_type === "google"
                          ? item?.photoUrl
                          : item.photoUrl
                            ? item.photoUrl
                            : fallback
                      )
                    }>
                    {item?.data_type === "google" ? (
                      <Image
                        className="w-full h-full rounded-[4px] object-cover cursor-pointer"
                        width={500}
                        height={80}
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt="Image"
                        loading="lazy"
                        
                      />
                    ) : (
                      <Image
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt=""
                        width={500}
                        height={80}
                        className="rounded-[4px] w-full h-full object-cover cursor-pointer"
                        loading="lazy"
                        
                      />
                    )}
                    <Image
                      src={MaskGroupImg}
                      alt=""
                      width={120}
                      height={64}
                      className="absolute bottom-0 h-[50px]"
                      loading="lazy"
                      
                    />
                    <p className="text-white text-[14px] font-normal overflow-hidden text-ellipsis line-clamp-3 absolute bottom-[8px] left-[12px]">
                      {item?.data_type === "google" ? item?.name : item?.name}
                    </p>
                  </div>
                );
              })
            : title.includes("Top Attractions")
              ? data.listData?.slice(0, 10).map((item: any, index: any) => {
                console.log(item?.type)
                if(item?.type=="roc_places")
                  {
                   
                     return rocPlaces(item,index)
                  }
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-[8px] w-[80px] cursor-pointer"
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.data_type === "google"
                            ? item?.photoUrl
                            : item?.photoUrl
                              ? item?.photoUrl
                              : fallback
                        )
                      }>
                      <div className="w-[80px] h-[80px] rounded-full bg-black/[0.08] border border-black/[0.08] bg-contain">
                        {item?.data_type === "google" ? (
                          item.photoUrl == undefined ? (
                            <Image
                              src={fallback}
                              alt=""
                              width={500}
                              height={80}
                              className="rounded-full w-full h-full object-cover"
                              loading="lazy"
                              
                            />
                          ) : (
                            <Image
                              className="w-full h-full rounded-full object-cover cursor-pointer"
                              width={500}
                              height={80}
                              src={item.photoUrl}
                              alt="Image"
                              loading="lazy"
                              
                            />
                          )
                        ) : (
                          <Image
                            src={fallback}
                            alt=""
                            width={500}
                            height={80}
                            className="rounded-full w-full h-full object-cover"
                            loading="lazy"
                            
                          />
                        )}
                      </div>
                      <p className="text-center text-[12px] font-medium overflow-hidden text-ellipsis line-clamp-3">
                        {item?.data_type === "google" ? item?.name : item?.name}
                      </p>
                    </div>
                  );
                })
              : data.listData?.slice(0, 10).map((item: any, index: any) => {
                 console.log(item?.type)
                if(item?.type=="roc_places")
                  {
                     return <div key={index}>
                      {rocPlaces(item,index)}
                     </div>
                  }
                  else
                  {
                 return <div key={index}>
                    <RatingMenu
                      headerImage={item.photoUrl}
                      containerImageUrl={true}
                      MenutitleDetail={item.name}
                      isOpen={() =>
                        modalClick("ModalContent", item, item.photoUrl, true)
                      }
                    />
                  </div>
                  }
              }
                )}
      </div>
    </>
  );
};

export default ScreenPageComps;
