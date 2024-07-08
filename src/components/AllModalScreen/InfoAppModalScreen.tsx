import React, { useEffect, useRef, useState } from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { Spin } from "antd";
import Link from "next/link";
import styled from "styled-components";

interface InfoAppProps {
  showMap: boolean;
}

const appInfoName = [
  "weather",
  "tides",
  "parking",
  "news",
  "taxis",
  "sos",
  "radio",
];

const InfoAppScreen: React.FC<InfoAppProps> = ({ showMap }) => {
  const [frameLoaded, setFrameLoaded] = useState<boolean>(false);

  const { closeModal,modalType, appName } =
    useMyContext();
  const [linkData, setLinkData] = useState("");

  const [loader, setloader] = useState(false);

  const formatNameWithSpaces = (name: any) => {
    // Use a regular expression to split the string into words
    // and then join them with spaces
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  const fetchDataAsync = async () => {
    try {
      setloader(true);
      const result = await Instance.get("/nav-links");
      if (result.status === 200) {
        setloader(false);
        setLinkData(result.data.data[0]);
      } else {
        setloader(false);
      }
    } catch (error: any) {
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [appName]);

  useEffect(() => {
    const data = appInfoName.includes(appName);
    setFrameLoaded(data);
  }, [appName]);

  return (
    <>
      <DirectionModalLayout
        isOpen={modalType.infoApp}
        onClose={() => closeModal("infoApp")}
        name="infoApp"
        {...{ showMap }}
        title={formatNameWithSpaces(appName)}
      >
        {loader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "500px",
            }}
          >
            <Spin tip="Loading" size="large" />
          </div>
        ) : (
          <div style={{ height: "84vh", width: "100%", overflow: 'hidden' }}>
            
            <iframe
              style={{ border: "none", height: "100%", overflow: 'hidden' }}
              src={linkData[appName]}
              height="500px"
              width="100%"
              title={appName}
              className="iframe_body"
            ></iframe>
          </div>
        )}
      </DirectionModalLayout>
    </>
  );
};

export default InfoAppScreen;

 