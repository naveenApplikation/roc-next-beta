import React from "react";
import styled from "styled-components";
import MenuOptionList from "@/components/menuOptionList/MenuOptionList";
import createListImg from "../../../assets/images/menuModalsImage/createList.png";
import Mybookmark from "../../../assets/images/Home-new-icons/Mybookmark.svg";
import updateDetailsImg from "../../../assets/images/menuModalsImage/profile.png";
import savedImg from "../../../assets/images/menuModalsImage/saved.png";
import activityImg from "../../../assets/images/menuModalsImage/activity.png";
import contactUsImg from "../../../assets/images/menuModalsImage/contactUs.png";
import navigateImg from "../../../assets/images/menuModalsImage/forwardNavigate.png";
import { information } from "@/app/utils/ImagePath";
import listStar from "../../../assets/images/listStar.svg";
import { Logout, blank, user } from "@/app/utils/ImagePath";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa6";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
interface ModalProps {
  isOpen?: any;
  isOpenContact?: any;
  myListOpen?: any;
  myBookmarkOpen?: any;
  logoutClick: () => void;
  onClick: (name: string) => void;
  isOpenAboutUs: any;
  isPrivacyPolicy:any
}

const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

const WelcomebackContent: React.FC<ModalProps> = ({ isOpen, isOpenContact, myListOpen, logoutClick, onClick, isOpenAboutUs,myBookmarkOpen,isPrivacyPolicy }) => {
 
   
  const router=useRouter()
  const pathname=usePathname()
  const navigate=(name:string)=>{
    if(pathname?.includes('xmas'))
    {
    router.push('/xmas/iframe/profile/'+name)
    }
    else
    {
       router.push('/info/'+name)
    }
}

  return (
    <MenuModalContent>
      <div style={{ cursor: "pointer" }} onClick={() => onClick("AddToCreate")}>
        <MenuOptionList
          optionListText
          title1="Create a list"
          menuOptionImg={createListImg}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{ cursor: "pointer" }} onClick={()=>navigate("event")} >
        <MenuOptionList
          optionListText
          title1="Submit an event"
          menuOptionImg={{icon:<FaRegCalendar size={16}></FaRegCalendar>}}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{ cursor: "pointer" }}  onClick={()=>navigate("business")}>
        <MenuOptionList
          optionListText
          title1="Submit an business"
          menuOptionImg={{icon:<FaRegBuilding size={16} color="black"></FaRegBuilding>}}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{ cursor: "pointer" }} onClick={myBookmarkOpen}>
        <MenuOptionList
          optionListText
          title1="My Bookmarks"
          menuOptionImg={Mybookmark}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{ cursor: "pointer" }} onClick={myListOpen}>
        <MenuOptionList
          optionListText
          title1="My lists"
          menuOptionImg={listStar}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div style={{ cursor: "pointer" }} onClick={isOpen}>
        <MenuOptionList
          optionListText
          title1="Update my details"
          menuOptionImg={updateDetailsImg}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div onClick={isOpenContact} style={{ cursor: "pointer" }}>
        <MenuOptionList
          optionListText
          title1="Contact us"
          menuOptionImg={contactUsImg}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div onClick={isOpenAboutUs} style={{ cursor: "pointer" }}>
        <MenuOptionList
          optionListText
          title1="About us"
          menuOptionImg={user}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div onClick={isPrivacyPolicy} style={{ cursor: "pointer" }}>
        <MenuOptionList
          optionListText
          title1="Privacy Policy"
          menuOptionImg={information}
          navigaetImg
          forwardNavigateImg={navigateImg}
        />
      </div>
      <div onClick={isOpenContact} style={{ cursor: "pointer" }}>
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
      <div onClick={logoutClick} style={{ cursor: "pointer" }}>
        <MenuOptionList optionListText title1="Logout" menuOptionImg={Logout} />
      </div>
    </MenuModalContent>
  );
};

export default WelcomebackContent;
