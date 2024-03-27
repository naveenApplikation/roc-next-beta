import React from "react";
import styled from "styled-components";
import MenuOptionList from "../../../components/menuOptionList/MenuOptionList";
import emailImg from "../../../../assets/images/menuModalsImage/email.png";
import passwordImg from "../../../../assets/images/menuModalsImage/password.png";
import nameImg from "../../../../assets/images/menuModalsImage/profile.png";
import emailPreferencesImg from "../../../../assets/images/menuModalsImage/emailPreference.png";

interface ModalProps {
  isOpen?: any;
  isOpenName?: any;
  isOpenPassword?: any;
  isOpenContact?: any;
  previousModal?: any;
}

const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

const BackAccount = styled.p`
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 10px;
  cursor: pointer;
`;

const UpdateMyDetailsContent: React.FC<ModalProps> = ({
  isOpen,
  previousModal,
  isOpenContact,
  isOpenName,
  isOpenPassword,
}) => {
  return (
    <MenuModalContent>
      <div style={{ cursor: "pointer" }} onClick={isOpen}>
        <MenuOptionList
          optionListText
          title1="Email"
          menuOptionImg={emailImg}
          change
        />
      </div>
      <div onClick={isOpenPassword} style={{cursor:"pointer"}}>
        <MenuOptionList
          optionListText
          title1="Password"
          menuOptionImg={passwordImg}
          change
        />
      </div>
      <div onClick={isOpenName} style={{cursor:"pointer"}}>
        <MenuOptionList
          optionListText
          title1="Name"
          menuOptionImg={nameImg}
          change
        />
      </div>
      <div onClick={isOpenContact} style={{cursor:"pointer"}}>
        <MenuOptionList
          optionListText
          title1="Email Preferences"
          menuOptionImg={emailPreferencesImg}
          change
        />
      </div>
      <BackAccount onClick={previousModal}>Back to my account</BackAccount>
    </MenuModalContent>
  );
};

export default UpdateMyDetailsContent;
