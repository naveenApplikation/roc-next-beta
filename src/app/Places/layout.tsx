'use client'
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import FilterListModalScreen from "@/components/AllModalScreen/FilterListModalScreen";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ReservationCalenderModal from "@/components/AllModalScreen/reservationCalenderModal";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import BannerModal from "@/components/bannerModal/page";
import Categories from "@/components/CategoriesPage/Categories";
import LoginSignupModal from "@/components/LoginSignup/loginSignupModal";
import SocialShareModal from "@/components/modal/SocialShareModal";
import { ReactNode } from "react";
import "@/app/globals.css";
import CreateAccountModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import { useRouter } from "next/navigation";
export default function Layout({children}:{children:ReactNode})
{
   const router=useRouter()
   const onClick = (name: string) => {
      if (name === "AddToCreate") {
        router.push("/screens/createList");
      }
    };
  
   const {modalClick,modalName,closeModal,showMap}=useMyContext()
     return <>
       
        {children}
        <CreateAccountModalLayout
            isOpen={modalName === "LoginSignupModal" ? true : false}
            onClose={() => closeModal("createAccountModal")}
            {...{ showMap }}
            name=""
            title={modalName === "LoginAccountModal" && "Login"}
          >
            <LoginSignupModal
              isOpen={() => modalClick("ContactUsModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
              {...{ onClick }}
              myListOpen={() => modalClick("TermsAndConditionModal")}
              isPrivacyPolicy={() => modalClick("privacyPolicy")}
            />
          </CreateAccountModalLayout>
          <EventListingModalScreen showMap={showMap} />
          <ProfileAccountModalScreen showMap={showMap} />
          <ReservationCalenderModal showMap={showMap} />
          <ViewDirectionModalScreen showMap={showMap} />
          <FilterListModalScreen/>
        <Categories></Categories>
          <BannerModal />
          <SocialShareModal
          
          ></SocialShareModal>
     </>
} 