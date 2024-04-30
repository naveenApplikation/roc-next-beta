"use client";

import React, { useState } from 'react';
import CreateListings from '@/components/createList/CreateListings'
import DragInOrder from '@/components/createList/DragInOrder';
import AddComments from '@/components/createList/AddComments';
import ListDetails from '@/components/createList/ListDetails';
import Greetings from '@/components/createList/Greetings';
import ProductAndCommentInfo from '@/components/createList/ProductAndCommentInfo';
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter(); 

  const navigateClick = () => {
    router.push("/");
  };

  const [screenName, setScreenName] = useState("create"); // Set default screen

  const screenChangeHandle = (name:string)=>{
    
    setScreenName(name)
  }

  const ScreenShowHandle = () => {
    if (screenName === "create") {
      return <CreateListings ScreenSwitch={()=>screenChangeHandle("drag")} homePage={navigateClick} />;
    } else if (screenName === "drag") {
      return <DragInOrder ScreenSwitch={()=>screenChangeHandle("ListDetails")} preScreen={()=>screenChangeHandle("create")} homePage={navigateClick} />;
    } else if (screenName === "AddComments") {
      return <AddComments ScreenSwitch={()=>screenChangeHandle("ListDetails")} preScreen={()=>screenChangeHandle("ListDetails")} homePage={navigateClick} />;
    } else if (screenName === "ListDetails") {
      return <ListDetails ScreenSwitch={()=>screenChangeHandle("ProductAndCommentInfo")} preScreen={()=>screenChangeHandle("drag")} homePage={navigateClick}  />;
    } else if(screenName === "ProductAndCommentInfo"){
      return <ProductAndCommentInfo ScreenSwitch={()=>screenChangeHandle("Greetings")} preScreen={()=>screenChangeHandle("ListDetails")} homePage={navigateClick}  />;
    }
    else if (screenName === "Greetings") {
      return <Greetings homePage={navigateClick} preScreen={()=>screenChangeHandle("create")} />;
    }
  }

  return (
    <div>
      {ScreenShowHandle()}
    </div>
  )
}

export default Page;
