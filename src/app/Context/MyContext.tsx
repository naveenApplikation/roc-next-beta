"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CategoryIcons } from "@/app/utils/iconList";
import { buildFilterUrl } from "@/app/utils/filter";
import Instance from "@/app/utils/Instance";
import { useRouter } from "next-nprogress-bar";

// Define types for your state and functions
interface ModalType {
  [key: string]: boolean;
}

interface DataDetails {
  [key: string]: any;
}

interface ContextProps {
  modalType: ModalType;
  modalName: string;
  showMap: boolean;
  dataDetails: DataDetails;
  dataUrlImage: any;
  closeModal: (name: string) => void;
  modalClick: (
    name: string,
    item?: any,
    urlImage?: any,
    reservationMenu?: any
  ) => void;
  menuClick: (item: any, condition?: boolean, id?: any) => void;
  iconClick: (name: string) => void;
  mapButtonClick: () => void;
  filterUrls: any;
  handleApiResponse: any;
  showContent: boolean;
  appName: any;
  reservationMenu?: boolean;
  oldName: string;
  setOldName: any;
  setModalNames?: any;
  filterValues?: any;
  setFilterValues?: any;
  fetchDataAsync?: any;
  placeData?: any;
  setPlaceData?: any;
  placeloader?: any;
  searchQuery?: any;
  setSearchQuery?: any;
  setSelectFilter?: any;
  selectFilter?: any;
  location?: any;
  socialShare?: any;
  handleSocialShare?: any;
  filterOptions?: any;
  handleFilterOption?: any;
  filterSelection?: any;
  eventFilters?: any;
  resetFilters?: any;
  setDataDetails?: any;
  setTitleNameForModel?: any;
  titleNameForModel?: any;
  setCurrentEventPath?: any;
  currentEventPath?: any;
}

// Create a context
const MyContext = createContext<ContextProps | undefined>(undefined);

// Create a provider component
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalName, setModalNames] = useState<string>("");
  const [currentEventPath, setCurrentEventPath] = useState("");
  const [dataDetails, setDataDetails] = useState<DataDetails>({});
  const [filterValues, setFilterValues] = useState({
    distance: "",
    openingHours: false,
    rating: "",
  });
  const [showContent, setShowContent] = useState(false);
  const [reservationMenu, setReservationMenu] = useState(false);
  const [dataUrlImage, setDataUrlImage] = useState("");
  const [appName, setAppName] = useState("");
  const [showMap, setShowMap] = useState<boolean>(false);
  const [titleNameForModel, setTitleNameForModel] = useState("");
  const [oldName, setOldName] = useState<string>("");
  const [modalType, setModalType] = useState({
    ModalContent: false,
    orderOnlineModal: false,
    calenderModal: false,
    calenderPlaceModal: false,
    PlacesConfirmModal: false,
    createAccountModal: false,
    LoginAccountModal: false,
    WelcomeBackModal: false,
    UpdateMyDetailsModal: false,
    UpdateMyEmailModal: false,
    UpdateMyPreferencesModal: false,
    modalFilter: false,
    AddDirectoryModal: false,
    DirectionModal: false,
    search: false,
    myList: false,
    myBookmark: false,
    privacyPolicy: false,
    eventListing: false,
    activities: false,
    infoApp: false,
    modalFilterList: false,
    walksModal: false,
    AboutUs: false,
    filterOption: false,
    adsBanner:false
  });
  const options = {
    dates: false,
    free: false,
    booking: false,
    area: false,
    seasonality: false,
    location: false,
    title: "",
  };
  const [filterOptions, setFilterOption] = useState(options);

  const [eventFilters, setEventFilters] = useState({
    location: ["Any"] as any,
    free: [] as any,
    booking: [] as any,
    area: [] as any,
    seasonality: [] as any,
    date: "",
    today: false,
    family_friendly: false,
    couples: false,
    indoor: false,
    outdoor: false,
    wheelchair_access: false,
    hearing_loop: false,
    pet_friendly: false,
    parking: false,
    catering: false,
  });
  const resetFilters = () => {
    setEventFilters({
      location: ["Any"],
      free: [],
      booking: [],
      area: [],
      seasonality: [],
      date: "",
      today: false,
      family_friendly: false,
      couples: false,
      indoor: false,
      outdoor: false,
      wheelchair_access: false,
      hearing_loop: false,
      pet_friendly: false,
      parking: false,
      catering: false,
    });
  };
  const filterSelection = (name: any, value: any, list: any) => {
    setEventFilters((options) => ({
      ...options,
      [name]: value,
      location: name == "location" ? [...list] : [...options.location],
      free: name == "free" ? [...list] : [...options.free],
      booking: name == "booking" ? [...list] : [...options.booking],
      seasonality: name == "seasonality" ? [...list] : [...options.seasonality],
      area: name == "area" ? [...list] : [...options.area],
    }));
  };
  const [placeData, setPlaceData] = useState<any[]>([]);
  const [placeloader, setPlaceLoader] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectFilter, setSelectFilter] = useState("Any");
  const handleFilterOption = (name: any) => {
    setFilterOption({
      ...options,
      title: name,
      [name]: true,
    });
  };
  const [location, setLocation] = useState<any>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const savedLocation = sessionStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    } else {
      getLocation();
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        sessionStorage.setItem("userLocation", JSON.stringify(userLocation));
        setLocation(userLocation);
      });
    }
  };

  // useEffect(() => {

  //   navigator.geolocation.getCurrentPosition(({ coords }) => {
  //     const { latitude, longitude } = coords;
  //     setLocation({ latitude: latitude, longitude: longitude });
  //   });
  // }, []);

  const router = useRouter();

  const fetchDataAsync = async (value: string, filterValues: any) => {
    if (value) {
      try {
        setPlaceLoader(true);
        const url = buildFilterUrl(
          value,
          {
            distance:
              filterValues.distance == "Any" ? "" : filterValues.distance,
            rating: filterValues.rating == "Any" ? "" : filterValues.rating,
            openingHours: filterValues.openingHours,
          },
          location
        );
        const result = await Instance.get(url);
        setPlaceData(result?.data.searchResults);
      } catch (error: any) {
        console.log(error.message);
        setPlaceLoader(false);
      } finally {
        setPlaceLoader(false);
      }
    } else if (selectFilter !== "Any") {
      setPlaceLoader(true);
      try {
        const result = await Instance.get(
          `/filter/places?place&parish=${selectFilter}`
        );
        setPlaceData(result?.data?.searchResults);
      } catch (error: any) {
        console.log(error.message);
        setPlaceLoader(false);
      } finally {
        setPlaceLoader(false);
      }
    }
  };

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else if (item === "directoryList") {
      router.push("/screens/directoryList");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    } else if (item === "LeaveFeedback") {
      window.open("https://forms.gle/rMb2fNQPgHiSWPBq7");
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
    }
  };

  useEffect(() => {
    // Check window width on client-side
    const handleResize = () => {
      setShowMap(window.innerWidth <= 800 ? false : true);
    };
    // Initial check
    handleResize();
    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleApiResponse = (shouldShowContent: any) => {
    setShowContent(shouldShowContent);
  };

  const closeModal = (name: string) => {
    setModalType((prev) => ({
      ...prev,
      [name]: false,
    }));
    if (name === "search") {
      setSelectFilter("Any");
    }
    if (modalName === "myList" || modalName === "myBookmark") {
      setModalNames("WelcomeBackModal");
    } else {
      setModalNames("");
    }
    setAppName("");
  };

  const iconClick = (name: string) => {
    if (name === "mapClick") {
      if (window.innerWidth <= 800) {
        setShowMap(!showMap);
      }
    }
  };
  const filterModalClick = () => {};
  const mapButtonClick = () => {
    setShowMap(false);
  };
  const modalClick = (
    name: string,
    item?: any,
    urlImage?: any,
    openReservation?: any
  ) => {
    if (
      name == "modalFilter" ||
      name === "modalFilterList" ||
      name == "filterOption"
    ) {
      console.log(name);
      setModalType((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      if (modalType.search) {
        setModalType((prev) => ({
          ...prev,
          [name]: true,
        }));
      } else {
        setModalType((prev) => {
          console.log(name);
          const updatedState = Object.keys(prev).reduce((acc, key) => {
            acc[key] = key === name;
            return acc;
          }, {} as { [key: string]: boolean });

          return updatedState as typeof prev;
        });
      }
    }

    if (modalName === "betaExploreModal") {
      setModalNames("");
    }
    setModalNames(name);
    if (name === "createAccountModal") {
      setOldName("");
    } else if (name === "WelcomeBackModal") {
      setOldName("");
    } else if (name === "myList") {
      setOldName("");
    } else if (name === "myBookmark") {
      setOldName("");
    } else if (name === "privacyPolicy") {
      setOldName("");
    }
    if (item) {
      if (name === "infoApp") {
        setAppName(item);
      } else {
        setReservationMenu(openReservation);
        setDataDetails(item);
        setDataUrlImage(urlImage);
      }
    }
    if (name === "search") {
      setModalType((prev) => ({
        ...prev,
        search: true,
      }));
    }
  };

  const [socialShare, setSocialShare] = useState(false);
  const handleSocialShare = (value?: any) => {
    console.log(socialShare);
    if (value) {
      console.log("assadas", 291);
      setSocialShare(false);
    } else {
      setSocialShare(!socialShare);
    }
  };
  const filterUrls = (ImageUrlData: any) => {
    const imageUrls: string[] = [];
    ImageUrlData?.forEach((item: any) => {
      if (item) {
        try {
          const jsonData = JSON.parse(item);
          const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

          if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
            imageUrls.push(url);
          } else {
            imageUrls.push(
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
            ); // Push default image URL if URL is not valid
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          imageUrls.push(
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
          ); // Push default image URL if JSON parsing fails
        }
      } else {
        imageUrls.push(
          "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
        ); // Push default image URL if item is undefined
      }
    });
    return imageUrls;
  };

  const value: ContextProps = {
    modalType,
    modalName,
    showMap,
    dataDetails,
    closeModal,
    modalClick,
    menuClick,
    iconClick,
    mapButtonClick,
    filterUrls,
    dataUrlImage,
    handleApiResponse,
    showContent,
    appName,
    reservationMenu,
    oldName,
    setOldName,
    setModalNames,
    filterValues,
    setFilterValues,
    fetchDataAsync,
    placeData,
    setPlaceData,
    placeloader,
    searchQuery,
    setSearchQuery,
    setSelectFilter,
    selectFilter,
    location,
    socialShare,
    handleSocialShare,
    filterOptions,
    handleFilterOption,
    filterSelection,
    eventFilters,
    resetFilters,
    setDataDetails,
    setTitleNameForModel,
    titleNameForModel,
    setCurrentEventPath,
    currentEventPath,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Create a custom hook to access the context
const useMyContext = (): ContextProps => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export { MyProvider, useMyContext };
