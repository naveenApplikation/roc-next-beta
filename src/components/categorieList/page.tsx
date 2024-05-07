"use client"

import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import { utensil,shopping,hotel,personHiking,castle,holidayDas,beachumbrella,camera, compass ,glass} from "@/app/utils/ImagePath";
import HeaderScreen from '@/components/header/HeaderScreen'
import { sideWidth } from '@/app/utils/date';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: #f2f3f3;
    width: ${sideWidth};
    height: 100vh;
    @media screen and (max-width: 800px) {
    width: 100%;
  }
`

const DirectoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0px 40px;
  padding-bottom: 17px;

  img{
    width: 16px;
    height: 16px;
  }

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
  justify-content: flex-start;
  gap: 15px;
  flex: 1;
`;

const FirstMainWraaper = styled(MainWrapper)`
  /* flex: 2; */
  @media screen and (max-width: 420px) {
    /* flex: 1; */
  }
`

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

const TitltCategory = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-left: 40px;
    margin-top: 24px;

    @media screen and (max-width: 800px) {
     margin-left: 16px;
  }
`

const CategorieList = () => {
  return (
    <>
   {/* <HeaderScreen /> */}
    <Container>
   <TitltCategory>All Categories</TitltCategory>
       <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={castle}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Attractions</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={utensil}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Food & Drink</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={shopping}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Shopping</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={camera}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Tours</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={hotel}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Hotels</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={personHiking}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Activities</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={compass}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Travel</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={glass}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Nightlife</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={beachumbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={beachumbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={beachumbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={beachumbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
      <DirectoryWrapper>
        <FirstMainWraaper>
          <Image
            src={holidayDas}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Holidays</DirectoryMenuTitle>
        </FirstMainWraaper>
        <MainWrapper>
          <Image
            src={beachumbrella}
            alt="right icon"
          />{" "}
          <DirectoryMenuTitle>Beaches</DirectoryMenuTitle>
        </MainWrapper>
      </DirectoryWrapper>
    </Container>
    </>
  )
}

export default CategorieList