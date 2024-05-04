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

interface CreateListingsProps {
  ScreenSwitch?: Function;
  homePage: any;
  toggleSelected: any;
  selectedItemIds: any;
  searchQuery: string;
  handleSearch: (value: string) => void;
  data: any[];
}

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

const newFilter = [
  {
    _id: "item 1",
    name: "Chocadyllic",
    placeName1: "St Helier",
    itemPlaceLogo: "StHelierLogo",
    status1: "Open ⋅ Closes",
    timing2: "11 pm",
    unSelectedBtn: false,
  },
  {
    id: "item 2",
    name: "Kalimukti Yoga",
    placeName1: "From £5",
    itemPlaceLogo: "StHelierLogo",
    status1: "Outdoore",
    timing2: "11 pm",
    unSelectedBtn: false,
  },
  {
    id: "item 3",
    name: "Radisson Blu Waterfront Hotel",
    placeName1: "From £265/night",
    itemPlaceLogo: "StHelierLogo",
    status1: "St Helier",
    timing2: "11 pm",
    unSelectedBtn: false,
  },
  {
    id: "item 4",
    name: "abrdn",
    placeName1: "Investment Managers",
    itemPlaceLogo: "StHelierLogo",
    status1: "Open ⋅ Closes",
    timing2: "11 pm",
    unSelectedBtn: false,
  },
];

interface Item {
  name: any;
  placeName1: any;
  itemPlaceLogo: any;
  status1: any;
  timing2: any;
  unSelectedBtn: any;
  placeName2?: any; // Make it optional
}

const CreateListings: React.FC<CreateListingsProps> = ({
  ScreenSwitch,
  homePage,
  selectedItemIds,
  toggleSelected,
  handleSearch,
  searchQuery,
  data,
}) => {
  const [toggle, setToggle] = useState<any[]>(newFilter);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  // const toggleSelected = (itemId: any): void => {
  //   const selectedIndex: number = selectedItemIds.indexOf(itemId);
  //   if (selectedIndex === -1) {
  //     setSelectedItemIds([...selectedItemIds, itemId]);
  //   } else {
  //     const updatedSelectedItems: number[] = [...selectedItemIds];
  //     updatedSelectedItems.splice(selectedIndex, 1);
  //     setSelectedItemIds(updatedSelectedItems);
  //   }
  // };
  return (
    <CreateListingsScreen>
      <CreateListItemScrollBox>
        <CreateListingsHeader homePage={homePage} />
        <CreateListingsContent>
          <AddListingsTitle>Add business to your list</AddListingsTitle>
          <SearchInputBox>
            <SearchComponent
              value={searchQuery}
              onchange={(e: any) => handleSearch(e.target.value)}
            />
          </SearchInputBox>
          {searchQuery &&
            data.map((item: any, index: any) => {
              if (!item._id) {
                return null;
              }
              const imageList = JSON.parse(item.acf.header_image_data);
              const image = imageList[0].url;

              return (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16, width:'100%' }}
                  key={index}>
                  <ListDataWrraper>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        width:'85%',
                      }}>
                      <div style={{ width: 80, height: 80 }}>
                        <Image
                          src={image}
                          width={80}
                          height={80}
                          style={{ borderRadius: 4 }}
                          alt="infoCirlce"
                        />
                      </div>
                      <div style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
                        maxWidth: 'calc(100% - 30%)'
                      }}>
                        <ListDataTittleText>
                          {item.acf.title}
                        </ListDataTittleText>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <ListDataInfoText>
                            {item.acf.aa_rating
                              ? item.acf.aa_rating.value == "No rating"
                                ? ""
                                : item.acf.aa_rating.value
                              : ""}
                          </ListDataInfoText>
                          <Image src={commentstar} alt="infoCirlce" />
                          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>

                            {
                              item.acf.portal_post_owner_name ? (
                                <ListDataInfoText>
                                  . {item.acf.portal_post_owner_name}
                                </ListDataInfoText>
                              ) : null
                            }
                            <ListDataInfoText>. {item.type}</ListDataInfoText>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleSelected(item._id)}>
                      {selectedItemIds.includes(item._id) ? (
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
                    </button>
                  </ListDataWrraper>
                </div>
              );
            })}
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
