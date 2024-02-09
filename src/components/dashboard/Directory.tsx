import React from "react";
import castle from "../../../assets/images/rightSideMenuImage/castle.png";
import glass from "../../../assets/images/rightSideMenuImage/glass.png";
import hiking from "../../../assets/images/rightSideMenuImage/hiking.png";
import holiday from "../../../assets/images/rightSideMenuImage/holiday.png";
import hotel from "../../../assets/images/rightSideMenuImage/hotel.png";
import shop from "../../../assets/images/rightSideMenuImage/shop.png";
import tour from "../../../assets/images/rightSideMenuImage/tour.png";
import travel from "../../../assets/images/rightSideMenuImage/travel.png";
import umbrella from "../../../assets/images/rightSideMenuImage/umbrella.png";
import calender from "../../../assets/images/rightSideMenuImage/calender.png";
import utensils from "../../../assets/images/utensils.png";
import Image from "next/image";
import styled from "styled-components";

const DirectoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0px 40px;
  padding-bottom: 17px;

  @media screen and (max-width: 800px) {
    margin: 0px 16px;
  }
`;

const DirectoryMenuTitle = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

const AddButton = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: #fff;
  border: none;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.08);
  margin: 0px 40px;
  color: #2f80ed;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    margin: 0px 16px;
  }
`;

const Directory = () => {
  return (
    <>
      {/* <DirectoryWrapper>
              {DirectoryMenu.map((item,index) => {
                return (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Image
                      style={{ width: "10px", height: "16px" }}
                      src={item.image}
                      alt="right icon"
                    />{" "}
                    <DirectoryMenuTitle>{item.name}</DirectoryMenuTitle>
                  </div>
                );
              })}
            </DirectoryWrapper> */}
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={castle}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Attractions</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={utensils}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Food & Drink</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={shop}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Shopping</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={tour}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Tours</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={hotel}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Hotels</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={hiking}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Activities</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={travel}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Travel</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={glass}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Nightlife</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={holiday}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={umbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <AddButton>Add to Directory</AddButton>
    </>
  );
};

export default Directory;
