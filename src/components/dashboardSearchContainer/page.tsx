"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

import SearchInput from "../searchInput/SearchInput";
import Instance from "@/app/utils/Instance";
import { useMyContext } from "@/app/Context/MyContext";
import FilterSection from "../filterSection";
import TabPanel from "../tabPanel";
import Lists from "../search/Lists";
import { CategoryIcons } from "@/app/utils/iconList";
import PlacePage from "../search/placeData";
import { debounce } from "@/app/utils/debounce";


interface DashboardSearchContainerProps {
  tabChange?: Function;
  options: any;
  tabValue?: string;
  showMap?: boolean;
  modalClick?: any;
}

const DashboardSearchContainer: React.FC<DashboardSearchContainerProps> = ({
  options,
}) => {
  const {
    modalType,
    filterValues,
    setSearchQuery,
    searchQuery,
    fetchDataAsync,
    placeData,
    setPlaceData,
    selectFilter,
  } = useMyContext();
  const [data, setData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [filterData, setFilterData] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const newArray = ["Lists", "What's On"]

  const [tabValue, setTabValue] = useState("Lists");

  const tabChange = (value: any) => {
    setTabValue(value);
  };

  const handleChange = (value: string) => {
    setSearchQuery(value);
    if (searchQuery.length == 0) {
      setData([]);
      setPlaceData([]);
    }
  };

  const fetchDataListAsync = async (value: string) => {
    setLoader(true);
    try {
      const result = await Instance.get(`/filter/category?query=${value}`);
      if (result.status === 200) {
        result.data.list.forEach((list: any) => {
          const matchedIcon = CategoryIcons.find(
            (icon) => icon.name === list.iconName
          );
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        });
        setData(result?.data);
      }
    } catch (error: any) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!modalType.search) {
      setSearchQuery("");
      setData([]);
    }
  }, [modalType.search]);



  const handleSearch = async (q: any) => {
    if (tabValue === "Places") {
      await fetchDataAsync(q, filterValues);
    } else {
      await fetchDataListAsync(q);
    }
  };

  const handleClearText = () => {
    setSearchQuery('')
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input
    }

  }

  useLayoutEffect(() => {
    if (tabValue === "Lists") {
      fetchDataListAsync(searchQuery);

    } else {
      fetchDataAsync(searchQuery, filterValues);
    }
  }, []);




  const debouncedSearch = useCallback(
    debounce((q: string) => {
      newArray.includes(tabValue) ? fetchDataListAsync(q) : fetchDataAsync(q, filterValues);
    }, 1000),
    [tabValue]
  )

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setData([]);
    }
  }, [searchQuery]);


  useEffect(() => {
    if (searchQuery) {
      const newData = placeData.filter((val: any) => {
        if (val?.parishName === selectFilter) {
          return val
        }
      })
      setFilterData(selectFilter === "Any" ? placeData : newData)
    } else {
      fetchDataAsync(searchQuery, filterValues, selectFilter);
      setFilterData(placeData)
    }
  }, [selectFilter, placeData.length])

  function tabComponent() {
    if (tabValue === "Places") {
      return (
        <>
          <FilterSection pageTitle="search" />
          <PlacePage {...{ filterData }} />
        </>
      )
      
    // } else if (tabValue === "Places") {
      
    //   return <Lists searchItem={data} searchQuery={searchQuery} />
    } else {
      return <Lists searchItem={data} searchQuery={searchQuery} />
    }
  }



  return (
    <>
      <InputWrapper className="filterInput">
        <SearchInput
          inputRef={inputRef}
          value={searchQuery}
          onchange={(e: any) => handleChange(e.target.value)}
          handleSearch={handleSearch}
          handleClearText={handleClearText}
          id="myInput"
          homeSearch={true}
          loader={loader}
        />
      </InputWrapper>
      <TabPanel defaultValue={tabValue} tabChange={tabChange} options={options} />
      {tabComponent()}
    </>
  );
};

export default DashboardSearchContainer;



const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;
