import { useMyContext } from "@/app/Context/MyContext";
import {
  Store,
  calender,
  castle,
  location,
  utensils,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import styled from "styled-components";

interface MapNavigatorProps {
  // Define your props here
}
const MapNavigatorComponent = styled.div`
  display: flex;
  gap: 10px;
`;
const MapNavigatorBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  img {
    height: 12px;
    width: 12px;
  }
`;
const MapNavigatorText = styled.div`
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  color: black;
`;

const mapNavigatorData = [
  {
    img: location,
    name: "St Heiler",
    id: "",
  },
  {
    img: castle,
    name: "To do",
    url: "Todo",
    id: "6645d5578bf8ac8d2d5bd622",
  },
  {
    img: utensils,
    name: "Dine",
    url: "Dine out",
    id: "66439bfe5e177a8bc6196a38",
  },
  {
    img: Store,
    name: "Shop",
    url: "Local shops",
    id: "663f71d6cc049eb2b028d9c8",
  },
  {
    img: calender,
    name: "Events",
    url: "Events",
    id: "",
  },
];

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const MapNavigator: React.FC<MapNavigatorProps> = (props) => {
  const router = useRouter();
  const { mapButtonClick } = useMyContext();
  const menuClick = (item: any, condition?: boolean, id?: any, url?: any) => {
    if (item === "St Heiler") {
    } else if (item == "Events") {
      router.push(`/eventCategory/upcoming`);
      mapButtonClick();
    } else if (condition) {
      router.push(`/screens/${url}?categoryID=${id}`);
      mapButtonClick();
    }
  };

  return (
    <ScrollingMenu>
      {mapNavigatorData.map((item: any, index: any) => {
        return (
          <MapNavigatorBox
            key={index}
            onClick={() => menuClick(item.name, true, item.id, item.url)}>
            <Image src={item.img} alt="" />
            <MapNavigatorText>{item.name}</MapNavigatorText>
          </MapNavigatorBox>
        );
      })}
    </ScrollingMenu>
  );
};

export default MapNavigator;
