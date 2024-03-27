import { SoryByItem, topSideMenu } from '@/app/dashboard/data';
import { filterSearch } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import DropDwons from './dropdowns';

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
    border:none;
    border-radius:8px;
    font-size:13px;
    font-weight:500;
    background:white;
    padding:12px;
    min-width:90px;
    `
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
    return (
        <FilterContainer>
            <Image src={filterSearch} alt="" />
            <ScrollingMenu>
                <DropDwons items={SoryByItem} name="Sort by" />
                <FilterButton>Open</FilterButton>
                <DropDwons items={SoryByItem} name="Price" />
                <FilterButton>Top Rated</FilterButton>
            </ScrollingMenu>
        </FilterContainer>
    )
};

export default FilterSection;