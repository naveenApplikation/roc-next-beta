import React, { use, useEffect, useRef, useState } from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
const Spin = dynamic(() => import("antd").then((mod) => mod.Spin), {
  ssr: false,
});
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

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
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InfoAppScreen: React.FC<InfoAppProps> = ({ showMap }) => {
  const { closeModal, modalType, appName } = useMyContext();
  // const [linkData, setLinkData] = useState("");

  // const [loader, setloader] = useState(false);

  const formatNameWithSpaces = (name: any) => {
    // Use a regular expression to split the string into words
    // and then join them with spaces
    return name.replace(/([A-Z])/g, " $1").trim();
  };
  const { mutate } = useSWRConfig();
  const { data, isMutating, trigger } = useSWRMutation(
    `/api/nav-link`,
    fetcher
  );

  let navData = data?.data[0];
  // const fetchDataAsync = async () => {
  //   try {
  //     setloader(true);
  //     // const result = await Instance.get("/nav-links");
  //     const result = { status: 2001, data: { data: [] } };
  //     if (result.status === 200) {
  //       setloader(false);
  //       setLinkData(result.data?.data[0]);
  //     } else {
  //       setloader(false);
  //     }
  //   } catch (error: any) {
  //     setloader(false);
  //   } finally {
  //     setloader(false);
  //   }
  // };

  // useEffect(() => {
  //    mutate('/api/nav-link')
  // }, [appName]);
  useEffect(() => {
    if (modalType.infoApp && appName != "") {
      trigger();
    }
  }, [appName, modalType.infoApp]);
  return (
    <>
      <DirectionModalLayout
        isOpen={modalType.infoApp}
        onClose={() => closeModal("infoApp")}
        name="infoApp"
        {...{ showMap }}
        title={formatNameWithSpaces(appName)}
      >
        {isMutating ? (
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
              style={{ border: "none", height: "100%", overflow: "hidden" }}
              src={data ? navData[appName] : ""}
              height="500px"
              width="100%"
              title={appName}
              className="iframe_body"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </DirectionModalLayout>
    </>
  );
};

export default InfoAppScreen;
