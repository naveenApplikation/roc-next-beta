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

const UpdateName: React.FC<ModalProps> = ({ isOpen, previousModal }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      //   setloader(true);
      try {
        const loginData = await Instance.put("update-profile", {
        userName: values.name,
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
        title="Your new name"
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && formik.touched.name && (
        <ErrorMessage>{formik.errors.name}</ErrorMessage>
      )}
      <CommonButton
        bcColor="#2F80ED"
        text="Update my name"
        imageStyle={0}
        isOpen={formik.handleSubmit}
      />
      <BackAccount onClick={previousModal}>Back to my account</BackAccount>
    </MenuModalContent>
  );
};

export default UpdateName;
