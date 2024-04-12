import React,{useState} from "react";
import DashBoardModal from "@/components//modal/Modal";
import ModalContent from "@/app/dashboard/ModalContent";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const PlacesModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
      <DashBoardModal
          isOpen={modalType.ModalContent}
          // isOpen={modalName === "ModalContent" }
          onClose={() => closeModal("ModalContent")}
          name="ModalContent"
          {...{ showMap }}
          title={dataDetails.resturantName}
        >
          <ModalContent
            onClose={() => closeModal("ModalContent")}
            reservationModal={modalClick}
            dataImage={dataDetails.headerImage}
          />
        </DashBoardModal>
    </>
  );
};

export default PlacesModalScreen;
