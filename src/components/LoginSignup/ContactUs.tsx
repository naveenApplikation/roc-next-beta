import React,{useState} from "react";
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
const CheckBoxContainer = styled.div`
  background-color: white;
  padding: 8px 16px;
  border-radius: 8px;
`;

const TextAreaContainer = styled.textarea`
  border: none;
  outline: none;
  background-color: #f2f2f2;
  height: 160px;
  border-radius: 8px;
  padding: 8px 16px;
  color: black; 
  resize: none;
  &::placeholder {
    color: black; /* Change the color to your desired color */
    font-size: 16px;
    font-family: Inter;
  }
`;

const SelectReceiveOffers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--White, #fff);
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

const ReceiveOffersText = styled.div`
  width: 100%;
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
`;

export const ErrorMessage = styled.p`
  color: #c93535;
  /* margin-top: 8px; */
  margin-bottom: 20px;
  font-size: 16px;
`;

const ContactUs: React.FC<ModalProps> = ({ isOpen, previousModal }) => {

  const [loader, setloader] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      comment: "",
      prefrence: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      name: Yup.string().required("Required!"),
      comment: Yup.string().required("Required!"),
      prefrence: Yup.boolean().oneOf([true], 'You must accept or back to your account'),
    }),
    onSubmit: async (values) => {
      setloader(true);
      try {
        const loginData = await Instance.post("contact-us", {
          name: values.name,
          email: values.email,
          comments: values.comment,
          prefrence: values.prefrence,
        });
        isOpen();
      } catch (error: any) {
        console.log(error.message);
        // showToast(error.message, "error");
        setloader(false);
      } finally {
        setloader(false);
      }
    },
  });

  return (
    <MenuModalContent>
      <MenuAccountInput
        title="Name"
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && formik.touched.name && (
        <ErrorMessage>{formik.errors.name}</ErrorMessage>
      )}
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
      <TextAreaContainer
        rows={4}
        cols={50}
        placeholder="Comments"
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
      />
      {formik.errors.comment && formik.touched.comment && (
        <ErrorMessage>{formik.errors.comment}</ErrorMessage>
      )}
      <SelectReceiveOffers>
        <OfferCheckbox>
          <Checkbox
            color="white"
            type="checkbox"
            name="prefrence"
            checked={formik.values.prefrence}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </OfferCheckbox>
        <ReceiveOffersText>
          I would like to receive offers and news from ROC.
        </ReceiveOffersText>
      </SelectReceiveOffers>
      {formik.errors.prefrence && formik.touched.prefrence && (
        <ErrorMessage>{formik.errors.prefrence}</ErrorMessage>
      )}
        <CommonButton bcColor="#2F80ED"  text={loader ? "Loading..." : "Submit"} imageStyle={0} isOpen={formik.handleSubmit} />
    </MenuModalContent>
  );
};

export default ContactUs;
