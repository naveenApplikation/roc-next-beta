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

interface DashboardSearchContainerProps {
  showMap: boolean;
}

const ProfileAccountModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
}) => {

  const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;
  
  const { modalName, closeModal, modalClick} = useMyContext();

  const showLoginHandle = () => {
    if (modalName === "createAccountModal") {
      return (
        <>
          {loginToken ? (
            <Welcomeback
              isOpen={() => modalClick("UpdateMyDetailsModal")}
              isOpenContact={() => modalClick("ContactUsModal")}
              myListOpen={() => modalClick("myList")}
            />
          ) : (
            <CreateAccountContent
              isOpen={() => modalClick("LoginAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          )}
        </>
      );
    } else if (modalName === "LoginAccountModal") {
      return (
        <>
          {loginToken ? (
            <Welcomeback
              isOpen={() => modalClick("UpdateMyDetailsModal")}
              isOpenContact={() => modalClick("ContactUsModal")}
              myListOpen={() => modalClick("myList")}
            />
          ) : (
            <LoginAccountContent
              previousModal={() => modalClick("createAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          )}
        </>
      );
    } else if (modalName === "WelcomeBackModal" || modalName === "myList") {
      return (
        <>
          <Welcomeback
            isOpen={() => modalClick("UpdateMyDetailsModal")}
            isOpenContact={() => modalClick("ContactUsModal")}
            myListOpen={() => modalClick("myList")}
          />
        </>
      );
    } else if (modalName === "UpdateMyDetailsModal") {
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
      return (
        <>
          <UpdateMyEmail
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "UpdateNameModal") {
      return (
        <>
          <UpdateName
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "UpdatePassswordModal") {
      return (
        <>
          <UpdatePasssword
            isOpen={() => modalClick("WelcomeBackModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </>
      );
    } else if (modalName === "ContactUsModal") {
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
          modalName === "LoginAccountModal" ||
          modalName === "UpdateMyDetailsModal" ||
          modalName === "UpdateMyEmailModal" ||
          modalName === "UpdatePassswordModal" ||
          modalName === "UpdateNameModal" ||
          modalName === "myList" ||
          modalName === "ContactUsModal" ||
          modalName === "LoginThankYouDiresctoryModal" ||
          modalName === "UpdateMyPreferencesModal"
        }
        onClose={() => closeModal("createAccountModal")}
        {...{ showMap }}
        name=""
        title={
          (modalName === "WelcomeBackModal" && "Welcome back!") ||
          (modalName === "createAccountModal" &&
            loginToken &&
            "Welcome back!") ||
          (modalName === "createAccountModal" && "Create an account") ||
          (modalName === "LoginAccountModal" && "Login") ||
          (modalName === "UpdateMyDetailsModal" && "Update my details") ||
          (modalName === "UpdateMyEmailModal" && "Update my email") ||
          (modalName === "UpdateNameModal" && "Update my name") ||
          (modalName === "UpdatePassswordModal" && "Update my password") ||
          (modalName === "myList" && "Welcome back!") ||
          (modalName === "ContactUsModal" && "Contact us") ||
          (modalName === "LoginThankYouDiresctoryModal" && "Thank you") ||
          (modalName === "UpdateMyPreferencesModal" && "Update my preferences")
        }
      >
        {showLoginHandle()}
      </CreateAccountModalLayout>
    </>
  );
};

export default ProfileAccountModalScreen;
