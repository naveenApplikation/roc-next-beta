import React, { useState } from "react";
import ActivitiesModalLayout from "@/components//modal/Modal";
import ActivitiesModal from "@/components/modal/ActivitiesModal";
import { useMyContext } from "@/app/Context/MyContext";
import { useRouter } from "next/navigation";

interface DashboardSearchContainerProps {
  showMap: boolean;
  params?: any;
  searchQuery?: any;
}

const ActivitiesModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
  params,
  searchQuery,
}) => {
  const {
    modalName,
    closeModal,
    modalClick,
    dataDetails,
    modalType,
    dataUrlImage,
  } = useMyContext();

  const router = useRouter();
  console.log(params);
  const handleClose = () => {
    console.log(params);
    if (params) {
      closeModal("activities");
      router.replace(
        `/categories/${params.eventName}?search=${searchQuery.get("search")}`
      );
    } else {
      //  router.replace(`/screens/${params.events}?categoryID=${searchParams.get('categoryID')}`);
      closeModal("activities");
    }
  };

  return (
    <>
      <ActivitiesModalLayout
        isOpen={modalType.activities}
        onClose={handleClose}
        name="activities"
        {...{ showMap }}
        title={
          dataDetails?.data_type === "google"
            ? dataDetails?.name
            : dataDetails?.acf?.title
        }
      >
        <ActivitiesModal
          dataImage={dataUrlImage}
          reservationModal={modalClick}
          data={dataDetails}
        />
      </ActivitiesModalLayout>
    </>
  );
};

export default ActivitiesModalScreen;
