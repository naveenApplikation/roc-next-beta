import React,{useState} from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import DirectionModal from "@/components/modal/DirectionModal";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const ViewDirectionModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
         <DirectionModalLayout
          isOpen={modalType.DirectionModal}
          onClose={() => closeModal("DirectionModal")}
          name="DirectionModal"
          {...{ showMap }}
          title="Directions"
        >
          <DirectionModal />
        </DirectionModalLayout>
    </>
  );
};

export default ViewDirectionModalScreen;
