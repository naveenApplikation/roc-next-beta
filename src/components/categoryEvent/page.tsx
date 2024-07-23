import {
  ScrollIcon,
  ThumbsUPIcon,
  commentstar,
  share,
  bookmark,
  bookmarkActive,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CloseModal } from "@/app/utils/ImagePath";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import fallback from "../../../assets/images/fallbackimage.png";
import FilterSection from "../filterSection";
import { handleFilter } from "@/app/utils/mappingFun";
import { FaSpinner } from "react-icons/fa6";
import ShareFeature from "../ShareFeature";
import useSWR from "swr";
import { addAndRemoveBookmark, getBookMark } from "@/app/action";
import ScrollList from "@/components/scrollList/ScrollList";

interface EventBoxProps {
  categoryId?: any;
  params?: any;
  bookMark?: any;
  urlData?: any;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
  likeLoader: string;
  isOpen?: any;
  handleLike?: any;
  totalVote?: any;
  isShare?: any;
}

const CategoryEvent: React.FC<EventBoxProps> = ({
  isShare,
  urlTitle,
  urlData,
  loader,
  likeLoader,
  isOpen,
  handleLike,
  totalVote,
  categoryId,
  params,
  bookMark,
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

  const scrollContainerRef = useRef<any>();

  const setScrollTop = () => {
    scrollContainerRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };
  const token = localStorage.getItem("loginToken");

  useEffect(() => {
    console.log(bookMark, 88);
    setBookmark(bookMark);
  }, [bookMark]);
  // const [scrollHeight, setScrollHeight] = useState<number>(0);

  // const handleScroll = () => {
  //   // setScrollHeight(scrollContainerRef.current?.scrollTop);
  //   let scrollll = document.documentElement.scrollTop || document.body.scrollTop
  //   setScrollHeight(scrollContainerRef.current?.scrollTop);
  // };
  // useEffect(() => {
  //   const scrollTop = sessionStorage.getItem('child_scroll')

  //   if (scrollTop && scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollTop = parseInt(scrollTop)
  //   }

  // }, [])

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (scrollContainer) {
  //     scrollContainer.addEventListener("scroll", handleScroll);
  //   }

  //   if (scrollHeight != 0) {
  //     sessionStorage.setItem("child_scroll", scrollHeight.toString());
  //   }
  //   return () => {
  //     scrollContainer.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollHeight]);

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/");
    }
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
      setSelectFilter("Any");
    }
  };

  const handleShare = () => {
    console.log(socialShare);
    if (!socialShare) {
      console.log(socialShare);
      handleSocialShare();
    }
  };

  const filterDate = handleFilter(urlData, selectFilter);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [isBookmark, setBookmark] = useState(false);
  const handleBookMark = async () => {
    if (token) {
      setBookmarkLoader(true);
      const res = await addAndRemoveBookmark(categoryId);

      if (res) {
        setBookmark(!isBookmark);
        setBookmarkLoader(false);
      } else {
        setBookmarkLoader(false);
      }
    } else if (!token) {
      modalClick("LoginSignupModal");
    }
  };
  return (
    <>
      {isShare && <Backdrop></Backdrop>}
      <SearchedListContainer ref={scrollContainerRef}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <TitleText>{urlTitle}</TitleText>
            <Image
              style={{ width: 40, height: 40, cursor: "pointer" }}
              src={CloseModal}
              alt="Logo Outline"
              onClick={handleBack}
              // onClick={() => onClose(name)}
            />
          </div>
          <LikeCount>
            {totalVote} {urlTitle ? "likes" : ""}
          </LikeCount>
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
              <ImageContainer selected={isBookmark} onClick={handleBookMark}>
                {bookmarkLoader ? (
                  <Spin tip="Loading" size="small" />
                ) : isBookmark ? (
                  <Image
                    src={bookmarkActive}
                    style={{ color: "red" }}
                    alt="Logo Outline"
                  />
                ) : (
                  <Image
                    src={bookmark}
                    style={{ color: "red" }}
                    alt="Logo Outline"
                  />
                )}
              </ImageContainer>
              <ImageContainer selected={false} onClick={handleShare}>
                <Image src={share} alt="Logo Outline" />
              </ImageContainer>
            </div>
          </div>
        </div>

        {/* {urlData != 77 && (
                <div style={{ margin: "24px 0px" }}>
                    <FilterSection />
                </div>
            )} */}
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
                <SearchedData key={index}>
                  <MainInsideWrapper
                    onClick={() =>
                      modalClick(
                        "eventListing",
                        item,
                        item?.data_type === "google" ? item?.photoUrl : fallback
                      )
                    }>
                    <FamilyEventWrapper>
                      {item?.data_type === "google" ? (
                        item.photoUrl ? (
                          <ImageTag src={item.photoUrl} alt="Image" />
                        ) : (
                          <Image
                            // style={{ background: "white" }}
                            src={fallback}
                            width={500}
                            height={80}
                            style={{
                              borderRadius: 4,
                              width: "80px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            alt=""
                          />
                        )
                      ) : (
                        <Image
                          // style={{ background: "white" }}
                          src={fallback}
                          width={500}
                          height={80}
                          style={{
                            borderRadius: 4,
                            width: "80px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          alt=""
                        />
                      )}
                    </FamilyEventWrapper>
                    <div className="restroRating">
                      <p className="shopName">
                        {item?.data_type === "google"
                          ? item?.name
                          : item?.acf?.title}
                      </p>
                      <DetailContainer>
                        <p>{item?.rating} &nbsp;</p>
                        <Image
                          src={commentstar}
                          style={{
                            width: "13px",
                            height: "13px",
                            marginRight: 8,
                          }}
                          alt="utensils"
                        />
                        {/* <p>{item?.type}</p> */}
                      </DetailContainer>
                      {/* <p>
                    <span style={{ color: item?.opening_hours?.open_now ? "#2B902B" : "#ff0000" }}>
                      {item?.opening_hours?.open_now ? "Open" : "Closed"}
                    </span>
                  </p> */}
                    </div>
                  </MainInsideWrapper>
                  <LikesContainer
                    selected={item?.userVoted}
                    onClick={() => {
                      if (!likeLoader) {
                        handleLike(item?._id, item?.userVoted);
                      }
                    }}>
                    {likeLoader == item?._id ? (
                      <Spin tip="Loading" size="small" />
                    ) : (
                      <>
                        <ThumbsUPIcon
                          color={
                            likeLoader && likeLoader != item?.id
                              ? "gray"
                              : item?.userVoted
                              ? "#3b86ed"
                              : "#000000"
                          }
                        />
                        <p>{item?.itemVotes ? item.itemVotes : 0}</p>
                      </>
                    )}
                  </LikesContainer>
                </SearchedData>
              );
            })}

        {urlData && (
          <AddListButton>
            <CommonButton {...{ isOpen }} text="Add to the list" />
          </AddListButton>
        )}
        <Image
          className="scroll_top_desktop"
          onClick={setScrollTop}
          src={ScrollIcon}
          alt="scroll"
        />
      </SearchedListContainer>
      {/* <ScrollList background={"rgba(39, 174, 96, 1)"} /> */}
    </>
  );
};

export default CategoryEvent;

const Backdrop = styled.div`
  @media screen and (max-width: 800px) {
    background-color: gray;
    position: fixed;
    bottom: 100%;
    inset: 0px;
    opacity: 0.5;
  }
`;
const LikesContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  row-gap: 5px;

  background-color: ${(props) => (props.selected ? "#3B86ED29" : "#00000014")};
  border-radius: 15px;
  justify-content: center;
  padding: 8px 16px 8px 16px;
  min-height: 53px;
  min-width: 56px;
  p {
    color: ${(props) => (props.selected ? "#3b86ed" : "")};
    font-size: 16px;
    font-style: normal;
    font-weight: ${(props) => (props.selected ? "600" : "400")};
    // line-height: 24px; /* 150% */
  }
`;

const LikeCount = styled.p`
  font-size: 15px;
  font-weight: 400;
  font-style: italic;
  margin-top: 16px;
`;
const ImageTag = styled.img`
  width: 80px;
  border-radius: 4px;
  object-fit: cover;
  height: 80px;
  cursor: pointer;
`;

const SearchedListContainer = styled.div`
  padding: 40px;
  background-color: #fff;
  min-height: 100vh;
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
  }
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MonthText = styled.p`
  background: crimson;
  font-size: 10px;
  color: white;
  width: max-content;
  padding: 3px 8px;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80px;
  .date {
    font-size: 17px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    width: 30px;
  }

  .month {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    background-color: red;
    width: fit-content;
    color: #fff;
    width: 30px;
    border-radius: 0px 0px 4px 4px;
  }
`;

const ImageContainer = styled.div<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.selected ? "#3B86ED29" : " rgba(0, 0, 0, 0.08)"};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FamilyEventWrapperInside = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background: white;
  border-radius: 4px;
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
  text-transform: capitalize;
`;

const AddListButton = styled.div`
  padding-top: 20px;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  flex: 1;
`;

const ScrollMain = styled.div`
  background: rgba(255, 255, 255, 0.3);
`;
