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
import listStar from "../../../../assets/images/listStar.svg";

interface ModalProps {
  isOpen?: any;
  isOpenContact?: any;
  myListOpen?: any;
}

const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

const WelcomebackContent: React.FC<ModalProps> = ({isOpen,isOpenContact,myListOpen}) => {
  return (
    <MenuModalContent>
      <MenuOptionList
        optionListText
        title1="Create a list"
        menuOptionImg={createListImg}
        navigaetImg
        forwardNavigateImg={navigateImg}
      />
      <div style={{cursor:"pointer"}} onClick={isOpen}>
        <MenuOptionList
          optionListText
          title1="Update my details"
          menuOptionImg={updateDetailsImg}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{cursor:"pointer"}} onClick={myListOpen}>
        <MenuOptionList
          optionListText
          title1="My lists"
          menuOptionImg={listStar}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div onClick={isOpenContact} style={{cursor:"pointer"}}>
      <MenuOptionList
        optionListText
        title1="Contact us"
        menuOptionImg={contactUsImg}
        navigaetImg
        forwardNavigateImg={navigateImg}
        />
        </div>
        <div onClick={isOpenContact} style={{cursor:"pointer"}}>
      <MenuOptionList
        optionListText
        title1="Leave feedback"
        menuOptionImg={contactUsImg}
        navigaetImg
        forwardNavigateImg={navigateImg}
        />
        </div>
      <MenuOptionList
        unoptionListText
        title2="Saved"
        menuOptionImg={savedImg}
        comingSoon
      />
      <MenuOptionList
        unoptionListText
        title2="Activity"
        menuOptionImg={activityImg}
        comingSoon
      />
     
    </MenuModalContent>
  );
};

export default WelcomebackContent;
