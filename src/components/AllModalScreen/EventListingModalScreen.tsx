"use client";
import React, { useState } from "react";
import EventListingModalLayout from "@/components//modal/Modal";
import EventListingModal from "@/components/modal/EventListing";
import { useMyContext } from "@/app/Context/MyContext";
import ModalContent from "../modal/PlaceModal/ModalContent";

import { usePathname, useRouter } from "next/navigation";

interface DashboardSearchContainerProps {
  showMap: boolean;
  params?: any;
}

const EventListingModalScreen: React.FC<DashboardSearchContainerProps> = ({
  showMap,
  params,
}) => {
  const {
    modalName,
    closeModal,
    modalClick,
    dataDetails,
    modalType,
    dataUrlImage,
    reservationMenu,
  } = useMyContext();
  const path = usePathname();
  const router = useRouter();
  console.log(params);
  const handleClose = () => {
    console.log(params);

    if (params?.eventName) {
      closeModal("eventListing");

      router.replace(``);
    } else {
      //  router.replace(`/screens/${params.events}?categoryID=${searchParams.get('categoryID')}`);
      closeModal("eventListing");
      if (path.includes("upcoming")) {
        router.replace("/eventCategory/upcoming");
      }
    }
  };

  return (
    <>
      <EventListingModalLayout
        isOpen={modalType.eventListing}
        onClose={handleClose}
        name="eventListing"
        {...{ showMap }}
        title={
          dataDetails?.data_type === "google"
            ? dataDetails?.name
            : dataDetails?.acf?.title
        }>
        {dataDetails?.data_type === "google" ? (
          <ModalContent
            onClose={() => closeModal("ModalContent")}
            reservationModal={modalClick}
            dataImage={dataUrlImage}
            data={dataDetails}
            reservationMenu={reservationMenu}
          />
        ) : (
          <EventListingModal
            dataImage={dataUrlImage}
            reservationModal={modalClick}
            data={dataDetails}
          />
        )}
      </EventListingModalLayout>
    </>
  );
};

export default EventListingModalScreen;
