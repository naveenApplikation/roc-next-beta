"use client";

import React, { useState } from "react";
import styled from "styled-components";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import SearchComponent from "@/components/searchInput/SearchInput";
import ListOptions from "./CreateList Components/ListOptions";
import Image from "next/image";
import FilterImg from "../../../assets/images/createListImages/filterlist.png";
import CreateListItems from "./CreateList Components/CreateListItems";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import CurrencySign from "../../../assets/images/createListImages/currencySign.png";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import FilterSection from '@/components/filterSection';

interface CreateListingsProps {
  ScreenSwitch?: Function
  homePage: any
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
`;

const CreateListItemScrollBox = styled.div`
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  padding-bottom: 100px;
`;
const newFilter = [
  { name: "Chocadyllic", placeName1: "St Helier", itemPlaceLogo: StHelierLogo, status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
  { name: "Kalimukti Yoga", placeName1: "From £5", itemPlaceLogo: StHelierLogo, status1: "Outdoore", timing2: "11 pm", unSelectedBtn: false },
  { name: "Radisson Blu Waterfront Hotel", placeName1: "From £265/night", itemPlaceLogo: StHelierLogo, status1: "St Helier", timing2: "11 pm", unSelectedBtn: false },
  { name: "abrdn", placeName2: "Investment Managers", itemPlaceLogo: StHelierLogo, status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
]

const CreateListings: React.FC<CreateListingsProps> = ({ ScreenSwitch, homePage }) => {

  const [toggle, setToggle] = useState<any[]>(newFilter);

  const handleToggle = (name: string, index: any) => {

    console.log("name", name)

    if (name === newFilter[index].name) {
      toggle[index].unSelectedBtn = !toggle[index].unSelectedBtn
      setToggle([...toggle])
    } 
  }


  return (
    <CreateListingsScreen>
      <CreateListItemScrollBox>
        <CreateListingsHeader homePage={homePage} />
        <CreateListingsContent>
          <AddListingsTitle>Add listings</AddListingsTitle>
          <SearchInputBox>
            <SearchComponent />
          </SearchInputBox>
          <FilterSection />
          {/* <CreateListOptions>
            <Image
              style={{
                width: "32px",
                height: "20px",
                opacity: 0.72,
                cursor: "pointer",
              }}
              src={FilterImg}
              alt="OptionListIcon"
            />
            <ListOptions optionText="Sort by" />
            <ListOptions optionText="Parish" />
            <ListOptions optionText="Category" />
            <ListOptions optionText="Best of" />
          </CreateListOptions> */}
          <div>
            {
              toggle.map((val: any, index: any) => {
                return (
                  <CreateListItems
                    key={index}
                    listItemName={val?.name}
                    index={index}
                    secondLineDetails1
                    itemPlaceLogo={StHelierLogo}
                    placeName1={val?.placeName1}
                    thirdLineDetails1
                    // status1={val?.status1}
                    // timing2={val?.timing2}
                    unSelectedBtn={val.unSelectedBtn}
                    handleToggle={handleToggle}
                  />

                )
              })
            }
            {/* <CreateListItems
              listItemName="Chocadyllic"
              secondLineDetails1
              itemPlaceLogo={StHelierLogo}
              placeName1="St Helier"
              thirdLineDetails1
              status1="Open ⋅ Closes"
              timing2="11 pm"
              unSelectedBtn={toggle === "Chocadyllic" ? true : false}
              handleToggle={handleToggle}
            />
            <CreateListItems
              listItemName="Kalimukti Yoga"
              secondLineDetails1
              itemPlaceLogo={CurrencySign}
              placeName1="From £5"
              thirdLineDetails2
              status2="Outdoors"
              timing3="11 pm"
              unSelectedBtn={toggle === "Kalimukti Yoga" ? true : false}
              handleToggle={handleToggle}
            />
            <CreateListItems
              listItemName="Radisson Blu Waterfront Hotel"
              secondLineDetails1
              itemPlaceLogo={CurrencySign}
              placeName1="From £265/night"
              ratedStar
              ratingStarImage={RatingStarImage}
              starRating={4.7}
              thirdLineDetails2
              status2="St Helier"
              timing3="11 pm"
              unSelectedBtn={toggle === "Radisson Blu Waterfront Hotel" ? true : false}
              handleToggle={handleToggle}
            />
            <CreateListItems
              listItemName="abrdn"
              secondLineDetails2
              itemPlaceLogo={false}
              placeName2="Investment Managers"
              timing1="11pm"
              unSelectedBtn={toggle === "abrdn" ? true : false}
              handleToggle={handleToggle}
            /> */}
          </div>
        </CreateListingsContent>
      </CreateListItemScrollBox>
      <CreateListingsFooter continueBtn ScreenSwitch={ScreenSwitch} />
    </CreateListingsScreen>
  );
};

export default CreateListings;
