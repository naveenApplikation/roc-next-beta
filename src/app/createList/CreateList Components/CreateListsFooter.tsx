import React from "react";
import styled from "styled-components";
import Image from "next/image";
import info from "../../../../assets/images/info-circle.svg";
import TextArea from "@/components/button/textArea";

interface CreateListingsFooterProps {
  continueBtn?: any;
  footerBtns?: any;
  firstBtnText?: string;
  ChooseIconFooterBtn?: any;
  commentOpen?: any;
  Handleclose?: any;
  ScreenSwitch?: any;
  preScreen?: any;
}

const CreateListingFooter = styled.div`
  width: 100%;
  /* height: 85px; */
  position: absolute;
  bottom: 0px;
  padding: 12px 24px 32px 24px;
  display: flex;
  background: #fff;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);

  @media screen and (max-width: 400px) {
    padding: 12px 10px 32px 10px;
  }
`;

const ContinueBtn = styled.div`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--MAIN, #2f80ed);
  color: var(--White, #fff);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-style: none;
  cursor: pointer;
`;

const FooterBtnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const FooterBtn1 = styled.div`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid var(--MAIN, #2f80ed);
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const FooterBtn2 = styled.div`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--MAIN, #2f80ed);
  color: var(--White, #fff);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const TextAreaContainer = styled.textarea`
  border: 2px solid var(--BODY, #000);
  width: 100%;
  outline: none;
  background-color: white;
  border-radius: 8px;
  padding: 8px 16px;
  resize: none;
  &::placeholder {
    color: black; /* Change the color to your desired color */
    font-size: 14px;
    font-style: italic;
    opacity: 0.48;
  }
`;

const CreateListingsFooter: React.FC<CreateListingsFooterProps> = ({
  commentOpen,
  continueBtn,
  footerBtns,
  firstBtnText,
  ChooseIconFooterBtn,
  Handleclose,
  ScreenSwitch,
  preScreen
}) => {

  return (
    <CreateListingFooter>
      {continueBtn && (
        <ContinueBtn onClick={ScreenSwitch}>Continue with (1) Selected Listing</ContinueBtn>
      )}
      {/* {footerBtns && (
                <FooterBtnBox>
                    <FooterBtn1>{firstBtnText}</FooterBtn1>
                    <FooterBtn2>Continue</FooterBtn2>
                </FooterBtnBox>
            )} */}

      {commentOpen ? (
        <div style={{ width: "100%",display:"flex",flexDirection:"column",gap:"16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems:"center",
              width: "100%",
            }}
          >
            <p style={{fontSize:24,fontWeight:"bold",}}>Kyomu</p>
            <Image
              // style={{ width: "14px", height: "16px" }}
              src={info}
              alt="SelectedBtnImg"
            />
          </div>
          <TextAreaContainer
            rows={4}
            cols={50}
            placeholder="Enter your comment here..."
          />
          <FooterBtn2 onClick={Handleclose}>Save comment</FooterBtn2>
        </div>
      ) : (
        footerBtns && (
            <FooterBtnBox>
                <FooterBtn1 onClick={preScreen}>{firstBtnText}</FooterBtn1>
                <FooterBtn2 onClick={ScreenSwitch}>Continue</FooterBtn2>
            </FooterBtnBox>
        )
      )}
      {/* {ChooseIconFooterBtn && (
                <FooterBtnBox>
                <FooterBtn1>Go Back</FooterBtn1>
                <FooterBtn2>Continue</FooterBtn2>
            </FooterBtnBox>
            )} */}
    </CreateListingFooter>
  );
};

export default CreateListingsFooter;
