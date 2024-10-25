"use client"

import React from "react";
import styled from "styled-components";
import {ProximaNovaRegular,interBold} from '../../../assets/styles/Font'

interface MenuProps {
  title: string;
  isOpen?: () => void;
  hideShowAll?: boolean
}
 

const MenuDetails: React.FC<MenuProps> = ({ isOpen, title, hideShowAll }) => {
  return (
    <div>
      <div className="flex items-center justify-between px-[40px] max-[800px]:px-[16px]">
        <p className="text-[24px] font-bold leading-none">{title}</p>
        {!hideShowAll &&
          <p className="text-[14px] font-bold leading-none cursor-pointer" onClick={isOpen}>
            View All
          </p>}
      </div>
    </div>
  );
};

export default MenuDetails;
