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
import WhatsOn from "../search/whatsOn";
import { whatsOnMappingData } from "@/app/utils/mappingFun";


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
  const [orignalData, setOrignalData] = useState<any>([])
  const [whatOnData, setWhatOnData] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false)

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

  const fetchDataWhatsOnAsync = async (value: string) => {
    setLoader(true);
    setLoading(true);
    try {
      const result = await Instance.get(`/filter/avtivities-events?query=${value}`);
      if (result.status == 200) {
        const data: any = whatsOnMappingData(result?.data)
        setOrignalData(result?.data)
        setWhatOnData(data);
        setLoading(false);
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      setLoading(false);
    } finally {
      setLoader(false);
      setLoading(false);
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
    } else if (tabValue === "Lists") {
      await fetchDataListAsync(q);
    } else {
      await fetchDataWhatsOnAsync(q)
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
    } else if (tabValue === "Places") {
      fetchDataAsync(searchQuery, filterValues);
    } else {
      fetchDataWhatsOnAsync(searchQuery)
    }
  }, [tabValue]);




  const debouncedSearch = useCallback(
    debounce((q: string) => {
      tabValue === "Lists" && fetchDataListAsync(q);
      tabValue === "Places" && fetchDataAsync(q, filterValues);
      tabValue === "What's On" && fetchDataWhatsOnAsync(q)
    }, 1000),
    [tabValue]
  )

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setData([]);
      setOrignalData([])
      setWhatOnData([]);
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
  }, [selectFilter, placeData.length, orignalData.length])

  function tabComponent() {
    if (tabValue === "Lists") {
      return <Lists searchItem={data} searchQuery={searchQuery} />

    } else if (tabValue === "Places") {
      return (
        <>
          <FilterSection pageTitle="search" />
          <PlacePage {...{ filterData }} />
        </>
      )
      // return <Lists searchItem={data} searchQuery={searchQuery} />
    } else {
      return (
        <>
          {/* <FilterSection pageTitle="search" /> */}
          <WhatsOn {...{orignalData, loading }} filterData={whatOnData} />
        </>
      )
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
