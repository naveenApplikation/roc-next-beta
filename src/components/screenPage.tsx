"use client";

import { useMyContext } from "@/app/Context/MyContext";
import PageLayout from "@/app/pageLayout";
import Instance from "@/app/utils/Instance";
import { ApiResponse } from "@/app/utils/types";
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import LoginSignupModal from "@/components/LoginSignup/loginSignupModal";
import AddListings from "@/components/addList/AddListing";
import GreetingList from "@/components/addList/GreetingList";
import CategoryEvent from "@/components/categoryEvent/page";

import CreateAccountModalLayout from "@/components//modal/Modal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ReservationCalenderModal from "@/components/AllModalScreen/reservationCalenderModal";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import { updateLike } from "@/app/action";
import { debounce } from "@/app/utils/debounce";
import FilterListModalScreen from "./AllModalScreen/FilterListModalScreen";
import ShareFeature from "./ShareFeature";
import SocialShareModal from "./modal/SocialShareModal";
import { bookmark } from "@/app/utils/ImagePath";

interface ScreenPageProps {
  data: any;
  bookmarkValue?:any
}
const EventList: React.FC<ScreenPageProps> = (props) => {
  const { showMap, filterUrls, modalClick, closeModal, modalName,socialShare,handleSocialShare } =
    useMyContext();
  const [eventData, setEventData] = useState<ApiResponse[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [totalVote, setTotalVote] = useState<any>("");
  const [categoryId, setCategoryId] = useState("");
  const [main_type, setMain_type] = useState<string>("");

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [data, setData] = useState<ApiResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const event = searchParams.get("categoryID");
  const { events } = useParams();

  const [screenName, setScreenName] = useState("categoryList"); // Set default screen

  const [loader, setloader] = useState(false);
  const [likeLoader,setLikeLoader]=useState<string>("")
  const [uiRenderLoader, setUiRenderLoader] = useState(true);

  useEffect(()=>{
    closeModal("createAccountModal")
    closeModal("myList")
    closeModal("myBookmark")
  },[])

  const fetchEventDataById = () => {
    try {
      setloader(true)
      const response = props.data;
      setEventData(response?.categoryList);
      setEventTitle(response?.listName);
      setTotalVote(response?.totalVote);
      setCategoryId(response?._id);
      setMain_type(response?.main_type);
      setloader(false);
      setUiRenderLoader(false);
    } catch (error) {
      setloader(false);
      setUiRenderLoader(false);
    }
  };

  const router = useRouter();
  useEffect(() => {
    router.prefetch("screens/" + events);
  }, []);

  useEffect(() => {
    if (event || screenName === "Greetings") {
      fetchEventDataById();
    }
  }, [event, screenName]);
  
  const ImageUrlData = eventData.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  const navigateClick = () => {
    if (screenName === "Greetings") {
      setScreenName("categoryList");
    } else {
      router.push(`/`);
    }
  };



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
    const loginToken = localStorage.getItem("loginToken")
      ? localStorage.getItem("loginToken")
      : null;
    if (loginToken) {
      if (name === "Greetings") {
        postHandler(name);
      } else {
        setScreenName(name);
      }
    } else {
      modalClick("LoginSignupModal");
    }
  };


  const handleChange = (value: string) => {
    setSearchQuery(value);
  };

  console.log(likeLoader)
  const handleLike = async (id: string, vote: any) => {
    console.log(id)
    
       console.log("before", likeLoader);
    const loginToken = localStorage.getItem("loginToken")
      ? localStorage.getItem("loginToken")
      : null;
    if (loginToken) {
        setLikeLoader(id);
      eventData.map((val) => {
        if (id === val._id) {
          if (vote) {
            val.userVoted = false;
            val.itemVotes = val.itemVotes - 1;
            setEventData([...eventData]);
          } else {
            val.userVoted = true;
            val.itemVotes = val.itemVotes + 1;
            setEventData([...eventData]);
          }
        }
      });
      
      const result = await Instance.post(
        `/category/${vote ? "removeVoting" : "addVoting"}`,
        {
          categroryId: categoryId,
          itemId: id,
        }
      );
       setLikeLoader("")
      console.log("after",likeLoader)
      vote
        ? toast.error(result?.data.message)
        : toast.success(result?.data.message);
      await updateLike(events.toString());
      
    } else {
      modalClick("LoginSignupModal");
    }
  };

  const fetchDataAsync = async (value: string) => {
    
      setloader(true);
      try {
        const result = await Instance.get(`/search-data?query=${value}`);
        setData(result?.data?.searchResults);
      } catch (error: any) {
        setloader(false);
      } finally {
        setloader(false);
      }

  };

  const handleSearch = async () => {

   searchQuery ? await fetchDataAsync(searchQuery) : setData([]);
  };

  const postHandler = async (name: string) => {
    const param = {
      main_type,
      categoryName: eventTitle,
      categoryList: selectedData,
    };
    try {
      setloader(true);
      const result = await Instance.put(`/category/${event}`, param);
      setloader(false);
      toast.success(result?.data?.message);
      setScreenName(name);
    } catch (error: any) {
      setloader(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  const handleCreateNewList = async (name: string) => {
    window.reload()
    setScreenName(name);
  };

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      q ? fetchDataAsync(q) : setData([]);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const ScreenShowHandle = () => {
    if (screenName === "create") {
      return (
        <AddListings
          ScreenSwitch={() => screenChangeHandle("Greetings")}
          homePage={navigateClick}
          selectedItemIds={selectedItemIds}
          toggleSelected={toggleSelected}
          searchQuery={searchQuery}
          setSearchQuery = {setSearchQuery}
          handleSearch={handleSearch}
          handleChange={handleChange}
          data={data}
          loader={loader}
          UI_Type="add_list"
        />
      );
    } else if (screenName === "categoryList") {
      return (
        <CategoryEvent
          categoryId={event}
          params={events}
          bookMark={props.bookmarkValue}
          urlData={eventData}
          urlTitle={eventTitle}
          filteredUrls={filteredUrls}
          loader={loader}
          likeLoader={likeLoader}
          isOpen={() => screenChangeHandle("create")}
          handleLike={handleLike}
          totalVote={totalVote}
        />
      );
    } else if (screenName === "Greetings") {
      return (
        <GreetingList
          homePage={navigateClick}
          preScreen={() => handleCreateNewList("categoryList")}
        />
      );
    }
  };

  const onClick = (name: string) => {
    if (name === "AddToCreate") {
      router.push("/screens/createList");
    }
  };

  return (
    <>
      {uiRenderLoader ? null : (
        <>
          <PageLayout>
            <CategoryBody>{ScreenShowHandle()}</CategoryBody>
          </PageLayout>
          <CreateAccountModalLayout
            isOpen={modalName === "LoginSignupModal" ? true : false}
            onClose={() => closeModal("createAccountModal")}
            {...{ showMap }}
            name=""
            title={modalName === "LoginAccountModal" && "Login"}>
            <LoginSignupModal
              isOpen={() => modalClick("ContactUsModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
              {...{ onClick }}
              myListOpen={() => modalClick("TermsAndConditionModal")}
            />
          </CreateAccountModalLayout>
          <EventListingModalScreen showMap={showMap} />
          <ProfileAccountModalScreen showMap={showMap} />
          <ReservationCalenderModal showMap={showMap} />
          <ViewDirectionModalScreen showMap={showMap} />
          <FilterListModalScreen showMap={showMap} />
          <SocialShareModal showMap={showMap} isOpen={socialShare} onClose={handleSocialShare}></SocialShareModal>
          {/* <FilterModalScreen showMap={showMap} /> */}
        </>
      )}
    </>
  );
};

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
`;

