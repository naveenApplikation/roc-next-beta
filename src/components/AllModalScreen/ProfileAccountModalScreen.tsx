import React,{useState} from "react";
import CreateAccountModalLayout from "@/components//modal/Modal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CreateAccountContent from "@/app/dashboard/Menu Modal Contents/CreateAccount";
import LoginAccountContent from "@/app/dashboard/Menu Modal Contents/Login";
import UpdateMyDetails from "@/app/dashboard/Menu Modal Contents/UpdateMyDetails";
import UpdateMyEmail from "@/app/dashboard/Menu Modal Contents/UpdateMyEmail";
import UpdateName from "@/app/dashboard/Menu Modal Contents/UpdateName";
import UpdatePasssword from "@/app/dashboard/Menu Modal Contents/UpdatePasssword";
import ContactUs from "@/app/dashboard/Menu Modal Contents/ContactUs";
import UpdateMyPreferences from "@/app/dashboard/Menu Modal Contents/UpdateMyPreferences";
import Welcomeback from "@/app/dashboard/Menu Modal Contents/Welcomeback";
import ThankYouDiresctoryModal from "@/components/modal/ThankYouDiresctoryModal";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const ProfileAccountModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

    const showLoginHandle = () => {
        if (modalName === "createAccountModal") {
          return (
            <>
              <CreateAccountContent
                isOpen={() => modalClick("LoginAccountModal")}
                nextModal={() => modalClick("WelcomeBackModal")}
              />
            </>
          );
        } else if (modalName === "LoginAccountModal") {
          return (
            <>
              <LoginAccountContent
                previousModal={() => modalClick("createAccountModal")}
                nextModal={() => modalClick("WelcomeBackModal")}
              />
            </>
          );
        } else if ((modalName === "WelcomeBackModal") || ( modalName === "myList")) {
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
            modalName === "createAccountModal" ||
            modalName === "LoginAccountModal" ||
            modalName === "WelcomeBackModal" ||
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
          name="createAccountModal"
          title={
            (modalName === "createAccountModal" && "Create an account") ||
            (modalName === "LoginAccountModal" && "Login") ||
            (modalName === "WelcomeBackModal" && "Welcome back!") ||
            (modalName === "UpdateMyDetailsModal" && "Update my details") ||
            (modalName === "UpdateMyEmailModal" && "Update my email") ||
            (modalName === "UpdateNameModal" && "Update my name") ||
            (modalName === "UpdatePassswordModal" && "Update my password") ||
            (modalName === "myList" && "Welcome back!") ||
            (modalName === "ContactUsModal" && "Contact us") ||
            (modalName === "LoginThankYouDiresctoryModal" && "Thank you") ||
            (modalName === "UpdateMyPreferencesModal" &&
              "Update my preferences")
          }
        >
          {showLoginHandle()}
        </CreateAccountModalLayout>
    </>
  );
};

export default ProfileAccountModalScreen;
