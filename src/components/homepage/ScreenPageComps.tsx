"use client";

import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import fallback from "../../../assets/images/fallbackimage.png";
import Skeleton from "react-loading-skeleton";
import { skeletonItems } from "@/app/utils/date";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Image from "next/image";
import ShopBrachSkeleton from "../skeleton Loader/ShopBrachSkeleton";
import { MaskGroupImg } from "@/app/utils/ImagePath";
interface DashboardProps {
  data?: any;
  title: string;
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

const ScreenPageComps: React.FC<DashboardProps> = ({ data, title }) => {
  const { modalClick, menuClick } = useMyContext();

  return (
    
    <>
      <MenuDetails
        isOpen={() => menuClick(data?.listName, false, data?._id)}
        title={title}
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                {title.includes("Top Attractions") ? (
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
                ) : title.includes("Beach life") ? (
                  <ShopBrachSkeleton />
                ) : (
                  <CommonSkeletonLoader />
                )}
              </div>
            ))
          : title.includes("Beach life")
            ? data?.GoogleHomeScreenList?.slice(0, 10).map(
                (item: any, index: any) => {
                  return (
                    <WalkContainer
                      key={index}
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.data_type === "google"
                            ? item?.photoUrl
                            : item.photoUrl
                              ? item.photoUrl
                              : fallback
                        )
                      }>
                      {item?.data_type === "google" ? (
                        <ImageTag
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
                          style={{
                            borderRadius: "4px",
                            maxWidth: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          // alt=""
                        />
                      )}
                      <Image
                        src={MaskGroupImg}
                        alt=""
                        width={120}
                        height={64}
                        style={{ position: "absolute", bottom: 0, height: 50 }}
                      />
                      <p>
                        {item?.data_type === "google" ? item?.name : item?.name}
                      </p>
                    </WalkContainer>
                  );
                }
              )
            : title.includes("Top Attractions")
              ? data?.GoogleHomeScreenList?.slice(0, 10).map(
                  (item: any, index: any) => {
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
                              : item?.photoUrl
                                ? item?.photoUrl
                                : fallback
                          )
                        }>
                        <TopAttractionprofile>
                          {item?.data_type === "google" ? (
                            item.photoUrl == undefined ? (
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
                            ) : (
                              <ImageTag
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
                  }
                )
              : (title.includes("Out Out")
                  ? data?.GoogleFoodAndDrinksList
                  : title.includes("Pubs")
                    ? data?.categoryList
                    : data?.GoogleHomeScreenList
                )
                  .slice(0, 10)
                  .map((item: any, index: any) => (
                    <div key={index}>
                      <RatingMenu
                        // title={item.name}
                        headerImage={item.photoUrl}
                        containerImageUrl={true}
                        MenutitleDetail={item.name}
                        isOpen={() =>
                          modalClick("ModalContent", item, item.photoUrl, true)
                        }
                      />
                    </div>
                  ))}
      </ScrollingMenu>
    </>
  );
};

export default ScreenPageComps;

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
  cursor: pointer;

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

const ImageTag = styled(Image)`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  height: 100%;
  cursor: "pointer";
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
