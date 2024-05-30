import React, { useState } from "react";
import CreateAccountModalLayout from "@/components//modal/Modal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CreateAccountContent from "@/components/LoginSignup/CreateAccount";
import LoginAccountContent from "@/components/LoginSignup/Login";
import UpdateMyDetails from "@/components/LoginSignup/UpdateMyDetails";
import UpdateMyEmail from "@/components/LoginSignup/UpdateMyEmail";
import UpdateName from "@/components/LoginSignup/UpdateName";
import UpdatePasssword from "@/components/LoginSignup/UpdatePasssword";
import ContactUs from "@/components/LoginSignup/ContactUs";
import UpdateMyPreferences from "@/components/LoginSignup/UpdateMyPreferences";
import Welcomeback from "@/components/LoginSignup/Welcomeback";
import ThankYouDiresctoryModal from "@/components/modal/ThankYouDiresctoryModal";
import { useRouter } from "next/navigation";
import LoginSignupModal from "../LoginSignup/loginSignupModal";
import TermsAndConditionModal from "../LoginSignup/termsAndConditionModal/page";
import FeedbackModal from "../LoginSignup/FeedbackModal";
import WalksModal from "./WalksModal";
import AboutUs from "../LoginSignup/AboutUs";
// import WalksModal from "./WalksModal";

interface DashboardSearchContainerProps {
  showMap: boolean;
}

const ProfileAccountModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
}) => {
  const loginToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginToken")
      : null;

  const { modalName, closeModal, modalClick, setOldName, oldName } =
    useMyContext();
  const router = useRouter();

  const logoutClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  const onClick = (name: string) => {
    if (name === "AddToCreate") {
      router.push("/screens/createList");
    }
  };

  const showLoginHandle = () => {
    if (modalName === "createAccountModal") {
      return (
        <>
          {loginToken ? (
            <Welcomeback
              isOpen={() => modalClick("UpdateMyDetailsModal")}
              isOpenContact={() => modalClick("ContactUsModal")}
              isOpenAboutUs={() => modalClick("AboutUs")}
              myListOpen={() => modalClick("myList")}
              {...{ logoutClick, onClick }}
            />
          ) : (
            <CreateAccountContent
              isOpen={() => modalClick("LoginAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          )}
        </>
      );
    } else if (modalName === "LoginSignupModal") {
      return (
        <>
          {loginToken ? (
            <Welcomeback
              isOpen={() => modalClick("UpdateMyDetailsModal")}
              isOpenContact={() => modalClick("ContactUsModal")}
              isOpenAboutUs={() => modalClick("AboutUs")}
              myListOpen={() => modalClick("myList")}
              {...{ logoutClick, onClick }}
            />
          ) : (
            <LoginSignupModal
              isOpen={() => modalClick("ContactUsModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
              isOpenAboutUs={() => modalClick("AboutUs")}
              {...{ onClick }}
              myListOpen={() => modalClick("TermsAndConditionModal")}
            />
          )}
        </>
      );
    } else if (modalName === "TermsAndConditionModal") {
      return <TermsAndConditionModal />;
    } else if (modalName === "LeaveFeedback") {
      setOldName("WelcomeBackModal");
      return <FeedbackModal />;
    } else if (modalName === "LoginAccountModal") {
      return (
        <>
          {loginToken ? (
            <Welcomeback
              isOpen={() => modalClick("UpdateMyDetailsModal")}
              isOpenContact={() => modalClick("ContactUsModal")}
              isOpenAboutUs={() => modalClick("AboutUs")}
              myListOpen={() => modalClick("myList")}
              {...{ logoutClick, onClick }}
            />
          ) : (
            <LoginAccountContent
              previousModal={() => modalClick("createAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          )}
        </>
      );
      // } else if (modalName === "WelcomeBackModal" || modalName === "myList") {
    } else if (modalName === "WelcomeBackModal") {
      return (
        <>
          <Welcomeback
            isOpen={() => modalClick("UpdateMyDetailsModal")}
            isOpenContact={() => modalClick("ContactUsModal")}
            isOpenAboutUs={() => modalClick("AboutUs")}
            myListOpen={() => modalClick("myList")}
            {...{ logoutClick, onClick }}
          />
        </>
      );
    } else if (modalName === "UpdateMyDetailsModal") {
      setOldName(loginToken ? "WelcomeBackModal" : "LoginSignupModal");
      return (
        <>
          <UpdateMyDetails
            isOpen={() => modalClick("UpdateMyEmailModal")}
            isOpenName={() => modalClick("UpdateNameModal")}
            isOpenPassword={() => modalClick("UpdatePassswordModal")}
            isOpenContact={() => modalClick("UpdateMyPreferencesModal")}
            previousModal={() => modalClick("WelcomeBackModal")}
          />
        </>
      );
    } else if (modalName === "UpdateMyEmailModal") {
      setOldName("UpdateMyDetailsModal");
      return (
        <>
          <UpdateMyEmail
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "UpdateNameModal") {
      setOldName("UpdateMyDetailsModal");
      return (
        <>
          <UpdateName
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "UpdatePassswordModal") {
      setOldName("UpdateMyDetailsModal");
      return (
        <>
          <UpdatePasssword
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "AboutUs") {
      setOldName("WelcomeBackModal");
      return (
        <>
          <AboutUs
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "ContactUsModal") {
      setOldName(loginToken ? "WelcomeBackModal" : "LoginSignupModal");
      return (
        <>
          <ContactUs
            isOpen={() => modalClick("LoginThankYouDiresctoryModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "LoginThankYouDiresctoryModal") {
      return (
        <>
          <ThankYouDiresctoryModal
            isOpen={() => closeModal("createAccountModal")}
          />
        </>
      );
    } else if (modalName === "UpdateMyPreferencesModal") {
      setOldName("UpdateMyDetailsModal");
      return (
        <>
          <UpdateMyPreferences
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    }
  };

  return (
    <>
      <CreateAccountModalLayout
        isOpen={
          modalName === "WelcomeBackModal" ||
          modalName === "createAccountModal" ||
          modalName === "LeaveFeedback" ||
          modalName === "LoginAccountModal" ||
          modalName === "LoginSignupModal" ||
          modalName === "UpdateMyDetailsModal" ||
          modalName === "UpdateMyEmailModal" ||
          modalName === "UpdatePassswordModal" ||
          modalName === "UpdateNameModal" ||
          modalName === "TermsAndConditionModal" ||
          modalName === "myList" ||
          modalName === "ContactUsModal" ||
          modalName === "LoginThankYouDiresctoryModal" ||
          modalName === "UpdateMyPreferencesModal" ||
          modalName === "AboutUs"
        }
        onClose={() => closeModal("createAccountModal")}
        {...{ showMap }}
        name=""
        title={
          (modalName === "LoginSignupModal" && loginToken && "Welcome back!") ||
          (modalName === "WelcomeBackModal" && "Welcome back!") ||
          (modalName === "TermsAndConditionModal" && "Terms & Conditions") ||
          (modalName === "createAccountModal" &&
            loginToken &&
            "Welcome back!") ||
          (modalName === "createAccountModal" && "Create an account") ||
          (modalName === "LoginAccountModal" && "Login") ||
          (modalName === "UpdateMyDetailsModal" && "Update my details") ||
          (modalName === "UpdateMyEmailModal" && "Update my email") ||
          (modalName === "UpdateNameModal" && "Update my name") ||
          (modalName === "LeaveFeedback" && "Feedback") ||
          (modalName === "UpdatePassswordModal" && "Update my password") ||
          (modalName === "myList" && "My Lists") ||
          (modalName === "ContactUsModal" && "Contact us") ||
          (modalName === "LoginThankYouDiresctoryModal" && "Thank you") ||
          (modalName === "AboutUs" && "About us") ||
          (modalName === "UpdateMyPreferencesModal" && "Update my preferences")
        }>
        {showLoginHandle()}
      </CreateAccountModalLayout>
    </>
  );
};

export default ProfileAccountModalScreen;
