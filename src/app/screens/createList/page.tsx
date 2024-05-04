"use client";

import React, { useState, useEffect } from "react";
import CreateListings from "@/components/createList/CreateListings";
import DragInOrder from "@/components/createList/DragInOrder";
import AddComments from "@/components/createList/AddComments";
import ListDetails from "@/components/createList/ListDetails";
import Greetings from "@/components/createList/Greetings";
import ProductAndCommentInfo from "@/components/createList/ProductAndCommentInfo";
import { useRouter } from "next/navigation";
import MapWithMenu from "@/components/RightSideMenu/MapWithMenu";
import PageLayout from "@/app/pageLayout";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { debounce } from "lodash";

const Page = () => {
  const { showMap } = useMyContext();

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  console.log(selectedItemIds, "asasas");

  const toggleSelected = (itemId: number): void => {
    const selectedIndex: number = selectedItemIds.indexOf(itemId);
    if (selectedIndex === -1) {
      setSelectedItemIds([...selectedItemIds, itemId]);
    } else {
      const updatedSelectedItems: number[] = [...selectedItemIds];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItemIds(updatedSelectedItems);
    }
  };

  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };

  const { filterUrls, showContent } = useMyContext();
  
  const [data, setData] = useState<ApiResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragData, setDragData] = useState<string[]>([])
  const [screenName, setScreenName] = useState("ListDetails"); // Set default screen
  const [selectedIcon, setSelectedIcon] = useState<string>("shoppingCart");
  const [categoryType, setCategoryType] = useState<string>("public");
  const [listName, setListName] = useState<string>("");

  const screenChangeHandle = (name: string) => {
    setScreenName(name);
  };

  
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };
  
  console.log("data icon", dragData);
  // Debounce for 300 milliseconds
  const [loader, setloader] = useState(true);

  const fetchDataAsync = async (value: string) => {
    setloader(true);

    try {
      const result = await Instance.get(`/search?title=${value}`);
      setData(result.data);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  const debouncedSearch = debounce(fetchDataAsync, 0);

  const ScreenShowHandle = () => {
    if (screenName === "create") {
      return (
        <CreateListings
          ScreenSwitch={() => screenChangeHandle("drag")}
          homePage={navigateClick}
          selectedItemIds={selectedItemIds}
          toggleSelected={toggleSelected}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          data={data}
        />
      );
    } else if (screenName === "drag") {
      return (
        <DragInOrder
          ScreenSwitch={() => screenChangeHandle("ProductAndCommentInfo")}
          preScreen={() => screenChangeHandle("create")}
          homePage={navigateClick}
          selectedItemIds={selectedItemIds}
          {...{setDragData}}
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
          {...{
            categoryType,
            setCategoryType,
            setSelectedIcon,
            selectedIcon,
            listName,
            setListName,
          }}
        />
      );
    } else if (screenName === "ProductAndCommentInfo") {
      return (
        <ProductAndCommentInfo
          ScreenSwitch={() => screenChangeHandle("Greetings")}
          preScreen={() => screenChangeHandle("drag")}
          homePage={navigateClick}
          {...{dragData}}
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
