"use client";

import React from "react";
import styled from "styled-components";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import CreateListItems from "./CreateList Components/CreateListItems";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import CurrencySign from "../../../assets/images/createListImages/currencySign.png";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import { utensils } from "../utils/ImagePath";

interface DragInOrderProps { }

const DragInOrderScreen = styled.div`
    width: 390px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), #FF0;
    background-blend-mode: normal, luminosity;
    box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(22px);
`;

const DragInOrderContent = styled.div`
    width: 100%;
    height: auto;
    padding: 40px 0px 0px 24px;  
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
`;

const DragInOrderTitle = styled.div`
    color: var(--BODY, #000);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const DragInOrderListScrollBox = styled.div`
    height: 450px;
    overflow-y: scroll;
    scrollbar-width: none;
`;


const DragInOrder: React.FC<DragInOrderProps> = () => {
    return (
        <DragInOrderScreen>
            <CreateListingsHeader />
            <DragInOrderContent>
                <DragInOrderTitle>Drag in order</DragInOrderTitle>
                {/*  DRAG AND DROP COMPONENTS  */}
                <DragInOrderListScrollBox>
                    <CreateListItems
                        dragBtn
                        listItemName="Kyomu"
                        secondLineDetails1
                        itemPlaceLogo={utensils}
                        placeName1="St Helier"
                        ratedStar
                        ratingStarImage={RatingStarImage}
                        starRating={4.7}
                        thirdLineDetails1
                        status1="Open ⋅ Closes"
                        timing2="11 pm"
                        newText
                        delivery
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="Chocadyllic"
                        secondLineDetails1
                        itemPlaceLogo={StHelierLogo}
                        placeName1="St Helier"
                        thirdLineDetails1
                        status1="Open ⋅ Closes"
                        timing2="11 pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="Kalimukti Yoga"
                        secondLineDetails1
                        itemPlaceLogo={CurrencySign}
                        placeName1="From £5"
                        thirdLineDetails2
                        status2="Outdoors"
                        timing3="11 pm"
                    />
                    <CreateListItems
                        dragBtn
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
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="abrdn"
                        marginTop="14px"
                        secondLineDetails2
                        itemPlaceLogo={false}
                        placeName2="Investment Managers"
                        timing1="11pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="C&M Scaffolding"
                        secondLineDetails3
                        ratingStarImage={RatingStarImage}
                        starRating={4.7}
                        thirdLineDetails2
                        status2="Competitive rates. Fast & efficient service. Scaffolding erected to CISRS standards"
                    />
                </DragInOrderListScrollBox>
            </DragInOrderContent>
            <CreateListingsFooter footerBtns firstBtnText="Select more" />
        </DragInOrderScreen>
    )
}

export default DragInOrder;
