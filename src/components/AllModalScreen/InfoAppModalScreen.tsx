import React, { useEffect, useState } from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { Spin } from 'antd';

interface InfoAppProps {
  showMap: boolean,
}

const InfoAppScreen: React.FC<InfoAppProps> = ({ showMap }) => {


  const { modalName, closeModal, modalClick, dataDetails, modalType, appName } = useMyContext();
  const [linkData, setLinkData] = useState("")

  const [loader, setloader] = useState(false);

  const fetchDataAsync = async () => {
    try {
      setloader(true);
      const result = await Instance.get("/nav-links");
      if (result.status === 200) {
        setloader(false);
        setLinkData(result.data.data[0])
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
    fetchDataAsync()
  }, [appName])

  

  return (
    <>
      <DirectionModalLayout
        isOpen={modalType.infoApp}
        onClose={() => closeModal("infoApp")}
        name="infoApp"
        {...{ showMap }}
        title={appName}
      >

        {
          loader ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'500px'}}>
            <Spin tip="Loading" size="large" />
          </div> :
            <iframe
              style={{ border: 'none' }}
              src={linkData[appName]} height="500px" width="100%" title={appName}></iframe>
        }
      </DirectionModalLayout>
    </>
  );
};

export default InfoAppScreen;
