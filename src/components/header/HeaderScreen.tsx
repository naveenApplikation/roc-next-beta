import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";

import {
  headerHome,
  home,
  logoOutline,
  mapIcon,
  mapIconDark,
  profileIcon,
  profileIconDark,
  search,
  user,
} from "@/app/utils/ImagePath";

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  padding-top: 64px;
  padding-bottom: 16px;
  background-color: #fdfdfd;
  width: 580px;
  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 40px;
    padding-bottom: 16px;
    width: 100%;
    /* display: none; */
  }
`;
const HeaderMapProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const HeaderScreen = () => {
  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };

  const { modalName, closeModal, modalClick, dataDetails } = useMyContext();

  return (
    <div>
      <HeadMenu>
        <Image
          style={{ cursor: "pointer" }}
          src={
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201662.png?alt=media&token=1d8c1112-bb3f-4b87-b411-5f30d9a923e4"
          }
          width={117}
          height={48}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          <Image
          style={{ cursor: "pointer" }}
            src={
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSearch.png?alt=media&token=ab70ea3f-201d-4b55-b376-67cfd8fdea39"
            }
            width={24}
            height={24}
            alt="Logo Outline"
            onClick={() => modalClick("search")}
            // onClick={() => modalClick("search")}
          />
          <Image
          style={{ cursor: "pointer" }}
            src={
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fuser.png?alt=media&token=5239ce4e-da6f-4159-ae01-90dce6bed1ad"
            }
            width={24}
            height={24}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          />
          <Image
          style={{ cursor: "pointer" }}
            src={
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fhome.png?alt=media&token=6297f249-2900-4f3b-965a-43016b573bde"
            }
            width={24}
            height={24}
            alt="Logo Outline"
            onClick={navigateClick}
          />
        </HeaderMapProfileContainer>
      </HeadMenu>
    </div>
  );
};

export default HeaderScreen;
