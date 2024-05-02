import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import CommonButton from "../button/CommonButton";
import BetaUIModal from "../modal/BetaUIModal";
import AboutRocModal from "@/components/modal/BetaUIModal";
import JoinList from "@/components/Beta UI/JoinList";
import Instance from "@/app/utils/Instance";
import { useMyContext } from "@/app/Context/MyContext";
import { ROCLogo, ROCLogoWhite } from "@/app/utils/ImagePath";

interface ShadowWrapperProps {
  children: React.ReactNode;
  showContent: boolean;
  setShowContent: any;
}

const StyledShadowWrapper = styled.div`
  position: relative;

  .shadow-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 84%);
    z-index: 10;
  }

  .shadow-header{
    
    position: fixed;
    top: 9%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    padding: 0px 40px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    display:flex !important;
    flex-direction: row !important;
    justify-content:space-between !important;
    align-items:center;
  }
  .content-wrapper {
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    padding: 0px 40px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .content-wrapper input {
    margin-right: 10px;
  }

  .content-wrapper button {
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const ContentInfo = styled.div`
  color: var(--White, #fff);
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const MenuInputField = styled.div`
  width: 100%;
  height: 48px;
  position: relative;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background: var(--White, #fff);
`;

const AccountInputText = styled.input`
  outline: none;
  width: 100%;
  color: black;
  border: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: var(--White, #fff);
  text-align: center;

  &::placeholder {
    color: black;
  }
`;

const JoinText = styled.p`
  color: var(--White, #fff);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  text-decoration-line: underline;
`;

const ShadowWrapper: React.FC<ShadowWrapperProps> = ({ children, showContent, setShowContent }) => {
  // const [showContent, setShowContent] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { handleApiResponse } = useMyContext();
  // const [loading, setLoading] = useState(true);


  // interface ApiVerifyCodeResponse {
  //   message: string;
  //   data: any;
  // }

  // export const verifyInviteCode = async (code: string): Promise<ApiVerifyCodeResponse> => {
  //   try {
  //     const response = await axios.post<ApiVerifyCodeResponse>(`${baseUrl}/verifyCode`,{ code });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Failed to verify invite code");
  //   }
  // };

  // const fetchDataAsync = async () => {
  //   const result = await verifyInviteCode(inputValue);
  //   localStorage.setItem("hideUI", inputValue.trim());
  //   setShowContent(false);
  //   localStorage.setItem("Token", result.data);
  // };

  const fetchDataAsync = async () => {
    // setloader(true);
    try {
      const result = await Instance.post("/verifyCode", { code: inputValue });
      localStorage.setItem("hideUI", inputValue.trim());
      setShowContent(false);
      localStorage.setItem("Token", result.data.data);
      handleApiResponse(true)
    } catch (error: any) {
      console.log(error.message);
      // setloader(false);
    } finally {
      // setloader(false);
    }
  };

  const [modalType, setModalType] = useState({
    ModalContent: false,
    AboutRoc: false,
  });

  const modalClick = (name: string) => {
    setModalType((prev: any) => ({
      ...prev,
      [name]: !prev[name] as boolean,
    }));
  };

  const closeModal = (name: string) => {
    setModalType((prev: any) => ({
      ...prev,
      [name]: !prev[name] as boolean,
    }));
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("hideUI");
    if (storedValue && !isNaN(Number(storedValue))) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
    // setLoading(false);
  }, []);

  // const handleOKClick = () => {
  //   if (inputValue.trim() == "1234") {
  //     localStorage.setItem("hideUI", inputValue.trim());
  //     setShowContent(false);
  //   }
  // };

  return (
    <>
      <StyledShadowWrapper>
        {showContent && (
          <>
            <div className="shadow-background"></div>
            <div className="shadow-header" style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={ROCLogoWhite}
                width={117}
                height={68}
                alt="right icon"
              />
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/Frame%201712.png?alt=media&token=27a64bcd-fb62-4c51-8e32-ece4defa591c"
                width={80}
                height={40}
                alt="right icon"
              />
            </div>
            <div className="content-wrapper">
              {/* <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FBETA.png?alt=media&token=94d2f0f3-f0f1-4e2f-b81f-80aa889cf243"
                  width={117}
                  height={68}
                  alt="right icon"
                /> */}
              {/* </div> */}
              <ContentInfo>
                Enter the private invite code or sign up to the waiting list
              </ContentInfo>
              <div>
                <MenuInputField>
                  <AccountInputText
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter code"
                  />
                </MenuInputField>
                <div onClick={fetchDataAsync} style={{ marginTop: 8 }}>
                  <CommonButton text="Submit" />
                </div>
              </div>
              <div>
                <JoinText
                  onClick={() => modalClick("ModalContent")}
                  style={{ cursor: "pointer" }}
                >
                  Join the waiting list
                </JoinText>
                <JoinText
                  style={{ marginTop: 24, cursor: "pointer" }}
                  onClick={() => modalClick("AboutRoc")}
                >
                  Read more about ROC
                </JoinText>
              </div>
            </div>
          </>
        )}
        {children}
      </StyledShadowWrapper>
      <BetaUIModal
        isOpen={modalType.ModalContent}
        onClose={() => closeModal("ModalContent")}
        name="ModalContent"
        title="Join the waiting list"
      >
        <JoinList />
      </BetaUIModal>
      <AboutRocModal
        isOpen={modalType.AboutRoc}
        onClose={() => closeModal("AboutRoc")}
        name="AboutRoc"
        title="About ROC"
      >
        <p style={{ textAlign: "center", fontSize: 16 }}>to do...</p>
      </AboutRocModal>
    </>
  );
};

export default ShadowWrapper;
