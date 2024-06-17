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
import AddComments from "@/components/createList/AddComments";
import CreateListings from "@/components/createList/CreateListings";
import DragInOrder from "@/components/createList/DragInOrder";
import Greetings from "@/components/createList/Greetings";
import ProductAndCommentInfo from "@/components/createList/ProductAndCommentInfo";
import { debounce } from "lodash";
import CreateAccountModalLayout from "@/components//modal/Modal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
import ReservationCalenderModal from "@/components/AllModalScreen/reservationCalenderModal";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";

type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";
interface ScreenPageProps {
  data: any;
}
const EventList:React.FC<ScreenPageProps> = (props) => {
  const { showMap, filterUrls, modalClick, closeModal, modalName } =
    useMyContext();
  const [eventData, setEventData] = useState<ApiResponse[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [totalVote, setTotalVote] = useState<any>("");
  const [categoryId, setCategoryId] = useState("");
  const [main_type, setMain_type] = useState<string>("");

  const searchParams = useSearchParams();

  const event = searchParams.get("categoryID");
  const { events } = useParams();
console.log(events)
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

  const [screenName, setScreenName] = useState("categoryList"); // Set default screen

  const [loader, setloader] = useState(false);

  const fetchEventDataById =() => {
    try {
       
        const response =props.data
        setEventData(response?.categoryList);
        setEventTitle(response?.listName);
        setTotalVote(response?.totalVote);
        setCategoryId(response?._id);
        setMain_type(response?.main_type);
        setloader(false);
      
    } catch (error) {
      setloader(false);
    }
  };

  useEffect(() => {
    if (event || screenName === "Greetings") {
      fetchEventDataById();
    }
  }, [event, screenName]);

  const ImageUrlData = eventData.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);
  const router = useRouter();

  const navigateClick = () => {
    if (screenName === "Greetings") {
      setScreenName("categoryList");
      // router.push(`/screens/${events}?categoryID=${event}`);
    } else {
      router.push(`/`);
    }
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
    const loginToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("loginToken")
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

  const handleLike = async (id: string, vote: any) => {
    const loginToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("loginToken")
        : null;
    if (loginToken) {
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
      vote
        ? toast.error(result?.data?.message)
        : toast.success(result?.data?.message);
    } else {
      modalClick("LoginSignupModal");
    }
  };

  const fetchDataAsync = async (value: string) => {
    setloader(true);
    try {
      const result = await Instance.get(`/search-data?query=${value}`);
      setData(result.data?.searchResults);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };
  const handleSearch = () => {
    fetchDataAsync(searchQuery);
  };

  const postHandler = async (name: string) => {
    const param = {
      main_type,
      categoryName: eventTitle,
      categoryList: selectedData,
    };
    try {
      setloader(false);
      const result = await Instance.put(`/category/${event}`, param);
      setloader(false);
      toast.success(result.data.message);
      setScreenName(name);
    } catch (error: any) {
      console.log(error.response);
      setloader(false);
      toast.error(error.response.data);
    } finally {
      setloader(false);
    }
  };

  const handleCreateNewList = async (name: string) => {
    window.location.reload();
    setScreenName(name);
  };

  const ScreenShowHandle = () => {
    if (screenName === "create") {
      return (
        <AddListings
          ScreenSwitch={() => screenChangeHandle("Greetings")}
          homePage={navigateClick}
          selectedItemIds={selectedItemIds}
          toggleSelected={toggleSelected}
          searchQuery={searchQuery}
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
          urlData={eventData}
          urlTitle={eventTitle}
          filteredUrls={filteredUrls}
          loader={loader}
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
      <PageLayout>
        <CategoryBody>{ScreenShowHandle()}</CategoryBody>
      </PageLayout>
      <CreateAccountModalLayout
        isOpen={modalName === "LoginSignupModal" ? true : false}
        onClose={() => closeModal("createAccountModal")}
        {...{ showMap }}
        name=""
        title={modalName === "LoginAccountModal" && "Login"}
      >
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

// "use client";

// import { useMyContext } from "@/app/Context/MyContext";
// import PageLayout from "@/app/pageLayout";
// import Instance from "@/app/utils/Instance";
// import { ApiResponse } from "@/app/utils/types";
// import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
// import LoginSignupModal from "@/components/LoginSignup/loginSignupModal";
// import AddListings from "@/components/addList/AddListing";
// import GreetingList from "@/components/addList/GreetingList";
// import CategoryEvent from "@/components/categoryEvent/page";
// import AddComments from "@/components/createList/AddComments";
// import CreateListings from "@/components/createList/CreateListings";
// import DragInOrder from "@/components/createList/DragInOrder";
// import Greetings from "@/components/createList/Greetings";
// import ProductAndCommentInfo from "@/components/createList/ProductAndCommentInfo";
// import { debounce } from "lodash";
// import CreateAccountModalLayout from "@/components//modal/Modal";

// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import styled from "styled-components";
// import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
// import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
// import ReservationCalenderModal from "@/components/AllModalScreen/reservationCalenderModal";
// import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";

// type tabs = "Lists" | "Places";
// type mylisttabs = "Created" | "Contributed";
// interface ScreenPageProps{
//     params:string,
//     searchParams:string,
//     data:any
// }
// const EventList = () => {
//   const { showMap, filterUrls, modalClick, closeModal, modalName } =
//     useMyContext();
//   const [eventData, setEventData] = useState<ApiResponse[]>([]);
//   const [eventTitle, setEventTitle] = useState("");
//   const [totalVote, setTotalVote] = useState<any>("");
//   const [categoryId, setCategoryId] = useState("");
//   const [main_type, setMain_type] = useState<string>("");

//   const searchParams = useSearchParams();

//   const event = searchParams.get("categoryID");
//   const { events } = useParams();

//   const options = ["Lists", "Places"];
//   const mylistoptions = ["Created", "Contributed"];
//   const [tabValue, setTabValue] = useState("Lists");
//   // const [showMap, setShowMap] = useState<boolean>(false);

//   const tabChange = (value: tabs) => {
//     setTabValue(value);
//   };

//   const [myListtabValue, setMyListTabValue] = useState("Created");

//   const myListtabChange = (value: mylisttabs) => {
//     setMyListTabValue(value);
//   };

//   const [screenName, setScreenName] = useState("categoryList"); // Set default screen

//   const [loader, setloader] = useState(true);

//   const fetchEventDataById = async () => {
//     try {
//       setloader(true);
//       const response = await Instance.get(`/category/${event}?type=${events}`);
//       if (response.status === 200) {
//         setEventData(response?.data?.categoryList);
//         setEventTitle(response?.data?.listName);
//         setTotalVote(response?.data?.totalVote);
//         setCategoryId(response?.data?._id);
//         setMain_type(response?.data?.main_type);
//         setloader(false);
//       }
//     } catch (error) {
//       setloader(false);
//     }
//   };

//   useEffect(() => {
//     if (event || screenName === "Greetings") {
//       fetchEventDataById();
//     }
//   }, [event, screenName]);

//   const ImageUrlData = eventData.map((item) => item?.acf?.header_image_data);

//   const filteredUrls = filterUrls(ImageUrlData);
//   const router = useRouter();

//   const navigateClick = () => {
//     if (screenName === "Greetings") {
//       setScreenName("categoryList");
//       // router.push(`/screens/${events}?categoryID=${event}`);
//     } else {
//       router.push(`/`);
//     }
//   };

//   const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
//   const [selectedData, setSelectedData] = useState<string[]>([]);
//   const [data, setData] = useState<ApiResponse[]>([]);
//   const [dragData, setDragData] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleSelected = (itemId: number, item: any): void => {
//     const selectedIndex: number = selectedItemIds.indexOf(itemId);
//     if (selectedIndex === -1) {
//       setSelectedItemIds([...selectedItemIds, itemId]);
//       setSelectedData([...selectedData, item]);
//     } else {
//       const updatedSelectedItems: number[] = [...selectedItemIds];
//       updatedSelectedItems.splice(selectedIndex, 1);
//       setSelectedItemIds(updatedSelectedItems);
//       const upateddata: any[] = [...selectedData];
//       upateddata.splice(selectedIndex, 1);
//       setSelectedData(upateddata);
//     }
//   };

//   const screenChangeHandle = async (name: string) => {
//     const loginToken =
//       typeof window !== "undefined"
//         ? window.localStorage.getItem("loginToken")
//         : null;
//     if (loginToken) {
//       if (name === "Greetings") {
//         postHandler(name);
//       } else {
//         setScreenName(name);
//       }
//     } else {
//       modalClick("LoginSignupModal");
//     }
//   };
//   const handleChange = (value: string) => {
//     setSearchQuery(value);
//   };

//   const handleLike = async (id: string, vote: any) => {
//     const loginToken =
//       typeof window !== "undefined"
//         ? window.localStorage.getItem("loginToken")
//         : null;
//     if (loginToken) {
//       eventData.map((val) => {
//         if (id === val._id) {
//           if (vote) {
//             val.userVoted = false;
//             val.itemVotes = val.itemVotes - 1;
//             setEventData([...eventData]);
//           } else {
//             val.userVoted = true;
//             val.itemVotes = val.itemVotes + 1;
//             setEventData([...eventData]);
//           }
//         }
//       });
//       const result = await Instance.post(
//         `/category/${vote ? "removeVoting" : "addVoting"}`,
//         {
//           categroryId: categoryId,
//           itemId: id,
//         }
//       );
//       vote
//         ? toast.error(result?.data?.message)
//         : toast.success(result?.data?.message);
//     } else {
//       modalClick("LoginSignupModal");
//     }
//   };

//   const fetchDataAsync = async (value: string) => {
//     setloader(true);
//     try {
//       const result = await Instance.get(`/search-data?query=${value}`);
//       setData(result.data?.searchResults);
//     } catch (error: any) {
//       console.log(error.message);
//       setloader(false);
//     } finally {
//       setloader(false);
//     }
//   };
//   const handleSearch = () => {
//     fetchDataAsync(searchQuery);
//   };

//   const postHandler = async (name: string) => {
//     const param = {
//       main_type,
//       categoryName: eventTitle,
//       categoryList: selectedData,
//     };
//     try {
//       setloader(false);
//       const result = await Instance.put(`/category/${event}`, param);
//       setloader(false);
//       toast.success(result.data.message);
//       setScreenName(name);
//     } catch (error: any) {
//       console.log(error.response);
//       setloader(false);
//       toast.error(error.response.data);
//     } finally {
//       setloader(false);
//     }
//   };

//   const handleCreateNewList = async (name: string) => {
//     window.location.reload();
//     setScreenName(name);
//   };

//   const ScreenShowHandle = () => {
//     if (screenName === "create") {
//       return (
//         <AddListings
//           ScreenSwitch={() => screenChangeHandle("Greetings")}
//           homePage={navigateClick}
//           selectedItemIds={selectedItemIds}
//           toggleSelected={toggleSelected}
//           searchQuery={searchQuery}
//           handleSearch={handleSearch}
//           handleChange={handleChange}
//           data={data}
//           loader={loader}
//           UI_Type="add_list"
//         />
//       );
//     } else if (screenName === "categoryList") {
//       return (
//         <CategoryEvent
//           urlData={eventData}
//           urlTitle={eventTitle}
//           filteredUrls={filteredUrls}
//           loader={loader}
//           isOpen={() => screenChangeHandle("create")}
//           handleLike={handleLike}
//           totalVote={totalVote}
//         />
//       );
//     } else if (screenName === "Greetings") {
//       return (
//         <GreetingList
//           homePage={navigateClick}
//           preScreen={() => handleCreateNewList("categoryList")}
//         />
//       );
//     }
//   };

//   const onClick = (name: string) => {
//     if (name === "AddToCreate") {
//       router.push("/screens/createList");
//     }
//   };

//   return (
//     <>
//       <PageLayout>
//         <CategoryBody>{ScreenShowHandle()}</CategoryBody>
//       </PageLayout>
//       <CreateAccountModalLayout
//         isOpen={modalName === "LoginSignupModal" ? true : false}
//         onClose={() => closeModal("createAccountModal")}
//         {...{ showMap }}
//         name=""
//         title={modalName === "LoginAccountModal" && "Login"}
//       >
//         <LoginSignupModal
//           isOpen={() => modalClick("ContactUsModal")}
//           nextModal={() => modalClick("WelcomeBackModal")}
//           {...{ onClick }}
//           myListOpen={() => modalClick("TermsAndConditionModal")}
//         />
//       </CreateAccountModalLayout>
//       <EventListingModalScreen showMap={showMap} />
//       <ProfileAccountModalScreen showMap={showMap} />
//       <ReservationCalenderModal showMap={showMap} />
//       <ViewDirectionModalScreen showMap={showMap} />
//     </>
//   );
// };

// export default EventList;

// const CategoryBody = styled.div`
//   position: relative;
//   z-index: 1;
//   width: 480px;
//   height: 100vh;
//   overflow: auto;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   @media screen and (max-width: 800px) {
//     width: 100%;
//   }
// `;
