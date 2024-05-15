import React, { useState, useEffect } from "react";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { LocalCuisineMenuItem } from "@/app/utils/data";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import RatingMenu from "@/components/dashboard/RatingMenu";

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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const StarContainer = styled.div`
  width: 120px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const StarWrapper = styled.div`
  height: 64px;
  width: 120px;
  background: linear-gradient(45deg, black, transparent);
  position: relative;
  border-radius: 4px;

  p {
    position: absolute;
    top: 4px;
    right: 5px;
    background: #fff;
    width: 30px;
    text-align: center;
    border-radius: 10px;
    font-size: 8px;
  }

  .StarImageStyle {
    /* width: -webkit-fill-available; */
    height: 64px;
    border-radius: 4px;
  }
`;

const MainTitle = styled.p`
 overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
    margin-top: 8px;
`

const Outout: React.FC<DashboardProps> = ({ modalClick, menuClick,data,loader }) => {
  const { filterUrls, showContent } = useMyContext();

  // const [data, setData] = useState<ApiResponse[]>([]);

  // const [loader, setloader] = useState(true);

  // const fetchDataAsync = async () => {
  //   setloader(true);
  //   try {
  //     const result = await Instance.get("/out-out");
  //     setData(result.data);
  //   } catch (error: any) {
  //     console.log(error.message);
  //     setloader(false);
  //   } finally {
  //     setloader(false);
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
          isOpen={() => menuClick(data?.listName, false, data?._id)}
          title="Out out"
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

export default Outout;
