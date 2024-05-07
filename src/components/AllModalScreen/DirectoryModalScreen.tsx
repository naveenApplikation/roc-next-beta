import React,{useState} from "react";
import AddToDirectoryModalLayout from "@/components//modal/Modal";
import AddToDirectoryModal from "../../components/modal/AddToDirectoryModal";
import CreateDirectoryModal from "../../components/modal/CreateDirectoryModal";
import ThankYouDiresctoryModal from "../../components/modal/ThankYouDiresctoryModal";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const DirectoryModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

    const DirectoryModalHandle = () => {
        if (modalName === "AddDirectoryModal") {
          return (
            <>
              <AddToDirectoryModal
                isOpen={() => modalClick("CreateDirectoryModal")}
              />
            </>
          );
        } else if (modalName === "CreateDirectoryModal") {
          return (
            <>
              <CreateDirectoryModal
                isOpen={() => modalClick("ThankYouDiresctoryModal")}
              />
            </>
          );
        } else if (modalName === "ThankYouDiresctoryModal") {
          return (
            <>
              <ThankYouDiresctoryModal
                isOpen={() => closeModal("AddDirectoryModal")}
              />
            </>
          );
        }
      };

  return (
    <>
      <AddToDirectoryModalLayout
          isOpen={
            modalName === "AddDirectoryModal" ||
            modalName === "CreateDirectoryModal" ||
            modalName === "ThankYouDiresctoryModal"
          }
          onClose={() => closeModal("AddDirectoryModal")}
          name="AddDirectoryModal"
          {...{ showMap }}
          title={
            (modalName === "AddDirectoryModal" && "Add to directory") ||
            (modalName === "CreateDirectoryModal" && "Add to directory") ||
            (modalName === "ThankYouDiresctoryModal" && "Thank you")
          }
        >
          {DirectoryModalHandle()}
        </AddToDirectoryModalLayout>
    </>
  );
};

export default DirectoryModalScreen;
