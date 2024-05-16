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
    console.log("klslklkfs", itemId);
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

  console.log(selectedData, "asasas");
  const router = useRouter();

  const navigateClick = () => {
    if(screenName === "Greetings"){
      router.push(`/categories/Community?search=category-item`)
    } else{
      router.push("/");
    }

  };

  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragData, setDragData] = useState<string[]>([]);
  const [screenName, setScreenName] = useState("ListDetails"); // Set default screen
  const [selectedIcon, setSelectedIcon] = useState<string>("shoppingCart");
  const [categoryType, setCategoryType] = useState<string>("public");
  const [listName, setListName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [categoryList, setCategoryList] = useState([]);
  const [bgColor, setBgColor] = useState<string>("#eb5757");

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
      categoryList: selectedData,
      bgColor,
    };

    try {
      setLoading(true);
      const result = await Instance.post("/create-category", param);

      console.log("resu", result);
      if (result?.status === 200) {
        setLoading(false);
        toast.success(result.data.message);
        setSearchQuery("");
        setListName("");
        setCategoryType("public");
        setSelectedIcon("shoppingCart");
        setBgColor("#eb5757");
        setScreenName(name);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.response);
      setLoading(false);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const screenChangeHandle = async (name: string) => {
    if (name === "Greetings") {
      postHandler(name);
    } else {
      setScreenName(name);
    }
  };

  const handleChange = (value: string) => {
    setSearchQuery(value);
  };
  const handleSearch = () => {
    fetchDataAsync(searchQuery);
  };

  // Debounce for 300 milliseconds
  const [loader, setloader] = useState(false);

  const fetchDataAsync = async (value: string) => {
    setloader(true);

    try {
      // const result = await Instance.get(`/search?title=${value}`);
      const result = await Instance.get(`/search-data?query=${value}`);
      setData(result.data?.searchResults);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

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
          handleChange={handleChange}
          data={data}
          loader={loader}
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
          ScreenSwitch={() => screenChangeHandle("Greetings")}
          preScreen={() => screenChangeHandle("drag")}
          homePage={navigateClick}
          loader={loading}
          {...{ dragData, selectedData }}
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
