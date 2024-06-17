"use client"

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { LogoNew, Hamburger, profileBrown } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { rightSideMenu, rightSideMenuMobile } from "@/app/utils/data";
import { useRouter } from "next/navigation";

const RightSideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  gap: 24px;
  position: absolute;
  top: 60px;
  right: 30px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px;
    height: auto;
    overflow: hidden;
    flex-direction: row;
    display: none;
  }
`;

const RightSideHeadMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    /* padding: 0px 16px; */
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
`;

const HeaderMapProfileContainer = styled.div`
  display: flex;
  /* align-items:center; */
  gap: 16px;
`;

const RightSideMenu = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const RightSideInsideMenuBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 129px;
  height: 64px;
  padding: 16px 24px;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;
  .iconSize {
    width: 22px;
    height: auto;
  }

  p {
    /* font-family: Inter; */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media screen and (max-width: 800px) {
      color: white;
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(40px);
  }
  @media screen and (max-width: 530px) {
    flex-direction: column;
  }
  @media screen and (max-width: 450px) {
    padding: 8px;
  }
`;

const RightMenu = styled.div`
  position: fixed;
  right: 24px;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    height: 510px;
    padding: 16px;
    padding-bottom: 35px;
    position: relative;
    top: 0;
    width: 100%;
    right: 0;
    background-position: 50% 50%;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/bg.jpg?alt=media&token=4e087624-53c1-4826-9930-74c63c902b72);
    background-size: cover;
  }
`;

const MobileViewRightSideMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    /* z-index: 23; */
  }
`;

const AllCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(40px);

  button {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.16);
    border: none;
    border-radius: 8px;
    padding: 12px 8px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: __Inter_aaf875, __Inter_Fallback_aaf875;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const RightSide = () => {
  const { modalClick, showMap, iconClick } = useMyContext();

  const router = useRouter();

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
    }
  };

  const click = (item: any) => {
    if (item.name === "Map") {
      iconClick("mapClick");
    }
  };

  return (
    <RightMenu>
      <RightSideHeadMenu>
        <Image src={LogoNew} width={117} height={48} alt="Logo Outline" />
        <HeaderMapProfileContainer>
          <Image
            src={profileBrown}
            width={48}
            height={48}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          />
          {/* <Image
            src={showMap ? headerHome : mapNew}
            alt="Logo Outline"
            onClick={() => iconClick("mapClick")}
          /> */}
          <Hamburger onClick={() => modalClick("LoginSignupModal")} />
        </HeaderMapProfileContainer>
      </RightSideHeadMenu>
      <RightSideMenuContainer>
        {rightSideMenu.map((item, index) => {
          return (
            <RightSideMenu
              key={index}
              onClick={() =>
                menuClick(
                  index == 3 ? item.name : item.url,
                  index == 3 ? true : false,
                  index == 3 ? item.url : item.id
                )
              }>
              <RightSideInsideMenuBox>
                <Image
                  style={{
                    width: item.name == "All" ? "22px" : "auto",
                    height: item.name == "All" ? "auto" : "revert-layer",
                  }}
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="icon"
                />
                <p>{item.name}</p>
              </RightSideInsideMenuBox>
            </RightSideMenu>
          );
        })}
      </RightSideMenuContainer>
      <MobileViewRightSideMenu>
        {rightSideMenuMobile.map((item, index) => {
          return (
            <RightSideMenu
              key={index}
              onClick={() => {
                if (index == 3) {
                  click(item);
                } else {
                  menuClick(
                    index == 2 ? item.name : item.url,
                    index == 2 ? true : false,
                    index == 2 ? item.url : item.id
                  );
                }
              }}>
              <RightSideInsideMenuBox>
                <Image
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="icon"
                />
                <p>{item.name}</p>
              </RightSideInsideMenuBox>
            </RightSideMenu>
          );
        })}
      </MobileViewRightSideMenu>
      <AllCategories>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => menuClick("Community", true, "category-item")}>
          All Categories
        </button>
      </AllCategories>
    </RightMenu>
  );
};

export default RightSide;
