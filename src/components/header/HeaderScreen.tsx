"use client";
import React, { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useMyContext } from "@/app/Context/MyContext";
import {
  home,
  profileIcon,
  search,
  ROCLogo,
  Hamburger,
  HamburgerDesktop,
  HamburgerWithoutBG,
  ScrollIcon,
  backArrow,
} from "@/app/utils/ImagePath";
import { sideWidth } from "@/app/utils/date";
import CustomBanner from "../AdComponent/CustomBanner";

interface Props {
  title?: any;
}

const list = ["activity-list", "event-category-list"];
const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 0px 40px;
  padding-top: 64px;
  padding-bottom: 10px;
  background-color: #fdfdfd;
  width: ${sideWidth};
  @media screen and (max-width: 800px) {
    // padding: 0px 16px;
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
  padding: 0px 16px;
`;

const HeaderScreen = ({ title }: Props) => {
  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };

  const {
    modalName,
    closeModal,
    modalClick,
    dataDetails,
    modalType,
    setSelectFilter,
  } = useMyContext();

  const scrollContainerRef = useRef<any>();

  const setScrollTop = () => {
    scrollContainerRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    router.back();
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
      setSelectFilter("Any");
    }
  };
  return (
    <>
      <HeadMenu ref={scrollContainerRef}>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
          <Image
            width={47}
            height={26}
            src={backArrow}
            alt="back arrow"
          
            style={{ paddingTop: "2px", cursor: "pointer",height:"47px",width:"26px"}}
            onClick={handleBack}></Image>
          <Image
            style={{ cursor: "pointer" }}
            src={ROCLogo}
            width={117}
            height={48}
            alt="Logo Outline"
            onClick={navigateClick}
          />
        </div>
        <HeaderMapProfileContainer>
          <Image
            style={{ cursor: "pointer" }}
            src={search}
            alt="Logo Outline"
            onClick={() => modalClick("search")}
            // onClick={() => modalClick("search")}
          />
          <Image
            style={{ cursor: "pointer" }}
            src={home}
            alt="Logo Outline"
            onClick={navigateClick}
          />
          <HamburgerWithoutBG onClick={() => modalClick("LoginSignupModal")} />
        </HeaderMapProfileContainer>
        <Image
          className={
            list.includes(title)
              ? "scroll_top_desktop scroll_top_desktop_adds"
              : "scroll_top_desktop "
          }
          onClick={setScrollTop}
          src={ScrollIcon}
          alt="scroll"
        />
      </HeadMenu>
    </>
  );
};

export default HeaderScreen;
