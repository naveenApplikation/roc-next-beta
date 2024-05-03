"use client";

import React, { useState } from "react";
import CreateListings from "@/components/createList/CreateListings";
import DragInOrder from "@/components/createList/DragInOrder";
import AddComments from "@/components/createList/AddComments";
import ListDetails from "@/components/createList/ListDetails";
import Greetings from "@/components/createList/Greetings";
import ProductAndCommentInfo from "@/components/createList/ProductAndCommentInfo";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import MapWithMenu from "@/components/RightSideMenu/MapWithMenu";
import PageLayout from "@/app/pageLayout";

const Page = () => {
  const { showMap } = useMyContext();

  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };

  const [screenName, setScreenName] = useState("ListDetails"); // Set default screen
  const [selectedIcon, setSelectedIcon] = useState<string>('shoppingCart');
  const [categoryType, setCategoryType] = useState<string>("public")
  const [listName, setListName] = useState<string>("")

  const screenChangeHandle = (name: string) => {
    setScreenName(name);
  };

  console.log("data icon", selectedIcon, categoryType, listName)

  const ScreenShowHandle = () => {
    if (screenName === "create") {
      return (
        <CreateListings
          ScreenSwitch={() => screenChangeHandle("drag")}
          homePage={navigateClick}
        />
      );
    } else if (screenName === "drag") {
      return (
        <DragInOrder
          ScreenSwitch={() => screenChangeHandle("ProductAndCommentInfo")}
          preScreen={() => screenChangeHandle("create")}
          homePage={navigateClick}
        />
      );
    } else if (screenName === "AddComments") {
      return (
        <AddComments
          ScreenSwitch={() => screenChangeHandle("ListDetails")}
          preScreen={() => screenChangeHandle("ListDetails")}
          homePage={navigateClick}
        />
      );
    } else if (screenName === "ListDetails") {
      return (
        <ListDetails
          ScreenSwitch={() => screenChangeHandle("create")}
          preScreen={navigateClick}
          homePage={navigateClick}
          {...{categoryType, setCategoryType, setSelectedIcon, selectedIcon, listName, setListName}}
        />
      );
    } else if (screenName === "ProductAndCommentInfo") {
      return (
        <ProductAndCommentInfo
          ScreenSwitch={() => screenChangeHandle("Greetings")}
          preScreen={() => screenChangeHandle("drag")}
          homePage={navigateClick}
        />
      );
    } else if (screenName === "Greetings") {
      return (
        <Greetings
          homePage={navigateClick}
          preScreen={() => screenChangeHandle("ListDetails")}
        />
      );
    }
  };

  return (
    <PageLayout>
      <div>{ScreenShowHandle()}</div>
    </PageLayout>
  );
};

export default Page;
