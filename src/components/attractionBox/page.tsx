"use client";
import { CloseModal, thumbsup, utensils } from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { Suspense } from "react";
import styled from "styled-components";
import Ratings from "../ratings";
import FilterSection from "@/components/filterSection";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { sideWidth } from "@/app/utils/date";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next/navigation";

interface AttractionBoxProps {
  // Define your props here
  urlData?: any;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
}

const AttractionBox: React.FC<AttractionBoxProps> = ({
  urlTitle,
  urlData,
  filteredUrls,
  loader,
}) => {
  const { modalClick } = useMyContext();
  const router = useRouter();

  const skeletonItems = new Array(10).fill(null);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchedListContainer>
        <Header className="">
          <TitleText>
            {urlTitle ? urlTitle?.toString().replaceAll("%26", "&") : urlTitle}
          </TitleText>
          <Image
            style={{ width: 40, height: 40, cursor: "pointer" }}
            src={CloseModal}
            alt="Logo Outline"
            onClick={() => handleBack()}
          />
        </Header>

        {/* <LikeCount>5,281 likes</LikeCount> */}
        {/* {urlData != 77 && (
          <div style={{ margin: "24px 0px" }}>
            <FilterSection />
          </div>
        )} */}
        {loader
          ? skeletonItems.map((item, index) => (
              <SearchedData key={index}>
                <MainWrraper>
                  <MainInsideWrapper>
                    <Skeleton
                      width={80}
                      height={80}
                      style={{ borderRadius: 8 }}
                    />
                    <div className="restroRating">
                      <Skeleton
                        width={120}
                        height={15}
                        style={{ borderRadius: 8 }}
                      />
                      <Skeleton
                        width={120}
                        height={15}
                        style={{ borderRadius: 8 }}
                      />
                      <Skeleton
                        width={120}
                        height={15}
                        style={{ borderRadius: 8 }}
                      />
                    </div>
                  </MainInsideWrapper>
                  <div className="likes">
                    <Skeleton width={16} height={16} />
                  </div>
                </MainWrraper>
              </SearchedData>
            ))
          : urlData?.map((item: any, index: any) => {
              return (
                <SearchedData key={index}>
                  <MainWrraper>
                    <MainInsideWrapper
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.data_type === "google"
                            ? item?.photoUrl
                            : fallback
                        )
                      }>
                      <div style={{ position: "relative" }}>
                        {item?.data_type === "google" ? (
                          <ImageTag
                            src={item.photoUrl ? item.photoUrl : fallback}
                            alt="Image"
                          />
                        ) : (
                          <Image
                            // style={{ background: "white" }}
                            src={item.photoUrl ? item.photoUrl : fallback}
                            width={500}
                            height={80}
                            style={{
                              borderRadius: 4,
                              width: "80px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            alt=""
                            // onClick={() =>
                            //   modalClick("ModalContent", item, filteredUrls[index])
                            // }
                          />
                        )}
                        {item.deliverActive && (
                          <DeliveryContainer>
                            <Image
                              src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2Fmoped.png?alt=media&token=b898ff9b-8251-4e92-b6b4-532072eb8094"
                              width={10}
                              height={8}
                              alt=""
                            />
                            <p>delivery</p>
                          </DeliveryContainer>
                        )}
                        {item.NewRes && (
                          <NewResturant>
                            <p>New</p>
                          </NewResturant>
                        )}
                      </div>
                      <div className="restroRating">
                        <p className="shopName">
                          {item?.data_type === "google"
                            ? item?.name
                            : item?.acf?.title}
                        </p>
                        <div style={{ alignItems: "center", display: "flex" }}>
                          {/* <UtenssilsImage src={utensils} alt="utensils" /> */}
                          <Ratings defaultValue={item.rating} />
                        </div>
                        {/* <p>
                        <span>Open - Closes 11 pm</span>
                      </p> */}
                      </div>
                    </MainInsideWrapper>
                    <div className="likes">
                      <Image
                        src={thumbsup}
                        alt="like"
                        style={{ width: "16px", height: "16px" }}
                      />
                      <p>{item.likeCount}</p>
                    </div>
                  </MainWrraper>
                </SearchedData>
              );
            })}

        <AddListButton>
          <CommonButton text="Add to the list" />
        </AddListButton>
      </SearchedListContainer>
    </Suspense>
  );
};

export default AttractionBox;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const SearchedListContainer = styled.div`
  /* padding-bottom: 40px; */
  padding: 40px;
  background-color: #f2f3f3;
  width: ${sideWidth};
  min-height: 100vh;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 40px 15px;
  }
`;

const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  p {
    font-size: 13px;
    font-weight: 400;
    @media screen and (max-width: 350px) {
      font-size: 1.3rem;
    }
  }
  .likes {
    background-color: #00000014;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;

    @media screen and (max-width: 350px) {
      padding: 6px 12px;
    }
  }
  .shopName {
    font-size: 16px;
    font-weight: 600;
    @media screen and (max-width: 350px) {
      font-size: 1.6rem;
    }
  }
  p span {
    color: #2b902b;
  }
`;

const LikeCount = styled.p`
  font-size: 15px;
  font-weight: 400;
  font-style: italic;
  margin-top: 16px;
`;

const UtenssilsImage = styled(Image)`
  width: 13px;
  height: 13px;
  margin-right: 8px;
  @media screen and (max-width: 350px) {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const DeliveryContainer = styled.div`
  display: flex;
  width: 64px;
  padding: 2px 4px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 8px;
  bottom: 8px;
  border-radius: 4px;
  background: var(--White, #fff);

  p {
    color: var(--BODY, #000);
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
`;

const NewResturant = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  right: 4px;
  top: 4px;
  border-radius: 4px;
  background: var(--White, #fff);
  p {
    color: var(--BODY, #000);
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
`;

const AddListButton = styled.div`
  padding-top: 20px;
`;

const MainWrraper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  flex: 1;
`;

const ImageTag = styled.img`
  width: 80px;
  border-radius: 4px;
  object-fit: cover;
  height: 80px;
  cursor: pointer;
`;
