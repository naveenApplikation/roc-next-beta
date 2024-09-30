import React, { useState } from "react";
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


const AboutUs: React.FC<ModalProps> = ({ isOpen, previousModal }) => {



    

    return (
        <MenuModalContent>
            <iframe
                style={{ border: "none", height: "100%", overflow: 'hidden', scrollbarWidth:'none', borderRadius:"15px" }}
                src={'http://hub.roc.je/about-roc'}
                height="500px"
                width="100%"
                title={"About us"}
                className="iframe_body"
            ></iframe>
        </MenuModalContent>
    );
};

export default AboutUs;


const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 16px;
  height: 95%;
          &::-webkit-scrollbar {
            display: none;
        }
`;

