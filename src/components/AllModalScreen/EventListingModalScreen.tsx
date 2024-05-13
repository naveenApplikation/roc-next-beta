import React, { useState } from "react";
import EventListingModalLayout from "@/components//modal/Modal";
import EventListingModal from "@/components/modal/EventListing";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
  showMap: boolean;
}

const EventListingModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
}) => {
  const { modalName, closeModal, modalClick, dataDetails, modalType, dataUrlImage } = useMyContext();
console.log("jflkdklfsljfjlkds", dataDetails)
  return (
    <>
      <EventListingModalLayout
        isOpen={modalType.eventListing}
        onClose={() => closeModal("eventListing")}
        name="eventListing"
        {...{ showMap }}
        title={dataDetails?.data_type === "google" ? dataDetails?.name : dataDetails?.acf?.title}
      >
        <EventListingModal
          dataImage={dataUrlImage}
          reservationModal={modalClick}
          data={dataDetails}
        />
      </EventListingModalLayout>
    </>
  );
};

export default EventListingModalScreen;
