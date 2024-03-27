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
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  // Define your props here
  setCreateAccountModal?: Function;
  createAccountModal?: boolean;
  showMap?: boolean;
  modalClick: Function;
  iconClick: Function;
}

const HeadMenu = styled.div<{
  $pathname: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  padding-top: 64px;
  padding-bottom: 6px;
  background-color: ${({ $pathname }) =>
    $pathname === "/" ? "transparent" : "#FDFDFD"};

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

const Header: React.FC<HeaderProps> = ({ modalClick, iconClick, showMap }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };
  return (
    <>
      <HeadMenu $pathname={pathname ? pathname : "/"}>
        <Image
          style={{ cursor: "pointer" }}
          src={logoOutline}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          {pathname === "/" ? (
            <>
              <Image
                src={showMap ? headerHome : mapIconDark}
                alt="Logo Outline"
                onClick={() => iconClick("mapClick")}
              />
              <Image
                style={{cursor: "pointer" }}
                src={profileIconDark}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
            </>
          ) : (
            <>
              <Image
                style={{ width: "24px", height: "24px" }}
                src={search}
                alt="Logo Outline"
                onClick={() => modalClick("search")}
              />
              <Image
                style={{ width: "24px", height: "24px" }}
                src={user}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <Image
                style={{ width: "24px", height: "24px" }}
                src={home}
                alt="Logo Outline"
                onClick={navigateClick}
              />
            </>
          )}
        </HeaderMapProfileContainer>
      </HeadMenu>
      {/* <CreateAccountModalLayout
                isOpen={createAccountModal}
                onClose={closecreateAccountHandle}
                title="Create an account"
            >
                <CreateAccountContent />
            </CreateAccountModalLayout> */}
    </>
  );
};

export default Header;
