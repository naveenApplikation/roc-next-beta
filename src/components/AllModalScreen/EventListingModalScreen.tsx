//@ts-nocheck
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
   closeModal("eventListing");
    switch(true)
    {
       case params.event?true:false:
            if(path?.includes('eventCategory'))
            {
            router.replace(`/eventCategory/${params?.event}`)
            }
            else if(path?.includes('eventByDate')){
                  router.replace(`/eventByDate/${params?.event}`)
            }
            break;
       
       default:
            router.replace(``);

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
        }
      >
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
