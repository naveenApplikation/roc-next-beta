import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useMyContext } from "@/app/Context/MyContext";

import CommonButton from "@/components/button/CommonButton";
import Calendar from "./Calendar";

const FilterModalContent: React.FC = () => {
  const { filterOptions, filterSelection, eventFilters, closeModal } =
    useMyContext();

  const data: any = [
    ["Free entry", "Free For Children"],
    ["Doesn’t require booking", "Booking required"],
    ["Coastal", "Countryside", "Island Wide", "Town"],
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    SearchFilterData,
  ];

  let option: number = 0;
  console.log(filterOptions);
  console.log(Object.keys(filterOptions));
  Object.keys(filterOptions).forEach((elem: string, index) => {
    if (filterOptions[elem] == true) {
      option = index - 1;
    }
  });

  const [options, setOption] = useState([] as any);
  useEffect(() => {
    if (
      filterOptions.title &&
      Array.isArray(eventFilters[filterOptions.title])
    ) {
      setOption([...eventFilters[filterOptions.title]]);
      console.log(eventFilters[filterOptions.title]);
    }
  }, [eventFilters, filterOptions.title]);
  useEffect(() => {
    if (filterOptions.title == "location" && options.length == 0) {
      setOption(["Any"]);
    }
  }, [filterOptions.title, options]);
  console.log(options);
  const handleFilters = (name: any, value: any) => {
    if (filterOptions.title == "location") {
      if (value != "Any" && options.includes("Any")) {
        setOption([value]);
        return;
      } else if (value == "Any") {
        setOption(["Any"]);
        return;
      }
    }

    console.log(name, value, options);
    if (options.includes(value)) {
      const filter = options.filter((item: any) => {
        return value != item;
      });

      console.log(filter);
      setOption([...filter]);
    } else {
      const filter = [...options, value];
      setOption([...filter]);
    }
  };
  console.log(
    filterOptions.title == "location" && eventFilters.location.includes("Any")
  );
  const handleSave = () => {
    filterSelection(filterOptions.title, "", options);
    closeModal("filterOption");
  };
  console.log(options.includes("Any"));
  return (
    <>
      <Container>
        <ScrollingMenu>
          {filterOptions.dates ? (
            <Calendar></Calendar>
          ) : (
            <FilterContainer>
              {(data[option] || []).map((item: any, index: any) => {
                return (
                  <div
                    key={item}
                    style={{
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      gap: "16px",
                      borderBottom: `${
                        index === data[option].length - 1
                          ? ""
                          : "1px solid #dfdfdf"
                      }`,
                      boxSizing: "border-box",
                    }}
                  >
                    <CheckboxInput
                      type="checkbox"
                      checked={options.includes(item)}
                      onClick={() => {
                        handleFilters(filterOptions.title, item);
                      }}
                    />
                    <p style={{ fontWeight: "600" }}>{item}</p>
                  </div>
                );
              })}
            </FilterContainer>
          )}
        </ScrollingMenu>
        {!filterOptions.dates && (
          <div
            style={{
              padding: "10px 24px",
              marginBottom: "15px",
              position: "sticky",
              bottom: "0px",
            }}
            onClick={handleSave}
          >
            <CommonButton text="Apply Filter" />
          </div>
        )}
      </Container>
    </>
  );
};

export default FilterModalContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ScrollingMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 8px;
  padding: 0px 24px;
  padding-top: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const FilterContainer = styled.div`
  background: #f2f2f2;
  border-radius: 10px;
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
`;

const CheckboxInput = styled.input`
  // margin-right: 10px;
  font-size: 16px;
  padding: 0px;
`;

const SearchFilterData = [
  "Any",
  "Saint Helier",
  "Saint Clement",
  "Saint Saviour",
  "Saint Lawrence",
  "Saint Ouen",
  "Saint Mary",
  "Saint John",
  "Trinity",
  "Saint Martin",
  "Saint Peter",
  "Saint Brélade",
  "Grouville",
  "Jersey",
];
