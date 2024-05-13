import React, { useEffect, useState } from "react";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import Instance from "@/app/utils/Instance";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import { skeletonItems } from "@/app/utils/date";

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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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

const ImageTag = styled.img`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  height: 100%;
`;

const Shopping: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/shopsandMarket");
      setData(result.data);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [showContent]);



  const ImageUrlData = data.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
    <MenuDetails
      isOpen={() => menuClick("Shopping", true, "shopsandMarket")}
      title="Shopping"
    />
    <ScrollingMenu>
      {loader
        ? skeletonItems.map((item, index) => (
            <div key={index}>
              <ShopBrachSkeleton />
            </div>
          ))
        : data.slice(0, 10).map((item, index) => {
            return (
              <WalkContainer
                key={index}
                onClick={() =>
                  modalClick(
                    "ModalContent",
                    item,
                    item?.data_type === "google"
                      ? item?.photoUrl
                      : filteredUrls[index]
                  )
                }
              >
                {/* <WalkContainer key={index} onClick={menuClick}> */}
                {item?.data_type === "google" ? (
                  item.photoUrl === undefined ?
                  <ImageTag src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"}   width={500}
                  height={80}
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                  }} alt="Image" /> :
                  <ImageTag src={item.photoUrl} alt="Image" />
                ) : (
                  <Image
                    src={filteredUrls[index]}
                    alt=""
                    width={500}
                    height={80}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    // alt=""
                  />
                )}
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2FMask%20group.png?alt=media&token=6519fc68-65f1-4e2e-b4d5-dd90e9bf2380"
                  alt=""
                  width={120}
                  height={64}
                  style={{ position: "absolute", bottom: 0, height: 50 }}
                />
                <p>
                  {item?.data_type === "google"
                    ? item?.name
                    : item?.acf?.title}
                </p>
              </WalkContainer>
            );
          })}
    </ScrollingMenu>
  </>
  )
};

export default Shopping;
