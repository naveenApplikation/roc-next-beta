import React,{useState,useEffect} from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { EnjoyShineMenuItem } from "@/app/utils/data";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import {skeletonItems} from '@/app/utils/date'

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
  }

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const EnjoyTheSunshine: React.FC<DashboardProps> = ({modalClick,menuClick}) => {


  const { filterUrls,showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    const storedValue = localStorage.getItem("hideUI");
    if(storedValue){
      try {
        const result = await Instance.get("/sun-shine");
        console.log(result,"dsdsdsd")
        setData(result.data);
      } catch (error: any) {
        console.log(error.message);
        setloader(false);
      } finally {
        setloader(false);
      }
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [showContent]);

  const ImageUrlData = data.map((item) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
    <MenuDetails
        isOpen={() => menuClick("Enjoy the sunshine", true, "sun-shine")}
        title="Enjoy the sunshine"
      />
      {/* <ScrollingMenu>
        {EnjoyShineMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                menuImageUrl={item.image}
                headerImage={item.headerImage}
                containerImageUrl={true}
                MenutitleDetail={item.resturantName}
                isOpen={() => modalClick("activities", item)}
              />
            </div>
          );
        })}
      </ScrollingMenu> */}
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : data?.slice(0, 10).map((item, index) => {
              return (
                <div key={index}>
                  <RatingMenu
                    title={item.acf.parish.label}
                    menuImageUrl={
                      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant1.jpg?alt=media&token=c48ad7ce-9020-4dc9-b91f-1c866cb3e836"
                    }
                    headerImage={filteredUrls[index]}
                    containerImageUrl={true}
                    MenutitleDetail={item.acf.title}
                    isOpen={() =>
                      modalClick("activities", item, filteredUrls[index])
                    }
                  />
                </div>
              );
            })}
      </ScrollingMenu>
    </>
  );
};

export default EnjoyTheSunshine;
