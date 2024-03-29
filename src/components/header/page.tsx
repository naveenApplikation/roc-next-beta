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
          src={
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201662.png?alt=media&token=1d8c1112-bb3f-4b87-b411-5f30d9a923e4"
          }
          width={117}
          height={48}
          alt="Logo Outline"
          onClick={navigateClick}
        />
        <HeaderMapProfileContainer>
          {pathname === "/" ? (
            <>
              <Image
                src={
                  showMap
                    ? "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%2070%20(2).png?alt=media&token=96324175-24ff-49f5-8cde-f8e459f9530d"
                    : "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%2070.png?alt=media&token=439b4c60-132f-48e2-80d6-51cb718cc64e"
                }
                width={48}
                height={48}
                alt="Logo Outline"
                onClick={() => iconClick("mapClick")}
              />
              <Image
                style={{ cursor: "pointer" }}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%2070%20(1).png?alt=media&token=b5295223-424c-4e88-8dfb-49a84a67e64f"
                }
                width={48}
                height={48}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
            </>
          ) : (
            <>
              <Image
                src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSearch.png?alt=media&token=ab70ea3f-201d-4b55-b376-67cfd8fdea39"}
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("search")}
              />
              <Image
                src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fuser.png?alt=media&token=5239ce4e-da6f-4159-ae01-90dce6bed1ad"}
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <Image
                src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fhome.png?alt=media&token=6297f249-2900-4f3b-965a-43016b573bde"}
                width={24}
                height={24}
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
