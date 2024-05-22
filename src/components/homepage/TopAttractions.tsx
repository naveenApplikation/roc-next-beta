import React, { useEffect, useState } from "react";
import Instance from "@/app/utils/Instance";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import styled from "styled-components";
import Image from "next/image";
import MenuDetails from "@/components/dashboard/MenuDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { skeletonItems } from "@/app/utils/date";
import { topAttractionMapping } from "@/app/utils/mappingFun";
import fallback from '../../../assets/images/fallbackimage.png'

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
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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

const ImageTag = styled.img`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  height: 100%;
`;

const TopAttractions: React.FC<DashboardProps> = ({
  modalClick,
  menuClick,
}) => {
  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<any>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/google/top-attraction");
      setData(result.data[0]);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  return(
    <>
    <MenuDetails
      isOpen={() => menuClick(data?.listName, false, data?._id)}
      title="Top Attractions"
    />
    <ScrollingMenu>
      {loader
        ? skeletonItems.map((item, index) => (
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
          ))
        : (data?.GoogleHomeScreenList?.slice(0, 10).map((item:any, index:any) => {
            return (
              <TopAttractionContainer
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  modalClick(
                    "ModalContent",
                    item,
                    item?.data_type === "google"
                      ? item?.photoUrl
                      : item?.photoUrl ? item?.photoUrl : fallback
                  )
                }
              >
                <TopAttractionprofile>
                  {item?.data_type === "google" ? (
                    item.photoUrl == undefined ? <Image
                    src={fallback}
                    alt=""
                    width={500}
                    height={80}
                    style={{
                      borderRadius: "100%",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    // alt=""
                  /> :
                    <ImageTag src={item.photoUrl} alt="Image" />
                  ) : (
                    <Image
                      src={fallback}
                      alt=""
                      width={500}
                      height={80}
                      style={{
                        borderRadius: "100%",
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                      // alt=""
                    />
                  )}
                </TopAttractionprofile>
                <p>
                  {item?.data_type === "google"
                    ? item?.name
                    : item?.name}
                </p>
              </TopAttractionContainer>
            );
          }))}
    </ScrollingMenu>
  </>
  )
};

export default TopAttractions;
