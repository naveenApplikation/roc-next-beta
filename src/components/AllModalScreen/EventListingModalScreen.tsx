import React,{useState} from "react";
import EventListingModalLayout from "@/components//modal/Modal";
import ModalContent from "@/app/dashboard/ModalContent";
import EventListingModal from "@/components/modal/EventListing";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const EventListingModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
      <EventListingModalLayout
          isOpen={modalType.eventListing}
          onClose={() => closeModal("eventListing")}
          name="eventListing"
          {...{ showMap }}
          title={dataDetails.eventName}
        >
         <EventListingModal dataImage={dataDetails.headerImage} reservationModal={modalClick} />
        </EventListingModalLayout>
    </>
  );
};

export default EventListingModalScreen;
