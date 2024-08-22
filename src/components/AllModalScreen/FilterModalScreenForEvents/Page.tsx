'use client'
import React from "react";
import FilterModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import dynamic from "next/dynamic";
const FilterModalContent = dynamic(() => import("./FilterModalContent"), {
  ssr: false,
});

interface DashboardSearchContainerProps {
   
}

const FilterModalScreenEvents: React.FC<DashboardSearchContainerProps> = ({
 
}) => {
  const { closeModal, modalType, filterOptions,showMap } = useMyContext();

  return (
    <>
      <FilterModalLayout
        isOpen={modalType.filterOption}
        onClose={() => closeModal("filterOption")}
        name="filterOption"
        {...{ showMap }}
        title={filterOptions.title}
      >
        <FilterModalContent />
      </FilterModalLayout>
    </>
  );
};

export default FilterModalScreenEvents;
