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
import toast from "react-hot-toast";

const Page = () => {
  const { showMap } = useMyContext();

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const toggleSelected = (itemId: number, item: any): void => {
    const selectedIndex: number = selectedItemIds.indexOf(itemId);
    if (selectedIndex === -1) {
      setSelectedItemIds([...selectedItemIds, itemId]);
      setSelectedData([...selectedData, item]);
    } else {
      const updatedSelectedItems: number[] = [...selectedItemIds];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItemIds(updatedSelectedItems);
      const upateddata: any[] = [...selectedData];
      upateddata.splice(selectedIndex, 1);
      setSelectedData(upateddata);
    }
  };

  const router = useRouter();

  const navigateClick = () => {
    router.push("/");
  };

  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragData, setDragData] = useState<string[]>([]);
  const [screenName, setScreenName] = useState("ListDetails"); // Set default screen
  const [selectedIcon, setSelectedIcon] = useState<string>("shoppingCart");
  const [categoryType, setCategoryType] = useState<string>("public");
  const [listName, setListName] = useState<string>("");

  const [categoryList, setCategoryList] = useState([]);
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    if (screenName) {
      const newArray: string[] = [];

      selectedData.map((val: any) => {
        const newObj: { id: string; type: string } = {
          id: "",
          type: "",
        };
        (newObj.id = val?._id),
          (newObj.type = val?.type),
          newArray.push(newObj as any);
      });

      setCategoryList([...newArray] as any);
    }
  }, [screenName]);

  const postHandler = async (name: string) => {
    setloader(true);
    const param = {
      listName,
      iconName: selectedIcon,
      categoryType: categoryType,
      categoryList,
      bgColor
    };
    try {
      const result = await Instance.post("/create-category", param);
      console.log(result);
      setloader(false);
      toast.success(result.data.message);
      setScreenName(name);
    } catch (error: any) {
      console.log(error.response);
      setloader(false);
      toast.error(error.response.data);
      // setScreenName(name);
    } finally {
      setloader(false);
      // setScreenName(name);
    }
  };

  const screenChangeHandle = async (name: string) => {
    setScreenName(name);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  console.log("data icon", selectedItemIds);
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

  const handleCreateNewList = async (name: string) => {
    window.location.reload();
    setScreenName(name);
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
          {...{ setDragData, selectedData, setSelectedData }}
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
            bgColor,
            setBgColor,
            setListName,
          }}
        />
      );
    } else if (screenName === "ProductAndCommentInfo") {
      return (
        <ProductAndCommentInfo
          ScreenSwitch={() => postHandler("Greetings")}
          preScreen={() => screenChangeHandle("drag")}
          homePage={navigateClick}
          loader={loader}
          {...{ dragData, selectedData, listName, categoryType, selectedIcon }}
        />
      );
    } else if (screenName === "Greetings") {
      return (
        <Greetings
          homePage={navigateClick}
          preScreen={() => handleCreateNewList("ListDetails")}
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
