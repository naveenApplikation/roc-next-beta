import React,{useState} from "react";
import CalenderModalLayout from "@/components//modal/Modal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CalenderModal from "@/app/dashboard/calenderModal";
import CommonButton from "@/components/button/CommonButton";
import PlacesFormModal from "@/app/dashboard/placesFormModal";
import PlacesConfirmModal from "@/app/dashboard/placeConfirmNodal";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const CalenderBookDatesModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

    const showModalContent = () => {
        if (modalName === "calenderModal") {
          return (
            <>
              <CalenderModal onClose={closeModal} />
              <div
                style={{ marginTop: 16, padding: "0px 24px" }}
                onClick={() => modalClick("calenderPlaceModal")}
              >
                <CommonButton text="Next" />
              </div>
            </>
          );
        } else if (modalName === "calenderPlaceModal") {
          return (
            <>
              <PlacesFormModal />
              <div
                style={{ marginTop: 16, padding: "0px 24px" }}
                onClick={() => modalClick("PlacesConfirmModal")}
              >
                <CommonButton text="Next" />
              </div>
            </>
          );
        } else if (modalName === "PlacesConfirmModal") {
          return (
            <>
              <PlacesConfirmModal />
              <div
                style={{ marginTop: 16, padding: "0px 24px" }}
                onClick={() => closeModal("PlacesConfirmModal")}
              >
                <CommonButton text="Done" />
              </div>
            </>
          );
        }
      };

  return (
    <>
      <CalenderModalLayout
          isOpen={
            modalName === "calenderModal" ||
            modalName === "calenderPlaceModal" ||
            modalName === "PlacesConfirmModal"
          }
          onClose={() => closeModal("calenderModal")}
          {...{ showMap }}
          name="calenderModal"
          title="Brasserie Colmar"
        >
          {showModalContent()}
          {/* <CalenderModal onClose={closeModal} />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={() => modalClick("calenderPlaceModal")}
          >
            <CommonButton text="Next" />
          </div> */}
        </CalenderModalLayout>
    </>
  );
};

export default CalenderBookDatesModalScreen;
