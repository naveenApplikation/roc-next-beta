

import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../assets/images/fallbackimage.png";


interface listSearchProps {
    filterData?: any;
    orignalData?: any;
    loading?: boolean;
}

const WhatsOn: React.FC<listSearchProps> = ({ filterData, orignalData, loading }) => {
    const [skeletonData] = useState(new Array(10).fill(null));
    const { modalClick } = useMyContext();


    // console.log("orignalDataorignalDataorignalData", filterData, orignalData)


    return (
        <>
            {loading ? (
                skeletonData.map((item, index) => (
                    <SearchedData key={index}>
                        <MainInsideWrapper>
                            <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
                            <div className="restroRating">
                                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                            </div>
                        </MainInsideWrapper>
                    </SearchedData>
                ))
            ) : (
                <ScrollingMenu>
                    {
                        filterData?.map((item: any, index: any) => {
                            return (
                                <TopAttractionContainer
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        modalClick(
                                            "ModalContent",
                                            orignalData[index],
                                            item?.data_type === "google"
                                                ? item?.image
                                                : fallback
                                        )
                                    }>
                                    <TopAttractionprofile>
                                        <ImageTag src={item?.image} alt="Image" />
                                    </TopAttractionprofile>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 10,
                                            flexDirection: "column",
                                            maxWidth: "calc(100% - 30%)",
                                        }}>
                                        <ListDataTittleText>{item?.title}</ListDataTittleText>

                                        <ListDataInfoText>
                                            {item?.type}
                                        </ListDataInfoText>
                                        <ListDataInfoText>
                                            {item?.date}
                                        </ListDataInfoText>
                                    </div>
                                </TopAttractionContainer>
                            );
                        })
                    }
                </ScrollingMenu>

            )}
        </>
    );
};

export default WhatsOn;



const ListDataTittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ListDataInfoText = styled.p`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;

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
  p span {
    color: #2b902b;
  }
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const ScrollingMenu = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-height: calc(100dvh - 285px);
  overflow: auto;
    &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const TopAttractionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
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
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-size: contain;
`;

const ImageTag = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
  height: 100%;
`;
