import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import { home, profileIcon, search, ROCLogo, Hamburger } from "@/app/utils/ImagePath";
import { sideWidth } from "@/app/utils/date";

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  padding-top: 64px;
  padding-bottom: 16px;
  background-color: #fdfdfd;
  width: ${sideWidth};
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
          src={ROCLogo}
          width={117}
          height={48}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          <Image
            style={{ cursor: "pointer" }}
            src={search}
            alt="Logo Outline"
            onClick={() => modalClick("search")}
            // onClick={() => modalClick("search")}
          />

          {/* <Image
            style={{ cursor: "pointer" }}
            src={profileIcon}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          /> */}
          <Image
            style={{ cursor: "pointer" }}
            src={home}
            alt="Logo Outline"
            onClick={navigateClick}
          />
          <Hamburger onClick={()=>modalClick("LoginSignupModal")} />
        </HeaderMapProfileContainer>
      </HeadMenu>
    </div>
  );
};

export default HeaderScreen;
