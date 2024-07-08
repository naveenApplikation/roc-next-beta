import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import chevronRight from "../../../assets/images/chevron-right.png";
import CommonButton from "../../components/button/CommonButton";
 
import DirectionMapUi from "./DirectionMap";
 
interface DirectionModalProps {
  dataDetails: any
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height:93%;
  width:100%;
`;
const AdventureOption = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  margin: 0px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  p {
    color: var(--BODY, #000);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const DirectionModal: React.FC<DirectionModalProps> = ({ dataDetails }) => {
 
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
 
   
 

  const buttonData = ["Taxis", "Buses", "Bike Hire", "Cycling routes", "Car hire"];

 


  // Encode the title, latitude, and longitude

 
  const directionClick = () => {
    
    let latitude: any
    let longitude: any
    let place_id: any
    if (dataDetails.data_type === "google") {
      latitude = dataDetails?.geometry?.location?.lat;
      longitude = dataDetails?.geometry?.location?.lng;
      place_id = dataDetails?.place_id;
    } else {
      latitude = dataDetails?.acf?.map_location?.lat;
      longitude = dataDetails?.acf?.map_location?.lng;
      place_id = dataDetails?.acf?.map_location?.place_id;
    }
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

 
    window.open(googleMapsUrl, '_blank')
  }

  useEffect(() => {
    console.log("datadetail", dataDetails)
    if (dataDetails.data_type === "google") {
      setLatitude(dataDetails?.lat ? dataDetails?.lat : dataDetails?.geometry?.location?.lat)
      setLongitude(dataDetails?.lng ? dataDetails?.lng : dataDetails?.geometry?.location?.lng)
    } else {
      setLatitude(dataDetails?.acf?.map_location?.lat)
      setLongitude(dataDetails?.acf?.map_location?.lng)
    }
  }, [dataDetails?.lat, dataDetails?.acf?.map_location?.lat, dataDetails?.geometry?.location?.lat])

  return (
    <Container>
      <DirectionMapUi {...{ latitude, longitude }} />


      <div style={{ padding: "0px 24px" }}>
        <CommonButton isOpen={() => directionClick()} text="View in maps" />
      </div>
      <div style={{visibility:'hidden'}}>
        {buttonData.map((item, index) => (
          <AdventureOption key={index}>
            <p>{item}</p>
            <Image
              src={chevronRight}
              style={{ height: "14px", width: "9px" }}
              alt="icon"
            />
          </AdventureOption>
        ))}
      </div>
    </Container>
  );
};

export default DirectionModal;
