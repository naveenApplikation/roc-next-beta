"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { commentstar } from "@/app/utils/ImagePath";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import UnselectedBtnImg from "../../../assets/images/createListImages/check.png";
import SelectedBtnImg from "../../../assets/images/createListImages/plus-circle.png";
import SearchComponent from "@/components/searchInput/SearchInput";
import ListOptions from "./CreateList Components/ListOptions";
import Image from "next/image";
import FilterImg from "../../../assets/images/createListImages/filterlist.png";
import CreateListItems from "./CreateList Components/CreateListItems";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import CurrencySign from "../../../assets/images/createListImages/currencySign.png";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import FilterSection from "@/components/filterSection";
import Skeleton from "react-loading-skeleton";
import ImageCom from "../addList/imageCom";
import fallbackimage from '../../../assets/images/fallbackimage.png'
import { log } from "console";

interface CreateListingsProps {
  ScreenSwitch?: Function;
  homePage: any;
  toggleSelected: any;
  selectedItemIds: any;
  searchQuery: string;
  handleSearch: (value: string) => void;
  handleChange?: any;
  data: any[];
  loader?: boolean;
  UI_Type?: string;
}





const CreateListings: React.FC<CreateListingsProps> = ({
  ScreenSwitch,
  homePage,
  selectedItemIds,
  toggleSelected,
  handleSearch,
  handleChange,
  searchQuery,
  data,
  loader,
  UI_Type,
}) => {


  const [skeletonData] = useState(new Array(10).fill(null))


  return (
    <CreateListingsScreen>
      <CreateListItemScrollBox>
        <CreateListingsHeader homePage={homePage}{...{ UI_Type }} />
        <CreateListingsContent>
          <AddListingsTitle>Add business to your list</AddListingsTitle>
          <SearchInputBox>
            <SearchComponent
              value={searchQuery}
              onchange={(e: any) => handleChange(e.target.value)}
              handleSearch={handleSearch}
              loader={loader}
            />
          </SearchInputBox>
          {loader ?
            skeletonData.map((item, index) => (
              <SearchedData key={index}>
                <MainWrraper>
                  <MainInsideWrapper>
                    <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
                    <div className="restroRating">
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                    </div>
                  </MainInsideWrapper>
                  <div className="likes" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                    <Skeleton width={16} height={16} style={{ borderRadius: "50%" }} />
                  </div>
                </MainWrraper>
              </SearchedData>
            ))

            :
            (
              data?.map((item: any, index: number) => {
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 16, width: '100%' }}
                    key={index}>
                    <ListDataWrraper>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          width: '85%',
                        }}>
                        <div style={{ width: 80, height: 80 }}>
                          {
                            item?.photos ?
                              <ImageCom imageArr={item?.photos} />
                              :
                              <Image
                                src={fallbackimage}
                                width={500}
                                height={80}
                                style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
                                alt="infoCirlce"
                              />
                          }
                        </div>
                        <div style={{
                          display: "flex",
                          gap: 10,
                          flexDirection: "column",
                          maxWidth: 'calc(100% - 30%)'
                        }}>
                          <ListDataTittleText>
                            {item?.name}
                          </ListDataTittleText>
                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <ListDataInfoText>
                              {item?.acf?.aa_rating
                                ? item?.acf?.aa_rating.value == "No rating"
                                  ? ""
                                  : item?.acf?.aa_rating.value
                                : item?.rating}
                            </ListDataInfoText>
                            <Image src={commentstar} alt="infoCirlce" />
                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>

                              {
                                item?.acf?.portal_post_owner_name ? (
                                  <ListDataInfoText>
                                    . {item?.acf?.portal_post_owner_name}
                                  </ListDataInfoText>
                                ) : null
                              }
                              {/* <ListDataInfoText className="type_style">. {item?.types ? (item?.types[0]) : ""}</ListDataInfoText> */}
                            </div>
                          </div>
                          {/* <p>
                            <span style={{ color: item?.opening_hours?.open_now ? "#2B902B" : "#ff0000", fontSize: '14px', fontWeight: '500' }}>
                              {item?.opening_hours?.open_now ? "Open" : "Closed"}
                            </span>
                          </p> */}

                        </div>
                      </div>
                      <div onClick={() => toggleSelected(item.place_id, item)}>
                        {selectedItemIds.includes(item.place_id) ? (
                          <UnselectedBtn>
                            <Image
                              style={{ width: "15px", height: "10px" }}
                              src={UnselectedBtnImg}
                              alt="UnselectedBtnImg"
                            // onClick={() => handleToggle(listItemName)}
                            />
                          </UnselectedBtn>
                        ) : (
                          <SelectedBtn>
                            <Image
                              style={{ width: "16px", height: "16px" }}
                              src={SelectedBtnImg}
                              alt="SelectedBtnImg"
                            />
                          </SelectedBtn>
                        )}
                      </div>
                    </ListDataWrraper>
                  </div>
                );
              }))}
        </CreateListingsContent>
      </CreateListItemScrollBox>
      <CreateListingsFooter
        continueBtn
        ScreenSwitch={ScreenSwitch}
        selectedItem={selectedItemIds.length}
      />
    </CreateListingsScreen>
  );
};

export default CreateListings;


const CreateListingsScreen = styled.div`
  width: 480px;
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const CreateListingsContent = styled.div`
  width: 100%;
  height: auto;
  padding: 40px 0px 0px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
`;

const AddListingsTitle = styled.div`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: 400px) {
    padding-right: 10px;
  }
`;

const CreateListOptions = styled.div`
  width: 100%;
  height: 33px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SearchInputBox = styled.div`
  /* margin-right: 24px; */
  padding-right: 24px;
  @media screen and (max-width: 400px) {
    padding-right: 10px;
  }
`;

const CreateListItemScrollBox = styled.div`
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  padding-bottom: 100px;
`;

const ListDataWrraper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px 0px;
  position: relative;
`;

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
   &.type_style{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width:85%;
 }
`;

const UnselectedBtn = styled.div`
  width: 48px;
  height: 81px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: var(--MAIN, #2f80ed);
  background: #27ae60;
  border-style: none;
  cursor: pointer;
  position: absolute;
  right: 24px;
  top: 10px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;

const SelectedBtn = styled.button`
  width: 48px;
  height: 81px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: #2f80ed;
  border-style: none;
  cursor: pointer;
  position: absolute;
  right: 24px;
  top: 10px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;

const ListDataTime = styled.p`
  color: #2b902b;
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

const MainWrraper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  width: 95%;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;