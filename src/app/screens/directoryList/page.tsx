"use client";

import React, { useState } from "react";
import HeaderScreen from "../../../components/header/HeaderScreen";
import SearchModalScreen from "../../../components/AllModalScreen/SearchModalScreen";
import ProfileAccountModalScreen from "../../../components/AllModalScreen/ProfileAccountModalScreen";
import ProfileMylistModalScreen from "../../../components/AllModalScreen/ProfileMylistModalScreen";
import { useMyContext } from "../../../app/Context/MyContext";
import styled from "styled-components";
import Image from "next/image";
import { DirectoryItem } from "@/app/utils/homeIcon";
import { useRouter } from "next/navigation";
import { sideWidth } from "../../../app/utils/date";
import PageLayout from "../../../app/pageLayout";

type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";
const width = "580";

const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: ${sideWidth};
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const DirectoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0px 40px;
  padding-bottom: 17px;

  img {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 800px) {
    margin: 0px 16px;
  }
`;

const DirectoryMenuTitle = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  text-transform: capitalize;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;

  @media screen and (max-width: 420px) {
    gap: 10px;
  }
`;

const FirstMainWraaper = styled(MainWrapper)`
  /* flex: 2; */
  @media screen and (max-width: 420px) {
    /* flex: 1; */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #f2f3f3;
  width: ${sideWidth};
  /* height: 100%; */
  height: auto;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
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

const TitltCategory = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-left: 40px;
  margin-top: 24px;

  @media screen and (max-width: 800px) {
    margin-left: 16px;
  }
`;

const Directorylist = () => {
  const { showMap, modalName, modalClick, filterUrls } = useMyContext();

  const options = ["Lists", "Places"];
  const mylistoptions = ["Created", "Contributed"];
  const [tabValue, setTabValue] = useState("Lists");
  // const [showMap, setShowMap] = useState<boolean>(false);

  const tabChange = (value: tabs) => {
    setTabValue(value);
  };

  const router = useRouter();

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else if (item === "directoryList") {
      router.push("/screens/directoryList");
    } else if (item === "Shop") {
      router.push("/screens/wellbeing");
    } else if (item === "Events") {
      router.push("/screens/events");
    } else if (item === "Tours") {
      router.push("/screens/stays");
    } else if (item === "Hotels") {
      router.push("/screens/scaffolding");
    } else if (item === "Activities") {
      router.push("/screens/experiences");
    } else if (item === "Travel") {
      router.push("/screens/attractions");
    } else if (item === "Nightlife") {
      router.push("/screens/financial");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    }
  };

  const [myListtabValue, setMyListTabValue] = useState("Created");

  const myListtabChange = (value: mylisttabs) => {
    setMyListTabValue(value);
  };

  return (
    <PageLayout>
      <CategoryBody>
        <HeaderScreen />
        <Container>
          <TitltCategory> All Categories</TitltCategory>
          {DirectoryItem.map((item:any, index:any) => (
            <DirectoryWrapper key={index}>
              <FirstMainWraaper>
              {item.data[0].image}
              <DirectoryMenuTitle onClick={() =>  menuClick(item.data[0].url, true, "Directory")}>
                  {item.data[0].title}
                </DirectoryMenuTitle>
              </FirstMainWraaper>
              <MainWrapper>
              {item.data[1]?.image}
              <DirectoryMenuTitle onClick={() =>  menuClick(item.data[1]?.url, true, "Directory")}>
                  {item.data[1]?.title}
                </DirectoryMenuTitle>
              </MainWrapper>
            </DirectoryWrapper>
          ))}
        </Container>
        {/* <CategorieList /> */}
      </CategoryBody>
      <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen
        {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
      />
    </PageLayout>
  );
};

export default Directorylist;
