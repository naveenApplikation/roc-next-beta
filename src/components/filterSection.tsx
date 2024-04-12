import { SoryByItem, topSideMenu } from "@/app/dashboard/data";
import { filterSearch } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import DropDwons from "./dropdowns";
import { useMyContext } from "@/app/Context/MyContext";

interface FilterSectionProps {
  // Define your props here
}

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

const FilterSection: React.FC<FilterSectionProps> = (props) => {
  const { modalClick } = useMyContext();

  return (
    <FilterContainer>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2Ffilter-list.png?alt=media&token=626f0d43-3a9a-40ed-8a1c-e35b105be153"
        width={32}
        height={20}
        onClick={() => modalClick("modalFilter")}
        style={{cursor:"pointer"}}
        alt=""
      />
      <ScrollingMenu>
        <DropDwons items={SoryByItem} name="Sort by" />
        <FilterButton>Kids</FilterButton>
        <DropDwons items={SoryByItem} name="Price" />
        <FilterButton>Top Rated</FilterButton>
        <FilterButton>Free</FilterButton>
        <FilterButton>Most Like</FilterButton>
      </ScrollingMenu>
    </FilterContainer>
  );
};

export default FilterSection;
