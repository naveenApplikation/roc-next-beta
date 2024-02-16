import React from "react";
import styled from "styled-components";
import MenuOptionList from "../../../components/menuOptionList/MenuOptionList";
import createListImg from "../../../../assets/images/menuModalsImage/createList.png";
import updateDetailsImg from "../../../../assets/images/menuModalsImage/profile.png";
import savedImg from "../../../../assets/images/menuModalsImage/saved.png";
import myListsImg from "../../../../assets/images/menuModalsImage/myList.png";
import activityImg from "../../../../assets/images/menuModalsImage/activity.png";
import contactUsImg from "../../../../assets/images/menuModalsImage/contactUs.png";
import navigateImg from "../../../../assets/images/menuModalsImage/forwardNavigate.png";

interface ModalProps { }

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
`;

const WelcomebackContent: React.FC<ModalProps> = () => {
    return (
        <MenuModalContent>
            <MenuOptionList
                optionListText
                title1="Create a list"
                menuOptionImg={createListImg}
                navigaetImg
                forwardNavigateImg={navigateImg}
            />
            <MenuOptionList
                optionListText
                title1="Update my details"
                menuOptionImg={updateDetailsImg}
                navigaetImg
                forwardNavigateImg={navigateImg}
            />
            <MenuOptionList
                unoptionListText
                title2="Saved"
                menuOptionImg={savedImg}
                comingSoon
            />
            <MenuOptionList
                unoptionListText
                title2="My lists"
                menuOptionImg={myListsImg}
                comingSoon
            />
            <MenuOptionList
                unoptionListText
                title2="Activity"
                menuOptionImg={activityImg}
                comingSoon
            />
            <MenuOptionList
                optionListText
                title1="Contact us"
                menuOptionImg={contactUsImg}
                navigaetImg
                forwardNavigateImg={navigateImg}
            />
        </MenuModalContent>
    );
};

export default WelcomebackContent;
