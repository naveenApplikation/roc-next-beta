import React, { useEffect, useState } from "react";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import Instance from "@/app/utils/Instance";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import {skeletonItems} from '@/app/utils/date'
import { cycleRouteData, walkData } from "@/app/utils/data";

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

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: end;
  flex-direction: column;
  position: relative;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;
const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 7px 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;
  cursor:pointer;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  }
`;
const CycleRoutes: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls,showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    const storedValue = localStorage.getItem("hideUI");
    if(storedValue){
      try {
        const result = await Instance.get("/cycling");
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
      <MenuDetails title="Cycle Routes" hideShowAll={true} />
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <ShopBrachSkeleton />
              </div>
            ))
          :
          cycleRouteData.length ? cycleRouteData?.map((item: any, index: any) => {
            return (
              <CommunityContainer
                key={index}
                style={{ background: item?.color }}
                onClick={() => window.open(item.url)}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ borderRadius: 4 }}
                />
                <p>{item?.name}</p>
              </CommunityContainer>
            );
          }) : ""}
      </ScrollingMenu>
    </>
  );
};

export default CycleRoutes;
