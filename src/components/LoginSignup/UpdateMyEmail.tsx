import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ModalProps {
  isOpen?: any;
  previousModal: any;
}

const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
`;

const BackAccount = styled.p`
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #c93535;
  /* margin-top: 8px; */
  margin-bottom: 20px;
  font-size: 16px;
`;

const UpdateMyEmailContent: React.FC<ModalProps> = ({
  isOpen,
  previousModal,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
    }),
    onSubmit: async (values) => {
      //   setloader(true);
      try {
        const loginData = await Instance.put("update-profile", {
          email: values.email,
        });
        console.log(loginData);
        isOpen();
      } catch (error: any) {
        console.log(error.message);
        // showToast(error.message, "error");
        // setloader(false);
      } finally {
        // setloader(false);
      }
    },
  });

  return (
    <MenuModalContent>
      <MenuAccountInput
        title="New email address"
        type="text"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && formik.touched.email && (
        <ErrorMessage>{formik.errors.email}</ErrorMessage>
      )}
        <CommonButton
          bcColor="#2F80ED"
          text="Save new email address"
          imageStyle={0}
          isOpen={formik.handleSubmit}
        />
      <BackAccount onClick={previousModal}>Back to my account</BackAccount>
    </MenuModalContent>
  );
};

export default UpdateMyEmailContent;
