import React, { useState } from "react";
import DashBoardModal from "@/components//modal/Modal";
import ModalContent from "@/components/modal/PlaceModal/ModalContent";
import EventListingModal from "@/components/modal/EventListing";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
  showMap: boolean
}

const PlacesModalScreen: React.FC<DashboardSearchContainerProps> = ({ showMap }) => {

  const { closeModal, modalClick, dataDetails, modalType, dataUrlImage, reservationMenu } = useMyContext();

  return (
    <>
      <DashBoardModal
        isOpen={modalType.ModalContent}
        onClose={() => closeModal("ModalContent")}
        name="ModalContent"
        {...{ showMap }}
        title={dataDetails?.data_type === "google" ? dataDetails?.name : dataDetails?.acf?.title}
      >

        {dataDetails?.data_type === "google" ?
          <ModalContent
            onClose={() => closeModal("ModalContent")}
            reservationModal={modalClick}
            dataImage={dataUrlImage}
            data={dataDetails}
            reservationMenu={reservationMenu}
          /> :
          <EventListingModal
            dataImage={dataUrlImage}
            reservationModal={modalClick}
            data={dataDetails}
          />
        }
      </DashBoardModal>
    </>
  );
};

export default PlacesModalScreen;
