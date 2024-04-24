"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  showMap:boolean;
  dataDetails: DataDetails;
  dataUrlImage:any;
  closeModal: (name: string) => void;
  modalClick: (name: string, item?: any,urlImage?:any) => void;
  iconClick: (name: string) => void;
  filterUrls: any;
}

// Create a context
const MyContext = createContext<ContextProps | undefined>(undefined);

// Create a provider component
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalName, setModalNames] = useState<string>('');
  const [dataDetails, setDataDetails] = useState<DataDetails>({});
  const [dataUrlImage, setDataUrlImage] = useState("");
  const [showMap, setShowMap] = useState<boolean>(false);
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
    eventListing:false,
    activities:false
  });

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
  };

  const iconClick = (name: string) => {
    if (name === "mapClick") {
      setShowMap(!showMap);
    }
  };

  const modalClick = (name: string, item?: any,urlImage?:any) => {
    setModalType((prev) => ({
      ...prev,
      [name]: true,
    }));
    setModalNames(name);
    if (item) {
      setDataDetails(item);
      setDataUrlImage(urlImage)
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
    filterUrls,
    dataUrlImage
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
