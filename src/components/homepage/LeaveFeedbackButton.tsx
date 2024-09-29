"use client"

import React from 'react';
import CommonButton from "@/components/button/CommonButton";
import {LeaveFeedbackButtonContainer} from '@/app/style';
import { useMyContext } from "@/app/Context/MyContext";

const LeaveFeedbackButton = () => {

    const {menuClick } = useMyContext();

  return (
    <div
      className="pl-[40px] pr-[40px] pb-[120px]"
      onClick={() => menuClick("LeaveFeedback")}
    >
      <CommonButton text="Leave feedback" />
    </div>
  );
}

export default LeaveFeedbackButton