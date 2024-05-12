import { ThumbsUPIcon, commentstar, locationMark, thumbsup } from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterSection from "@/components/filterSection";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface EventBoxProps {
    urlData?: any;
    urlTitle?: string;
    filteredUrls?: any;
    loader?: boolean;
    isOpen?: any;
    handleLike?: any;
    totalVote?: any;
}

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
`;

const AddListButton = styled.div`
  padding-top: 20px;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CategoryEvent: React.FC<EventBoxProps> = ({
    urlTitle,
    urlData,
    filteredUrls,
    loader,
    isOpen,
    handleLike,
    totalVote,
}) => {
    const { modalClick } = useMyContext();
    const [togg, setTogg] = useState<string>('')
    const skeletonItems = new Array(10).fill(null);



    // const handleLike = (id: string, index: number) =>{
    //     if(id === data[index]._id){
    //             data[index].userVoted = !data[index].voded
    //             setData([...data])
    //     }

    //     // setTogg(id)
    // }

    return (
        <SearchedListContainer>
            <TitleText>{urlTitle}</TitleText>
            <LikeCount>{totalVote} likes</LikeCount>
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
                : urlData?.map((item: any, index: any) => {
                    return (
                        <SearchedData key={index}>
                            <MainInsideWrapper>
                                <FamilyEventWrapper>
                                    <Image
                                        src={item?.data_type === "google" ? item?.photoUrl : filteredUrls[index]}
                                        alt=""
                                        width={500}
                                        height={80}
                                        style={{
                                            borderRadius: 4,
                                            // maxWidth: "100%",
                                            width: "80px",
                                            objectFit: "cover",
                                        }}
                                        onClick={() =>
                                            modalClick("eventListing", item, item?.data_type === "google" ? item?.photoUrl : filteredUrls[index])
                                        }
                                    />
                                    <FamilyEventWrapperInside>
                                        {/* <p className="date">
                                            {formatDate(item.acf.event_dates[0].date)}
                                        </p>
                                        <p className="month">
                                            {formatMonth(item.acf.event_dates[0].date)}
                                        </p> */}
                                    </FamilyEventWrapperInside>
                                </FamilyEventWrapper>
                                <div className="restroRating">
                                    <p className="shopName">{item?.data_type === "google" ? item?.name : item?.acf?.title}</p>
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
                                        <p>{item?.type}</p>
                                    </DetailContainer>
                                    <p>
                                        <span style={{ color: '#2B902B' }}>
                                            {item?.opening_hours?.open_now ? "Open" : "Close"}
                                        </span>
                                    </p>
                                </div>
                            </MainInsideWrapper>
                            <LikesContainer selected={item?.userVoted} onClick={() => handleLike(item?._id, item?.userVoted)}>
                                {/* <Image
                                    style={{ width: 16, height: "auto" }}
                                    src={thumbsUPIcon}
                                    alt="icon"
                                /> */}
                                <ThumbsUPIcon color = {item?.userVoted ? "#3b86ed" : "#000000"} />
                                <p>{item?.itemVotes}</p>
                            </LikesContainer>

                        </SearchedData>
                    );
                })}

            <AddListButton>
                <CommonButton {...{ isOpen }} text="Add to the list" />
            </AddListButton>
        </SearchedListContainer>
    );
};

export default CategoryEvent;



const LikesContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  flex-Direction: column;
  cursor: pointer;
  width:60px;
  height:50px;
  background-color: ${props => (props.selected ? '#3B86ED29' : '#00000014')};
  border-radius: 15px;
  justify-content: center;

  p {
    color: ${props => (props.selected ? '#3b86ed' : '')};
    font-size: 16px;
    font-style: normal;
    font-weight: ${props => (props.selected ? '600' : '400')};
    line-height: 24px; /* 150% */
  }
`;

const LikeCount = styled.p`
  font-size: 15px;
  font-weight: 400;
  font-style: italic;
  margin-top: 16px;
`;