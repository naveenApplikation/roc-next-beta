import React, { useEffect, useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Instance from "@/app/utils/Instance";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import RatingMenu from "@/components/dashboard/RatingMenu";
import { skeletonItems } from '@/app/utils/date'

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
  data:any;
  loader:boolean
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

const Bars: React.FC<DashboardProps> = ({ modalClick, menuClick,data,loader }) => {
  const { filterUrls, showContent } = useMyContext();

  // const [data, setData] = useState<ApiResponse[]>([]);

  // const [loader, setloader] = useState(true);

  // const fetchDataAsync = async () => {
  //   setloader(true);
  //   const storedValue = localStorage.getItem("hideUI");
  //   if (storedValue) {
  //     try {
  //       const result = await Instance.get("/bar-pubs");
  //       setData(result.data);
  //     } catch (error: any) {
  //       console.log(error.message);
  //       setloader(false);
  //     } finally {
  //       setloader(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchDataAsync();
  // }, []);

  // const ImageUrlData = data.map((item) => item.acf.header_image_data);

  // const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
        <MenuDetails
          title="Bars"
          isOpen={() => menuClick(data?.listName, false, data?._id)}
        />
        <ScrollingMenu>
          {loader
            ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
            :  data?.GoogleHomeScreenList.slice(0, 10).map((item:any, index:any) => (
              <div key={index}>
                <RatingMenu
                  // title={item.name}
                  headerImage={item.photoUrl}
                  containerImageUrl={true}
                  MenutitleDetail={item.name}
                  isOpen={() => modalClick("ModalContent", item, item.photoUrl,true)}
                />
              </div>
            ))}
        </ScrollingMenu>
      </>
  );
};

export default Bars;
