import React, { useEffect, useState } from "react";
import Instance from "@/app/utils/Instance";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import styled from "styled-components";
import Image from "next/image";
import MenuDetails from "@/components/dashboard/MenuDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const TopAttractionContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  p {
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const TopAttractionprofile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-size: contain;
`;

const TopAttractions: React.FC<DashboardProps> = ({
  modalClick,
  menuClick,
}) => {
  const { filterUrls,showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    const storedValue = localStorage.getItem("hideUI");
    if(storedValue){
      try {
        const result = await Instance.get("/top-attractions");
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
        isOpen={() => menuClick("Top Attractions", true, "top-attractions")}
        title="Top Attractions"
      />
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{borderRadius:"100%"}} />
                <Skeleton width={80} height={15} style={{marginTop:8,borderRadius:6}} />
              </div>
            ))
          : data?.slice(0, 10).map((item, index) => {
              return (
                <TopAttractionContainer
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    modalClick("ModalContent", item, filteredUrls[index])
                  }
                >
                  <TopAttractionprofile>
                    <Image
                      src={filteredUrls[index]}
                      alt=""
                     width={500}
                      height={80}
                      style={{ borderRadius:"100%", maxWidth: "100%",objectFit:'cover' }}
                      // alt=""
                    />
                  </TopAttractionprofile>
                  <p>{item.acf.title}</p>
                </TopAttractionContainer>
              );
            })}
      </ScrollingMenu>
    </>
  );
};

export default TopAttractions;
