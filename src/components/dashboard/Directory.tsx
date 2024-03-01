import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { utensil,shopping,hotel,personHiking,castle,holidayDas,beachumbrella,camera, compass ,glass} from "@/app/utils/ImagePath";

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
            src={castle}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Attractions</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            src={utensil}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Food & Drink</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            src={shopping}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Shopping</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            src={camera}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Tours</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            src={hotel}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Hotels</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            src={personHiking}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Activities</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            src={compass}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Travel</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            src={glass}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Nightlife</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <MainWrapper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </MainWrapper>
        <MainWrapper style={{ justifyContent: "flex-start" }}>
          <Image
            src={beachumbrella}
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
