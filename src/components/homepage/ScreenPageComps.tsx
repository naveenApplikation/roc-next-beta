
import fallback from "../../../assets/images/fallbackimage.png";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Image from "next/image";
import { MaskGroupImg } from "@/app/utils/ImagePath";
import Menu, { OpenModal } from "./Menu";
import { getCategory, getDataForHome } from "@/app/action";
interface DashboardProps {
  data?: any;
  title: string;
}

const ScreenPageComps: React.FC<DashboardProps> =async ({ data, title }) => {
   
 
  
  return (
    
    <>
       <Menu {...{data,title}}></Menu>
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        {  title.includes("Beach life")
            ? data.listData?.slice(0, 10).map((item: any, index: any) => {
                return (
                  <OpenModal key={index} {...{item}}>
                  <div
                    key={index}
                    className="h-[120px] min-w-[120px] bg-black/[0.01] bg-bottom bg-no-repeat flex flex-col items-end relative cursor-pointer justify-between">
                    {item?.data_type === "google" ? (
                      <Image
                        className="w-full h-full rounded-[4px] object-cover cursor-pointer"
                        width={500}
                        height={80}
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt="Image"
                       
                        
                      />
                    ) : (
                      <Image
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt=""
                        width={500}
                        height={80}
                        className="rounded-[4px] w-full h-full object-cover cursor-pointer"
                     
                        
                      />
                    )}
                    <Image
                      src={MaskGroupImg}
                      alt=""
                      width={120}
                      height={64}
                      className="absolute bottom-0 h-[50px]"
                    
                      
                    />
                    <p className="text-white text-[14px] font-normal overflow-hidden text-ellipsis line-clamp-3 absolute bottom-[8px] left-[12px]">
                      {item?.data_type === "google" ? item?.name : item?.name}
                    </p>
                  </div>
                  </OpenModal>
                );
              })
            : title.includes("Top Attractions")
              ? data.listData?.slice(0, 10).map((item: any, index: any) => {
                  return (
                    <OpenModal key={index} {...{item}}>
                    <div
                      key={index}
                      className="flex flex-col items-center gap-[8px] w-[80px] cursor-pointer"
                       >
                      <div className="w-[80px] h-[80px] rounded-full bg-black/[0.08] border border-black/[0.08] bg-contain">
                        {item?.data_type === "google" ? (
                          item.photoUrl == undefined ? (
                            <Image
                              src={fallback}
                              alt=""
                              width={500}
                              height={80}
                              className="rounded-full w-full h-full object-cover"
                         
                              
                            />
                          ) : (
                            <Image
                              className="w-full h-full rounded-full object-cover cursor-pointer"
                              width={500}
                              height={80}
                              src={item.photoUrl}
                              alt="Image"
                            
                              
                            />
                          )
                        ) : (
                          <Image
                            src={fallback}
                            alt=""
                            width={500}
                            height={80}
                            className="rounded-full w-full h-full object-cover"
                            
                          />
                        )}
                      </div>
                      <p className="text-center text-[12px] font-medium overflow-hidden text-ellipsis line-clamp-3">
                        {item?.data_type === "google" ? item?.name : item?.name}
                      </p>
                    </div>
                    </OpenModal>
                  );
                })
              : data.listData?.slice(0, 10).map((item: any, index: any) => (
                  <OpenModal key={index} {...{item}} >
                    <RatingMenu
                      headerImage={item.photoUrl}
                      containerImageUrl={true}
                      MenutitleDetail={item.name}
                    />
                  </OpenModal>
                ))}
      </div>
    </>
  );
};

export default ScreenPageComps;
