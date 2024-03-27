"use client";

import React, { useState } from 'react';
import CreateListings from '../../createList/CreateListings'
import DragInOrder from '../../createList/DragInOrder';
import AddComments from '../../createList/AddComments';
import ListDetails from '../../createList/ListDetails';
import Greetings from '../../createList/Greetings';
import { usePathname, useRouter } from "next/navigation";

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
      return <DragInOrder ScreenSwitch={()=>screenChangeHandle("AddComments")} preScreen={()=>screenChangeHandle("create")} homePage={navigateClick} />;
    } else if (screenName === "AddComments") {
      return <AddComments ScreenSwitch={()=>screenChangeHandle("ListDetails")} preScreen={()=>screenChangeHandle("ListDetails")} homePage={navigateClick} />;
    } else if (screenName === "ListDetails") {
      return <ListDetails ScreenSwitch={()=>screenChangeHandle("Greetings")} preScreen={()=>screenChangeHandle("drag")} homePage={navigateClick}  />;
    } else if (screenName === "Greetings") {
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
