import React from "react";
import styled from "styled-components";
import MenuOptionList from "../../../components/menuOptionList/MenuOptionList";
import emailImg from "../../../../assets/images/menuModalsImage/email.png";
import passwordImg from "../../../../assets/images/menuModalsImage/password.png";
import nameImg from "../../../../assets/images/menuModalsImage/profile.png";
import emailPreferencesImg from "../../../../assets/images/menuModalsImage/emailPreference.png";

interface ModalProps {}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
`;

const UpdateMyDetailsContent: React.FC<ModalProps> = () => {
    return (
        <MenuModalContent>
           <MenuOptionList
                optionListText
                title1="Email"
                menuOptionImg={emailImg}
                change
            />
            <MenuOptionList
                optionListText
                title1="Password"
                menuOptionImg={passwordImg}
                change
            />
            <MenuOptionList
                optionListText
                title1="Name"
                menuOptionImg={nameImg}
                change
            />
            <MenuOptionList
                optionListText
                title1="Email Preferences"
                menuOptionImg={emailPreferencesImg}
                change
            />
        </MenuModalContent>
    );
};

export default UpdateMyDetailsContent;
