import {
  ThumbsUPIcon,
  commentstar,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CloseModal } from "@/app/utils/ImagePath";
import { useRouter } from 'next/navigation';
import fallback from '../../../assets/images/fallbackimage.png'
import FilterSection from "../filterSection";
import { handleFilter } from "@/app/utils/mappingFun";

interface EventBoxProps {
  urlData?: any;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
  isOpen?: any;
  handleLike?: any;
  totalVote?: any;
}



const CategoryEvent: React.FC<EventBoxProps> = ({
  urlTitle,
  urlData,
  loader,
  isOpen,
  handleLike,
  totalVote,
}) => {
  const { modalClick, selectFilter, setSelectFilter } = useMyContext();
  const skeletonItems = new Array(10).fill(null);
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace('/');
    }
    setSelectFilter("Any")
  }

  const filterDate = handleFilter(urlData, selectFilter)

  return (
    <SearchedListContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <TitleText>{urlTitle}</TitleText>
          <LikeCount>
            {totalVote} {urlTitle ? "likes" : ""}
          </LikeCount>
          <FilterSection pageTitle = "categoryEvent"  />
        </div>
        <Image
          style={{ width: 40, height: 40, cursor: "pointer" }}
          src={CloseModal}
          alt="Logo Outline"
          onClick={handleBack}
        // onClick={() => onClose(name)}
        />
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
              <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
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
                  modalClick("eventListing", item, item?.data_type === "google" ? item?.photoUrl : fallback)
                }
              >
                <FamilyEventWrapper>
                  {
                    item?.data_type === "google" ?
                      item.photoUrl ?
                        <ImageTag src={item.photoUrl} alt="Image"
                        /> :
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
                      :
                      (
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
                onClick={() => handleLike(item?._id, item?.userVoted)}
              >
                <ThumbsUPIcon
                  color={item?.userVoted ? "#3b86ed" : "#000000"}
                />
                <p>{item?.itemVotes}</p>
              </LikesContainer>
            </SearchedData>
          );
        })}

     { urlData && <AddListButton>
        <CommonButton {...{ isOpen }} text="Add to the list" />
      </AddListButton>}
    </SearchedListContainer>
  );
};

export default CategoryEvent;

const LikesContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  min-width: 70px;
  height: 60px;
  background-color: ${(props) => (props.selected ? "#3B86ED29" : "#00000014")};
  border-radius: 15px;
  justify-content: center;

  p {
    color: ${(props) => (props.selected ? "#3b86ed" : "")};
    font-size: 16px;
    font-style: normal;
    font-weight: ${(props) => (props.selected ? "600" : "400")};
    line-height: 24px; /* 150% */
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
  background-color: #f2f3f3;
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