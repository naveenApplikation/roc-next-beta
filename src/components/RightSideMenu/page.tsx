import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { headerHome } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { rightSideMenu, rightSideMenuMobile } from "@/app/utils/data";
import { useRouter } from "next/navigation";

const RightSideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  padding: 40px;
  gap: 24px;

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
    height: 500px;
    padding: 16px;
    position: fixed;
    top: 0;
    width: 100%;
    right: 0;
  }
`;

const MobileViewRightSideMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    z-index: 23;
  }
`;

const AllCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;

  button {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.16);
    border: none;
    border-radius: 8px;
    padding: 12px 8px;
    color: #fff;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const RightSide = () => {
  const { modalClick, showMap, iconClick } = useMyContext();

  const router = useRouter();

  return (
    <RightMenu>
      <RightSideHeadMenu>
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201662.png?alt=media&token=1d8c1112-bb3f-4b87-b411-5f30d9a923e4"
          }
          width={117}
          height={48}
          alt="Logo Outline"
        />
        <HeaderMapProfileContainer>
          <Image
            src={
              showMap
                ? headerHome
                : "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSubtract.png?alt=media&token=139cba6b-da87-459e-a98f-1175af63647b"
            }
            alt="Logo Outline"
            width={48}
            height={48}
            onClick={() => iconClick("mapClick")}
          />
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSubtract%20(1).png?alt=media&token=076b658c-cbac-4ea1-86a3-343611447c45"
            }
            width={48}
            height={48}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          />
        </HeaderMapProfileContainer>
      </RightSideHeadMenu>
      <RightSideMenuContainer>
        {rightSideMenu.map((item, index) => {
          return (
            <RightSideMenu key={index}>
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
            <RightSideMenu key={index}>
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
        {/* <button onClick={() => menuClick("CategorieList")}> */}
        <button>
          All Categories
        </button>
      </AllCategories>
    </RightMenu>
  );
};

export default RightSide;
