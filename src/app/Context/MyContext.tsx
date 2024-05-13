"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
  modalClick: (name: string, item?: any, urlImage?: any) => void;
  iconClick: (name: string) => void;
  mapButtonClick: () => void;
  filterUrls: any;
  handleApiResponse: any;
  showContent: boolean;
  appName: any;
  reservationMenu?: boolean;
  oldName: string;
  setOldName: any;
}

// Create a context
const MyContext = createContext<ContextProps | undefined>(undefined);

// Create a provider component
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalName, setModalNames] = useState<string>('');
  const [dataDetails, setDataDetails] = useState<DataDetails>({});
  const [showContent, setShowContent] = useState(false);
  const [reservationMenu, setReservationMenu] = useState(false);
  const [dataUrlImage, setDataUrlImage] = useState("");
  const [appName, setAppName] = useState('')
  const [showMap, setShowMap] = useState<boolean>(false);
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
    eventListing: false,
    activities: false,
    infoApp: false,
  });

  useEffect(() => {
    // Check window width on client-side
    const handleResize = () => {
      setShowMap(window.innerWidth <= 800 ? false : true);
    };
    // Initial check
    handleResize();
    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
    if (modalName === 'myList') {
      setModalNames('WelcomeBackModal');
    } else {
      setModalNames('');
    }
    setAppName('')
  };

  const iconClick = (name: string) => {
    if (name === "mapClick") {
      if (window.innerWidth <= 800) {
        setShowMap(!showMap);
      }
    }
  };

  const mapButtonClick = () => {
    setShowMap(false);
  }


  const modalClick = (name: string, item?: any, urlImage?: any, openReservation?: any) => {
    setModalType((prev) => ({
      ...prev,
      [name]: true,
    }));
    setModalNames(name);
    if (name === "createAccountModal") {
      setOldName('')
    } else if (name === "WelcomeBackModal") {
      setOldName('')
    }
    else if (name === "myList") {
      setOldName('')
    }
    if (item) {
      if (name === "infoApp") {
        setAppName(item)
      } else {
        setReservationMenu(openReservation)
        setDataDetails(item);
        setDataUrlImage(urlImage)
      }
    }
  };


  const filterUrls = (ImageUrlData: any) => {
    const imageUrls: string[] = [];
    ImageUrlData.forEach((item: any) => {
      if (item) { // Check if item is not undefined
        try {
          const jsonData = JSON.parse(item);
          const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined
          if (url && (url.endsWith('.jpg') || url.endsWith('.png'))) {
            imageUrls.push(url);
          } else {
            imageUrls.push("https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"); // Push default image URL if URL is not valid
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          imageUrls.push("default_image_url.jpg"); // Push default image URL if JSON parsing fails
        }
      } else {
        imageUrls.push("https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"); // Push default image URL if item is undefined
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
    iconClick,
    mapButtonClick,
    filterUrls,
    dataUrlImage,
    handleApiResponse,
    showContent,
    appName,
    reservationMenu,
    oldName,
    setOldName
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Create a custom hook to access the context
const useMyContext = (): ContextProps => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { MyProvider, useMyContext };
