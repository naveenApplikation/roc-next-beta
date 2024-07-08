import React, { useState } from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import DirectionModal from "@/components/modal/DirectionModal";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
  showMap: boolean
}

const ViewDirectionModalScreen: React.FC<DashboardSearchContainerProps> = ({ showMap }) => {

  const { closeModal,dataDetails, modalType } = useMyContext();


  return (
    <>
      <DirectionModalLayout
        isOpen={modalType.DirectionModal}
        onClose={() => closeModal("DirectionModal")}
        name="DirectionModal"
        {...{ showMap }}
        title="Directions"
      >
        <DirectionModal dataDetails={dataDetails} />
      </DirectionModalLayout>
    </>
  );
};

export default ViewDirectionModalScreen;
