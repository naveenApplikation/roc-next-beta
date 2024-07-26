import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "@/components/toast/ShowToast";
import { addAndRomoveToken } from "@/app/action";
import { usePathname } from "next/navigation";

interface ModalProps {
  isOpen?: any;
  nextModal?: any;
  myListOpen?: any;
  isPrivacyPolicy?: any;
}

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
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2px;
  color: var(--BODY, #000);
  // text-align: center;
  // font-family: Inter;
  // font-size: 16px;
  // font-style: normal;
  // font-weight: 400;
  // line-height: 19px;
`;

const UserTermsText2 = styled.div`
  display: flex;
  height: 19px;
  align-items: center;
  color: var(--BODY, #000);
  text-align: center;
  font-size: 15px;
  font-style: normal;
  line-height: 19px;
  padding-top: 3px;
  border-bottom: 2px solid #000000;
`;
const UserPolicy = styled.div`
  display: grid;
  grid-column: 1 / span 2;
  height: 19px;
  color: var(--BODY, #000);
  justify-content: center;
  padding-top: 3px;
`;
const Text = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  width: max-content;
  cursor: pointer;
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

const CreateAccountContent: React.FC<ModalProps> = ({
  isOpen,
  nextModal,
  isPrivacyPolicy,
  myListOpen,
}) => {
  const [loader, setloader] = useState(false);
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
        localStorage.setItem("loginToken", loginData.data.token);
        await addAndRomoveToken(loginData.data.token);
        console.log(pathname);
        if (pathname.includes("screens")) {
          window.location.reload();
        } else {
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
      <MenuAccountInput
        title="Email"
        type="text"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && formik.touched.email && (
        <ErrorMessage>{formik.errors.email}</ErrorMessage>
      )}
      <MenuAccountInput
        title="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && formik.touched.password && (
        <ErrorMessage>{formik.errors.password}</ErrorMessage>
      )}
      <SelectReceiveOffers>
        <OfferCheckbox>
          <Checkbox color="white" type="checkbox" />
        </OfferCheckbox>
        <ReceiveOffersText>
          I would like to receive offers and news from ROC.
        </ReceiveOffersText>
      </SelectReceiveOffers>
      <CommonButton
        bcColor="#2F80ED"
        text={loader ? "Loading..." : "Create Account"}
        isOpen={formik.handleSubmit}
      />
      <UserTermsText1>
        <UserTermsText2 style={{ border: "none" }}>
          By continuing, I agree to the&#xA0;
          <Text onClick={myListOpen}>User Terms</Text>
        </UserTermsText2>
        <Text style={{ border: "none", paddingTop: "3px" }}>&</Text>
        <UserPolicy>
          <Text onClick={isPrivacyPolicy}>Privacy Policy</Text>
        </UserPolicy>
      </UserTermsText1>
      <UserLoginText onClick={isOpen}>Already a user? Login</UserLoginText>
    </MenuModalContent>
  );
};

export default CreateAccountContent;
