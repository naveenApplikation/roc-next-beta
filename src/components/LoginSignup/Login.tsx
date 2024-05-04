import React,{useState} from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ModalProps { 
    previousModal?:any,
    nextModal?:any,

}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const ForgotPasswordText = styled.div`
    color: var(--MAIN, #2F80ED);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const CreateAccountText = styled.div`
    color: var(--MAIN, #2F80ED);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #c93535;
  /* margin-top: 8px; */
  margin-bottom: 20px;
  font-size: 16px;
`;

const LoginContent: React.FC<ModalProps> = ({previousModal,nextModal}) => {

  const [loader, setloader] = useState(false);

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
          setloader(true)
          try {
            const loginData = await Instance.post("sign-in", {
              email: values.email,
              password: values.password,
            });
            localStorage.setItem("loginToken", loginData.data.token);
            setloader(false)
            nextModal()
          } catch (error: any) {
            console.log(error.message);
            setloader(false)
            // showToast(error.message, "error");
          } finally {
            setloader(false)
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
            <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            <CommonButton bcColor="#2F80ED" text={loader ? "Loading..." : "Login"} imageStyle={0}    isOpen={formik.handleSubmit} />
            <CreateAccountText onClick={previousModal}>Create an account</CreateAccountText>
        </MenuModalContent>
    );
};

export default LoginContent;
