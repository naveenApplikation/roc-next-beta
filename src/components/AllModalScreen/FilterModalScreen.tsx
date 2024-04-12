import React,{useState} from "react";
import FilterModalLayout from "@/components//modal/Modal";
import ModalContent from "@/app/dashboard/ModalContent";
import FilterModal from "@/components/modal/FilterModal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const FilterModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
      <FilterModalLayout
          isOpen={modalType.modalFilter}
          onClose={() => closeModal("modalFilter")}
          name="modalFilter"
          {...{ showMap }}
        >
          <FilterModal />
        </FilterModalLayout>
    </>
  );
};

export default FilterModalScreen;
