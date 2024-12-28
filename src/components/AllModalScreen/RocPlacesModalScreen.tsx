import React, { useState } from "react";
import RocPlacesModalLayout from "@/components//modal/Modal";
import ActivitiesModal from "@/components/modal/ActivitiesModal";
import { useMyContext } from "@/app/Context/MyContext";
import { useParams, useRouter } from "next/navigation";
import RocPlacesModal from "../modal/RocPlacesModal";

interface DashboardSearchContainerProps {
  showMap: boolean;
  params?: any;
  searchQuery?: any;
}

const RocPlacesModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
}) => {
  const {
    modalName,
    closeModal,
    modalClick,
    dataDetails,
    modalType,
    dataUrlImage,
    rocPlaces,
  } = useMyContext();
  const params = useParams();
  // console.log(dataDetails)
  const router = useRouter();

  const handleClose = () => {
    closeModal("rocPlaces");
  };

  // console.log("modaltype",modalType.rocPlaces,rocPlaces)

  return (
    <>
      <RocPlacesModalLayout
        isOpen={modalType.rocPlaces}
        onClose={handleClose}
        name="rocPlaces"
        {...{ showMap }}
        title={rocPlaces?.acf?.title}
      >
        <RocPlacesModal
          dataImage={rocPlaces.urlImage}
          reservationModal={modalClick}
          data={rocPlaces}
        />
      </RocPlacesModalLayout>
    </>
  );
};

export default RocPlacesModalScreen;
