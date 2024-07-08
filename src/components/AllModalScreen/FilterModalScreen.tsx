import React from "react";
import FilterModalLayout from "@/components//modal/Modal";
import FilterModal from "@/components/modal/FilterModal";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
  showMap: boolean
}

const FilterModalScreen: React.FC<DashboardSearchContainerProps> = ({ showMap }) => {

  const { closeModal, modalType } = useMyContext();

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
