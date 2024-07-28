"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { usePathname} from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useMyContext } from "@/app/Context/MyContext";
import {
  profileIconDark,
  ROCLogo,
  HamburgerDesktop,
  iconbetablack
} from "@/app/utils/ImagePath";

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  padding-top: 64px;
  padding-bottom: 6px;

  background-color: transparent;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 40px;
    display: none;
  }
`;

const HeaderMapProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Header = () => {
  const {modalClick } = useMyContext();

  const pathname = usePathname();
  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };
  return (
    <>
      <HeadMenu>
        <Image
          style={{ cursor: "pointer" }}
          src={ROCLogo}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          {pathname === "/" ? (
            <>
              <Image
            src={iconbetablack}
            width={48}
            height={48}
            alt="Logo Outline"
            // onClick={() => modalClick("createAccountModal")}
            />
              <Image
                style={{ cursor: "pointer" }}
                src={profileIconDark}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <HamburgerDesktop
                onClick={() => modalClick("LoginSignupModal")}
              />
            </>
          ) : (
            <>
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSearch.png?alt=media&token=ab70ea3f-201d-4b55-b376-67cfd8fdea39"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("search")}
              />
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fuser.png?alt=media&token=5239ce4e-da6f-4159-ae01-90dce6bed1ad"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fhome.png?alt=media&token=6297f249-2900-4f3b-965a-43016b573bde"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={navigateClick}
              />
            </>
          )}
        </HeaderMapProfileContainer>
      </HeadMenu>
    </>
  );
};

export default Header;
