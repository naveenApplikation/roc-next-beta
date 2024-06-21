"use client"

import React, { useEffect, useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import {skeletonItems} from '@/app/utils/date'

interface DashboardProps {
  data?: any;
  // menuClick?: any;
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

const Sustainability: React.FC<DashboardProps> = ({data}) => {
  const { filterUrls, modalClick,menuClick } = useMyContext();

  // const [data, setData] = useState<any>([]);

  // const [loader, setloader] = useState(true);

  // const fetchDataAsync = async () => {
  //   setloader(true);
  //   try {
  //     const result = await Instance.get("/google/sustainability");
  //     setData(result.data[0]);
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

  return (
    <>
      <MenuDetails
        title="Sustainability"
        isOpen={() => menuClick(data?.listName, false, data?._id)}
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : data?.GoogleHomeScreenList.slice(0, 10).map((item:any, index:any) => (
            <div key={index}>
              <RatingMenu
                // title={item.name}
                headerImage={item?.photoUrl}
                containerImageUrl={true}
                MenutitleDetail={item?.name}
                isOpen={() => modalClick("ModalContent", item, item?.photoUrl,true)}
              />
            </div>
          ))}
      </ScrollingMenu>
    </>
  );
};

export default Sustainability;
