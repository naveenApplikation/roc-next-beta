'use client'
import { useMyContext } from '@/app/Context/MyContext';
import CommonButton from '@/components/button/CommonButton';
import React from 'react'

const CreateList = () => {

    const {menuClick,modalClick}=useMyContext()
    const clickOnCreate = () => {
        const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;
        if (loginToken) {
          menuClick("AddToCreate")
        } else {
          modalClick("LoginSignupModal")
        }
      }
    
  return (
    <div className='px-[40px] flex justify-center' onClick={() => clickOnCreate()}>
    <CommonButton text="Create a List" />
  </div>
  )
}

export default CreateList