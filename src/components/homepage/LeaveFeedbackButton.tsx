"use client"

import React from 'react';
import CommonButton from "@/components/button/CommonButton";
import {LeaveFeedbackButtonContainer} from '@/app/style';
import { useMyContext } from "@/app/Context/MyContext";

const LeaveFeedbackButton = () => {

    const {menuClick } = useMyContext();

  return (
    <LeaveFeedbackButtonContainer onClick={() => menuClick("LeaveFeedback")}>
        <CommonButton text="Leave feedback" />
      </LeaveFeedbackButtonContainer>
  )
}

export default LeaveFeedbackButton