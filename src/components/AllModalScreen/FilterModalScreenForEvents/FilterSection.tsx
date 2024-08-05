"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import { filterSearch, tick } from "@/app/utils/ImagePath";
import { useParams, usePathname, useRouter } from "next/navigation";
import caret from "../../../../assets/images/caret-down.svg";
import { handleFilter } from "@/app/utils/mappingFun";

interface FilterSectionProps {
  // Define your props here
  pageTitle?: string;
  tabValue?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  pageTitle,
  tabValue,
}) => {
  const {
    modalClick,
    setSelectFilter,
    handleFilterOption,
    eventFilters,
    filterSelection,
    filterOptions,
  } = useMyContext();
  // const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const params = useParams();

  // console.log("pathNamepathName", pathName)
  useEffect(() => {
    setSelectFilter("Any");
  }, [pathName, tabValue]);

  const events = [
    "Family_Friendly",
    "Couples",
    "Indoor",
    "Outdoor",
    "Parking",
    "Wheelchair_access",
    "Hearing_loop",
    "Pet_Friendly",
  ];
  if (params.eventName == "activity-list") {
    events.push("Catering");
  }

  const dropdowns = () => {
    if (params.eventName == "event-list" || params.eventName == "Events") {
      return ["Free", "Booking"];
    } else {
      return ["Area", "Location", "Seasonality", "Free", "Booking"];
    }
  };

  const forActivities = dropdowns().map((item) => {
    const name = item.toLowerCase();

    return (
      <DropdownButton
        key={item}
        onClick={() => {
          modalClick("filterOption");
          handleFilterOption(name);
        }}
        className={eventFilters[name].length > 0 ? "active" : ""}
      >
        {eventFilters[name].length > 0 && (
          <Tick>
            <Image src={tick} alt="tick"></Image>{" "}
          </Tick>
        )}

        {item}
        <Caret className={filterOptions[name] ? "active" : ""}>
          {filterOptions[name] ? (
            <Image src={caret} alt="infoCirlce" />
          ) : (
            <Image src={caret} alt="infoCirlce" />
          )}
        </Caret>
      </DropdownButton>
    );
  });

  return (
    <FilterContainer>
      {pageTitle === "search" && (
        <Image
          src={filterSearch}
          onClick={() => modalClick("modalFilter")}
          style={{ cursor: "pointer" }}
          alt=""
        />
      )}

      <ScrollingMenu>
        {params.eventName == "activity-list" ? (
          forActivities
        ) : (
          <>
            <DropdownButton
              onClick={() => {
                modalClick("filterOption");
                handleFilterOption("location");
              }}
              className={eventFilters["location"].length > 0 ? "active" : ""}
            >
              {eventFilters["location"] && (
                <Tick>
                  <Image src={tick} alt="tick"></Image>{" "}
                </Tick>
              )}
              Location
              <Caret className={filterOptions["location"] ? "active" : ""}>
                {filterOptions["location"] ? (
                  <Image src={caret} alt="infoCirlce" />
                ) : (
                  <Image src={caret} alt="infoCirlce" />
                )}
              </Caret>
            </DropdownButton>
            <FilterButton
              className={eventFilters["today"] ? "active" : ""}
              onClick={() => {
                filterSelection("today", !eventFilters["today"]);
              }}
            >
              Today
            </FilterButton>
            <DropdownButton
              onClick={() => {
                modalClick("filterOption");
                handleFilterOption("dates");
              }}
              className={eventFilters["date"] ? "active" : ""}
            >
              {eventFilters["date"] && (
                <Tick>
                  <Image src={tick} alt="tick"></Image>{" "}
                </Tick>
              )}
              Dates
              <Caret className={filterOptions["dates"] ? "active" : ""}>
                {filterOptions["dates"] ? (
                  <Image src={caret} alt="infoCirlce" />
                ) : (
                  <Image src={caret} alt="infoCirlce" />
                )}
              </Caret>
            </DropdownButton>

            {dropdowns().map((item) => {
              const name = item.toLowerCase();

              return (
                <DropdownButton
                  key={item}
                  onClick={() => {
                    modalClick("filterOption");
                    handleFilterOption(name);
                  }}
                  className={eventFilters[name]?.length > 0 ? "active" : ""}
                >
                  {eventFilters[name].length > 0 && (
                    <Tick>
                      <Image src={tick} alt="tick"></Image>{" "}
                    </Tick>
                  )}

                  {item}
                  <Caret className={filterOptions[name] ? "active" : ""}>
                    {filterOptions[name] ? (
                      <Image src={caret} alt="infoCirlce" />
                    ) : (
                      <Image src={caret} alt="infoCirlce" />
                    )}
                  </Caret>
                </DropdownButton>
              );
            })}
          </>
        )}
        {events.map((item) => {
          const name = item.toLowerCase();
          return (
            <FilterButton
              key={item}
              className={eventFilters[name] ? "active" : ""}
              onClick={() => {
                filterSelection(name, !eventFilters[name]);
              }}
            >
              {item.replace("_", " ")}
            </FilterButton>
          );
        })}
      </ScrollingMenu>
    </FilterContainer>
  );
};

export default FilterSection;

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

const FilterButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: #ffffff;
  padding: 12px;
  white-space: nowrap;
  width: 100%;
  color: #000000;
  cursor: pointer;

  &:hover {
    background-color: rgba(235, 235, 235, 255);
  }

  &.active {
    background-color: rgba(235, 235, 235, 255);
  }
`;
const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow: auto;
  align-items: center;
  /* margin-top: 20px;
    margin-bottom: 30px; */
  div {
    padding: 0px;
  }
`;
const DropdownButton = styled.button`
  background: #ffffff;
  color: #000000;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(235, 235, 235, 255);
  }

  &.active {
    background-color: rgba(235, 235, 235, 255);
  }
`;

const Tick = styled.span`
  margin-right: 10px;
  font-size: 12px;
  transition: transform 0.3s;
`;
const Caret = styled.span`
  margin-left: 10px;
  font-size: 12px;
  transition: transform 0.3s;

  &.active {
    transform: rotate(-90deg);
  }
`;
