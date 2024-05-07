"use client";

import { useMyContext } from '@/app/Context/MyContext';
import PageLayout from '@/app/pageLayout';
import Instance from '@/app/utils/Instance';
import { ApiResponse } from '@/app/utils/types';
import CategoryEvent from '@/components/categoryEvent/page';
import AddComments from '@/components/createList/AddComments';
import CreateListings from '@/components/createList/CreateListings';
import DragInOrder from '@/components/createList/DragInOrder';
import Greetings from '@/components/createList/Greetings';
import ProductAndCommentInfo from '@/components/createList/ProductAndCommentInfo';
import { debounce } from 'lodash';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';




type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";

const EventList = () => {

    const { showMap, filterUrls } = useMyContext()
    const [eventData, setEventData] = useState<ApiResponse[]>([])
    const [eventTitle, setEventTitle] = useState('')

    const searchParams = useSearchParams()

    const event = searchParams.get('categoryID')

    const options = ["Lists", "Places"];
    const mylistoptions = ["Created", "Contributed"];
    const [tabValue, setTabValue] = useState("Lists");
    // const [showMap, setShowMap] = useState<boolean>(false);

    const tabChange = (value: tabs) => {
        setTabValue(value);
    };

    const [myListtabValue, setMyListTabValue] = useState("Created");


    const myListtabChange = (value: mylisttabs) => {
        setMyListTabValue(value);
    };


    const [screenName, setScreenName] = useState("ListDetails"); // Set default screen

    const [loader, setloader] = useState(true);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setloader(true);
            try {
                //   const result = await Instance.get(`${search}`);
                //   if (search == "surfing" || search == "ww2") {
                //     const combinedArray = [...result.data.activity1, ...result.data.activity2];
                //     setData(combinedArray);
                //   } else {
                //     setData(result.data);
                //   }

            } catch (error: any) {
                console.log(error.message);
                setloader(false);
            } finally {
                setloader(false);
            }
        };

        fetchDataAsync();
    }, []);

    const fetchEventDataById = async () => {
        try {
            setloader(true)
            const response = await Instance.get(`/category/${event}`)
            console.log("event reaponse", response)
            if (response.status === 200) {
                setEventData(response?.data?.categoryList)
                setEventTitle(response?.data?.listName)
                setloader(false)
            }
        } catch (error) {
            setloader(false)
        }
    }

    useEffect(() => {
        if (event) {
            fetchEventDataById()
        }
    }, [event])


    const ImageUrlData = eventData.map((item) => item?.acf?.header_image_data);

    const filteredUrls = filterUrls(ImageUrlData);
    const router = useRouter();

    const navigateClick = () => {
        router.push("/");
    };

    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
    const [selectedData, setSelectedData] = useState<string[]>([]);
    const [data, setData] = useState<ApiResponse[]>([]);
    const [dragData, setDragData] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

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

    const screenChangeHandle = async (name: string) => {
        setScreenName(name);
    };
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };



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
    const debouncedSearch = debounce(fetchDataAsync, 300);

    const postHandler = async (name: string) => {
        setloader(true);
        // const param = {
        //   listName,
        //   iconName: selectedIcon,
        //   categoryType: categoryType,
        //   categoryList,
        //   bgColor
        // };
        // try {
        //   const result = await Instance.post("/create-category", param);
        //   console.log(result);
        //   setloader(false);
        //   toast.success(result.data.message);
        //   setScreenName(name);
        // } catch (error: any) {
        //   console.log(error.response);
        //   setloader(false);
        //   toast.error(error.response.data);
        //   // setScreenName(name);
        // } finally {
        //   setloader(false);
        //   // setScreenName(name);
        // }
    };

    const handleCreateNewList = async (name: string) => {
        window.location.reload();
        setScreenName(name);
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
                    data={data}
                    loader = {loader}
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
                <CategoryEvent urlData={eventData} urlTitle={eventTitle} filteredUrls={filteredUrls} loader={loader}
                    isOpen={() => screenChangeHandle("create")}
                //   preScreen={navigateClick}
                //   homePage={navigateClick}
                //   {...{
                //     categoryType,
                //     setCategoryType,
                //     setSelectedIcon,
                //     selectedIcon,
                //     listName,
                //     bgColor,
                //     setBgColor,
                //     setListName,
                //   }}
                />
            );
        } else if (screenName === "ProductAndCommentInfo") {
            return (
                <ProductAndCommentInfo
                    ScreenSwitch={() => postHandler("Greetings")}
                    preScreen={() => screenChangeHandle("drag")}
                    homePage={navigateClick}
                    loader={loader}
                    screenName = "Update"
                    // {...{ dragData, selectedData, listName, categoryType, selectedIcon }}
                    {...{ dragData, selectedData }}
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
        <>
            <PageLayout>
                <CategoryBody>
                    {/* <CategoryEvent urlData={eventData} urlTitle={eventTitle} filteredUrls={filteredUrls} loader={loader} /> */}
                    {ScreenShowHandle()}
                </CategoryBody>
            </PageLayout>
        </>
    )
}

export default EventList;


const CategoryBody = styled.div`
position: relative;
 z-index: 1;
 width: 480px;
 height: 100vh;
 overflow: auto;

 &::-webkit-scrollbar {
    display: none;
  }

 @media screen and (max-width: 800px) {
    width: 100%;
  }
`