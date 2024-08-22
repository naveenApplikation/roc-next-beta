'use client'
import React from "react";
import FilterModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import FilterListModal from "../modal/FilterListModal";

interface DashboardSearchContainerProps {
   
}

const FilterListModalScreen: React.FC<DashboardSearchContainerProps> = ()=> {

    const {closeModal, modalType ,showMap} = useMyContext();

  return (
    <>
      <FilterModalLayout
          isOpen={modalType.modalFilterList}
          onClose={() => closeModal("modalFilterList")}
          name="modalFilterList"
          {...{ showMap }}
          title={modalType.modalFilterList && "Parish"}
        >
          <FilterListModal />
        </FilterModalLayout>
    </>
  );
};

export default FilterListModalScreen;
