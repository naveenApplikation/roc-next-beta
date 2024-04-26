import React,{useState} from "react";
import DashBoardModal from "@/components//modal/Modal";
import ModalContent from "@/components/modal/PlaceModal/ModalContent";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const PlacesModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType,dataUrlImage } = useMyContext();

  return (
    <>
      <DashBoardModal
          isOpen={modalType.ModalContent}
          // isOpen={modalName === "ModalContent" }
          onClose={() => closeModal("ModalContent")}
          name="ModalContent"
          {...{ showMap }}
          title={dataDetails?.acf?.title}
        >
          <ModalContent
            onClose={() => closeModal("ModalContent")}
            reservationModal={modalClick}
            dataImage={dataUrlImage}
            data={dataDetails}
          />
        </DashBoardModal>
    </>
  );
};

export default PlacesModalScreen;
