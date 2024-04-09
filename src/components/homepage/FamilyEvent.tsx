import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { familyEventMenuItem } from "@/app/dashboard/data";
import Image from "next/image";

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
  }

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

const FamilEventContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;

  .date {
    font-size: 10px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    width: 30px;
  }

  .month {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    background-color: red;
    width: fit-content;
    color: #fff;
    width: 30px;
    border-radius: 0px 0px 8px 8px;
  }
`;

const FamilEventText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FamilyEventWrapperInside = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background: white;
  border-radius: 0px 0px 8px 8px;
`;

const FamilyEvent: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
      <MenuDetails isOpen={() => menuClick("Events")} title="Family Events" />
      <ScrollingMenu>
        {familyEventMenuItem.map((item, index) => {
          return (
            <FamilEventContainer
              key={index}
              onClick={() => modalClick("eventListing", item)}
              style={{ cursor: "pointer" }}
            >
              <FamilyEventWrapper>
                <Image
                  src={item.headerImage}
                  alt=""
                  width={80}
                  height={80}
                  // alt=""
                />
                <FamilyEventWrapperInside>
                  <p className="date">{item.date}</p>
                  <p className="month">{item.month}</p>
                </FamilyEventWrapperInside>
              </FamilyEventWrapper>
              <FamilEventText>{item.eventName}</FamilEventText>
            </FamilEventContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default FamilyEvent;
