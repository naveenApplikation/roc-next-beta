import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  background-color: #FDFDFD;
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

  return (
    <div>
      <HeadMenu>
        <Image
          style={{ cursor: "pointer" }}
          src={logoOutline}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          <Image
            style={{ width: "24px", height: "24px" }}
            src={search}
            alt="Logo Outline"
            // onClick={() => modalClick("search")}
          />
          <Image
            style={{ width: "24px", height: "24px" }}
            src={user}
            alt="Logo Outline"
            // onClick={() => modalClick("createAccountModal")}
          />
          <Image
            style={{ width: "24px", height: "24px" }}
            src={home}
            alt="Logo Outline"
            onClick={navigateClick}
          />
        </HeaderMapProfileContainer>
      </HeadMenu>
    </div>
  );
};

export default HeaderScreen;
