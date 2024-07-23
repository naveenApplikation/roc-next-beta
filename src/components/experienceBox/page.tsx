"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CommonButton from "@/components/button/CommonButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CloseModal, share, bookmark } from "@/app/utils/ImagePath";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next/navigation";
import { handleFilter } from "@/app/utils/mappingFun";
import FilterSection from "../filterSection";

interface ExperienceBoxProps {
  isShare?: any;
  urlData?: any;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
}

const ExperienceBox: React.FC<ExperienceBoxProps> = ({
  isShare,
  urlTitle,
  urlData,
  filteredUrls,
  loader,
}) => {
  const {
    modalClick,
    selectFilter,
    setSelectFilter,
    modalType,
    closeModal,
    handleSocialShare,
    socialShare,
  } = useMyContext();

  const skeletonItems = new Array(10).fill(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
      setSelectFilter("Any");
    }
  };
  // const [isBookmark, setBookmark] = useState(false);
  // const handleBookMark = async () => {
  //   console.log(categoryId, token, 119);
  //   if (token) {
  //     console.log("yes");
  //     const res = await addAndRemoveBookmark(categoryId);
  //     if (res) {
  //       setBookmark(true);
  //     }
  //   } else {
  //     modalClick("LoginSignupModal");
  //   }
  // };
  const handleShare = () => {
    console.log(socialShare);
    if (!socialShare) {
      console.log(socialShare);
      handleSocialShare();
    }
  };
  const filterDate = handleFilter(urlData, selectFilter);
  return (
    <>
      <Backdrop></Backdrop>
      <SearchedListContainer>
        <Header className="">
          <TitleText>{urlTitle}</TitleText>
          <Image
            style={{ width: 40, height: 40, cursor: "pointer" }}
            src={CloseModal}
            alt="Logo Outline"
            onClick={() => handleBack()}
          />
        </Header>
        <div
          style={{
            padding: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <FilterSection pageTitle="categoryEvent" />
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}>
            {/* <ImageContainer>
            <Image
              src={bookmark}
              alt="Logo Outline"
            />
            </ImageContainer> */}
            <ImageContainer onClick={handleShare}>
              <Image src={share} alt="Logo Outline" />
            </ImageContainer>
          </div>
        </div>
        {loader
          ? skeletonItems.map((item, index) => (
              <SearchedData key={index}>
                <MainInsideWrapper>
                  <Skeleton
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <div className="restroRating">
                    <Skeleton
                      width={160}
                      height={17}
                      style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                      width={100}
                      height={14}
                      style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                      width={80}
                      height={13}
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                </MainInsideWrapper>
              </SearchedData>
            ))
          : filterDate?.map((item: any, index: any) => {
              return (
                <SearchedData
                  key={index}
                  onClick={() =>
                    modalClick(
                      "activities",
                      item,
                      filteredUrls[index] ? filteredUrls[index] : fallback
                    )
                  }>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      flex: 1,
                      cursor: "pointer",
                    }}>
                    <Image
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      width={500}
                      height={80}
                      style={{
                        borderRadius: 4,
                        width: "80px",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                    <div className="restroRating">
                      <p className="shopName">{item.acf.title}</p>

                      <PriceAndLabelText>
                        {item.acf.parish.label} ⋅ Activity
                      </PriceAndLabelText>
                      <PriceAndLabelText>
                        {item.acf.price_to || item.acf.price_from ? "£" : ""}
                        {(item.acf.price_from ? item.acf.price_from : "") +
                          (item.acf.price_to && item.acf.price_from
                            ? "-"
                            : "") +
                          (item.acf.price_to ? item.acf.price_to : "")}
                      </PriceAndLabelText>
                    </div>
                  </div>
                </SearchedData>
              );
            })}
        <AddListButton onClick={() => modalClick("ContactUsModal")}>
          <CommonButton text="Suggest an Event" />
        </AddListButton>
      </SearchedListContainer>
    </>
  );
};

export default ExperienceBox;

const Backdrop = styled.div`
  @media screen and (max-width: 800px) {
    background-color: gray;
    position: fixed;
    bottom: 100%;
    inset: 0px;
    opacity: 0.5;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const SearchedListContainer = styled.div`
  padding: 40px;
  background-color: #fff;
  min-height: 100dvh;
`;

const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  cursor: pointer;

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
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const AddListButton = styled.div`
  padding-top: 20px;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PriceAndLabelText = styled.p`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.12px;
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
