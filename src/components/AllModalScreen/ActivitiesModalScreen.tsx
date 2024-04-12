import React,{useState} from "react";
import ActivitiesModalLayout from "@/components//modal/Modal";
import ModalContent from "@/app/dashboard/ModalContent";
import ActivitiesModal from "@/components/modal/ActivitiesModal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const ActivitiesModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
      <ActivitiesModalLayout
          isOpen={modalType.activities}
          onClose={() => closeModal("activities")}
          name="activities"
          {...{ showMap }}
          title={dataDetails.resturantName}
        >
         <ActivitiesModal dataImage={dataDetails.headerImage} reservationModal={modalClick} />
        </ActivitiesModalLayout>
    </>
  );
};

export default ActivitiesModalScreen;
