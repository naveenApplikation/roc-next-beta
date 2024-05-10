import { locationMark } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
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
}) => {
    const { modalClick } = useMyContext();

    const skeletonItems = new Array(10).fill(null);

    return (
        <SearchedListContainer>
            <TitleText>{urlTitle}</TitleText>
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
                                        src={filteredUrls[index]}
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
                                            modalClick("eventListing", item, filteredUrls[index])
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
                                    <p className="shopName">{item.acf.title}</p>
                                    <DetailContainer>
                                        <Image
                                            src={locationMark}
                                            style={{
                                                width: "13px",
                                                height: "13px",
                                                marginRight: 8,
                                            }}
                                            alt="utensils"
                                        />
                                        <p>{item.acf.parish.label}</p>
                                    </DetailContainer>
                                    {/* <p>
                                        <span>
                                            {item.acf.event_dates[0].start_time} -{" "}
                                            {item.acf.event_dates[0].end_time}
                                        </span>
                                    </p> */}
                                </div>
                            </MainInsideWrapper>
                        </SearchedData>
                    );
                })}

            <AddListButton>
                <CommonButton {...{isOpen}} text="Add to the list" />
            </AddListButton>
        </SearchedListContainer>
    );
};

export default CategoryEvent;
