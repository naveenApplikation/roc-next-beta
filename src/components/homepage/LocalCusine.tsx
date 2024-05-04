import React, { useEffect, useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const LocalCusine: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls,showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    const storedValue = localStorage.getItem("hideUI");
    if(storedValue){
      try {
        const result = await Instance.get("/local-cuisine");
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

  const filteredUrls = filterUrls(ImageUrlData,data);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Local cuisine", true, "local-cuisine")}
        title="Local cuisine"
      />
      <ScrollingMenu>
        {loader ? (
        skeletonItems.map((item,index)=> <div key={index}><CommonSkeletonLoader /></div>)
        ) : (
          data?.slice(0, 10).map((item, index) => (
            
            <div key={index}>
              <RatingMenu
                title={item.acf.parish.label}
                menuImageUrl={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65"
                }
                headerImage={filteredUrls[index]}
                containerImageUrl={true}
                MenutitleDetail={item.acf.title}
                isOpen={() => modalClick("ModalContent", item, filteredUrls[index],true)}
              />
            </div>
          ))
        )}
      </ScrollingMenu>
    </>
  );
};

export default LocalCusine;
