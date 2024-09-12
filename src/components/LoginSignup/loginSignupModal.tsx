import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "@/components/toast/ShowToast";
import MenuOptionList from "../menuOptionList/MenuOptionList";
import createListImg from "../../../assets/images/menuModalsImage/createList.png";
import updateDetailsImg from "../../../assets/images/menuModalsImage/profile.png";
import savedImg from "../../../assets/images/menuModalsImage/saved.png";
import activityImg from "../../../assets/images/menuModalsImage/activity.png";
import contactUsImg from "../../../assets/images/menuModalsImage/contactUs.png";
import navigateImg from "../../../assets/images/menuModalsImage/forwardNavigate.png";
import listStar from "../../../assets/images/listStar.svg";
import SocialMedia from "../socialMedia/page";
import { emails, tnc, user } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { addAndRomoveToken } from "@/app/action";
import { usePathname } from "next/navigation";
import { information } from "@/app/utils/ImagePath";
 
 
interface ModalProps {
  isOpen?: any;
  nextModal?: any;
  onClick: (name: string) => void;
  myListOpen?: any;
  isOpenAboutUs?: any;
  isPrivacyPolicy?: any;
}



const LoginSignupModal: React.FC<ModalProps> = ({ isOpen, nextModal, onClick, myListOpen, isOpenAboutUs,isPrivacyPolicy }) => {
    const [loader, setloader] = useState(false);
    const { modalClick } = useMyContext();
      const pathname = usePathname();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
        }),
        onSubmit: async (values) => {
            setloader(true);
            try {
                const loginData = await Instance.post("sign-up", {
                    email: values.email,
                    password: values.password,
                });
               await addAndRomoveToken(loginData.data.token) 
                localStorage.setItem("loginToken",loginData.data.token);
                console.log(pathname)
                  if (pathname?.includes("screens")) {
                    window.location.reload();
                  }
                  else
                  {
                nextModal();
                  }
                
           
                
            } catch (error: any) {
                console.log(error.message);
                showToast(error.message, "error");
                setloader(false);
            } finally {
                setloader(false);
            }
        },
    });

    return (
      <MenuModalContent>
        <div style={{ display: "flex", gap: "10px" }}>
          <CommonButton
            bcColor="#2F80ED"
            text={loader ? "Loading..." : "Create Account"}
            isOpen={() => modalClick("createAccountModal")}
          />
          <CommonButton
            bcColor="#2F80ED"
            text={loader ? "Loading..." : "Login"}
            isOpen={() => modalClick("LoginAccountModal")}
          />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => modalClick("LeaveFeedback")}
        >
          <MenuOptionList
            optionListText
            title1="Leave feedback"
            menuOptionImg={contactUsImg}
            navigaetImg
            forwardNavigateImg={navigateImg}
          />
        </div>
        <div style={{ cursor: "pointer" }} onClick={isOpen}>
          <MenuOptionList
            optionListText
            title1="Contact us"
            menuOptionImg={emails}
            navigaetImg
            forwardNavigateImg={navigateImg}
          />
        </div>
        <div style={{ cursor: "pointer" }} onClick={isOpenAboutUs}>
          <MenuOptionList
            optionListText
            title1="About us"
            menuOptionImg={user}
            navigaetImg
            forwardNavigateImg={navigateImg}
          />
        </div>
        <div style={{ cursor: "pointer" }} onClick={myListOpen}>
          <MenuOptionList
            optionListText
            title1="Terms & Conditions"
            menuOptionImg={tnc}
            navigaetImg
            forwardNavigateImg={navigateImg}
          />
        </div>
        <div onClick={isPrivacyPolicy} style={{ cursor: "pointer" }}>
          <MenuOptionList
            optionListText
            title1="Privacy Policy"
            menuOptionImg={information}
            navigaetImg
            forwardNavigateImg={navigateImg}
          />
        </div>
        <SocialMedia />
        <UserTermsText1>
          <UserTermsText2>Background Photo: Luke Moss</UserTermsText2>
        </UserTermsText1>
      </MenuModalContent>
    );
};

export default LoginSignupModal;


const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
`;

const SelectReceiveOffers = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--White, #fff);
`;

const ReceiveOffersText = styled.div`
  width: 100%;
  color: var(--BODY, #000);
  // font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
`;

const UserTermsText1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2px;
  color: var(--BODY, #000);
  text-align: center;
  // font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
`;

const UserTermsText2 = styled.div`
  display: flex;
  height: 19px;
  align-items: center;
  color: var(--BODY, #000);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  padding-top: 3px;
  border-bottom: 2px solid #000000;
`;

const UserLoginText = styled.div`
  color: #2f80ed;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--MAIN, #2f80ed);
  background-color: #fff;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;

  &:checked {
    border-radius: 4px !important;
    appearance: auto;
  }
`;

const OfferCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  color: #c93535;
  /* margin-top: 8px; */
  margin-bottom: 20px;
  font-size: 16px;
`;