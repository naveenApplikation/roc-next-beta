"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import { filterSearch } from "@/app/utils/ImagePath";
import { usePathname, useRouter } from "next/navigation";
import caret from '../../assets/images/caret-down.svg'

interface FilterSectionProps {
  // Define your props here
  pageTitle?: string;
  tabValue?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  pageTitle,
  tabValue,
}) => {
  const { modalClick, modalType, closeModal, selectFilter, setSelectFilter } =
    useMyContext();
  // const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleDropdown = () => {
    modalClick("modalFilterList");
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
    }
  };

  // console.log("pathNamepathName", pathName)
  useEffect(() => {
    setSelectFilter("Any");
  }, [pathName, tabValue]);

  return (
    <FilterContainer>
      {pageTitle === "search" && (
        <Image
          src={filterSearch}
          onClick={() => modalClick("modalFilter")}
          style={{ cursor: "pointer" }}
          alt=""
        />
      )}

      <ScrollingMenu>
        {/* <DropDwons items={SoryByItem} name="Sort by" /> */}
        <DropdownButton
          onClick={toggleDropdown}
          className={modalType.modalFilterList ? "active" : ""}>
          {selectFilter === "Any" ? "Parish" : selectFilter}
          <Caret className={modalType.modalFilterList ? "active" : ""}>
            {modalType.modalFilterList ? <Image src={caret} alt="infoCirlce" /> :  <Image src={caret} alt="infoCirlce" />}
          </Caret>
        </DropdownButton>
        {/* <FilterButton onClick={toggleDropdown}> Kids </FilterButton>
        <DropDwons items={SoryByItem} name="Price" />
        <FilterButton>Top Rated</FilterButton>
        <FilterButton>Free</FilterButton>
        <FilterButton>Most Like</FilterButton> */}
      </ScrollingMenu>
    </FilterContainer>
  );
};

export default FilterSection;

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;
const TopsideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 56px;

  p {
    font-size: 14px;
    font-weight: 400;
  }
`;
const FilterButton = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: white;
  padding: 12px;
  min-width: 90px;

  span {
    margin-left: 10px;
    font-size: 12px;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  /* margin-top: 20px;
    margin-bottom: 30px; */
  div {
    padding: 0px;
  }
`;
const DropdownButton = styled.button`
  background: #ffffff;
  color: #000000;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;

  // &:hover {
  //   background-color: #0056b3;
  // }

  &.active {
    background-color: #d1d1d1;
  }
`;

const Caret = styled.span`
  margin-left: 10px;
  font-size: 12px;
  transition: transform 0.3s;

  &.active {
    transform: rotate(-90deg);
  }
`;
