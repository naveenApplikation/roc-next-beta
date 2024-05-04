import React,{useState} from "react";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ModalProps {
  previousModal: any;
  isOpen: any;
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
  margin-bottom: 10px;
  font-size: 16px;
`;

const UpdateMyPreferencesContent: React.FC<ModalProps> = ({
  previousModal,
  isOpen,
}) => {

  const [loader, setloader] = useState(false);

  const formik = useFormik({
    initialValues: {
      prefrence: false,
    },
    validationSchema: Yup.object({
        prefrence: Yup.boolean().oneOf([true], 'You must accept or back to your account'),
      }),
    onSubmit: async (values) => {
      setloader(true);
      try {
        const loginData = await Instance.put("update-profile", {
          prefrence: values.prefrence,
        });
        console.log(loginData);
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
        <CommonButton
          bcColor="#2F80ED"
          text={loader ? "Loading..." : "Update my preferences"}
          imageStyle={0}
          isOpen={formik.handleSubmit}
        />
      <BackAccount onClick={previousModal}>Back to my account</BackAccount>
    </MenuModalContent>
  );
};

export default UpdateMyPreferencesContent;
