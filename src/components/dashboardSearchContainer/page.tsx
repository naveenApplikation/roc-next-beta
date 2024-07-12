"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const { modalType, filterValues, setSearchQuery, searchQuery, fetchDataAsync, placeData, setPlaceData, selectFilter, setSelectFilter } = useMyContext();
  const [data, setData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [filterData, setFilterData] = useState([]);
  const [orignalData, setOrignalData] = useState<any>([])
  const [whatOnData, setWhatOnData] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const [tabValue, setTabValue] = useState("Lists");

  const tabChange = (value: any) => {
    setSelectFilter("Any");
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

  const fetchDataWhatsOnAsync = async (value: string, selectValue: string) => {
    setLoading(true);
    try {
      const result = await Instance.get(`/filter/avtivities-events?query=${value}&parish=${selectValue}`);
      if (result.status == 200) {
        const data: any = whatsOnMappingData(result?.data)
        setOrignalData(data)
        setWhatOnData(data);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!modalType.search) {
      setSearchQuery("");
      setData([]);
    }
  }, [modalType.search]);



  useEffect(() => {
    fetchDataWhatsOnAsync(searchQuery, selectFilter)
  }, []);

  useEffect(() => {
    if (searchQuery && tabValue === "What's On") {
      fetchDataWhatsOnAsync(searchQuery, selectFilter)
    }
  }, [tabValue]);



  const debouncingApiFun = (q: string) => {
    if (tabValue === "Lists") {
      fetchDataListAsync(q);
    } else if (tabValue === "Places") {
      fetchDataAsync(q, filterValues);
    } else if (tabValue === "What's On") {
      fetchDataWhatsOnAsync(q, selectFilter)
    }
  }



  const debouncedSearch = useCallback(
    debounce((q: string) => {
      debouncingApiFun(q)
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
      if (tabValue === "What's On") {
        const newWhatsOnData = orignalData.filter((val: any) => {
          if (val?.parishName === selectFilter) return val;
        })
        setWhatOnData(selectFilter === "Any" ? orignalData : newWhatsOnData)
      } else if (tabValue === "Places") {
        const newData = placeData.filter((val: any) => {
          if (val?.parishName === selectFilter) return val;
        })
        setFilterData(selectFilter === "Any" ? placeData : newData)
      }
    } else {
      if (tabValue === "What's On") {
        fetchDataWhatsOnAsync(searchQuery, selectFilter)
      } else {
        fetchDataAsync(searchQuery, filterValues);
      }
    }
  }, [selectFilter, whatOnData.length, tabValue])

  useEffect(() => {
    console.log("dlkskfl", placeData)
    setFilterData(placeData)
  }, [placeData.length])

  const tabComponent = () => {
    if (tabValue === "Lists") {
      return <Lists searchItem={data} searchQuery={searchQuery} />

    } else if (tabValue === "Places") {
      return (
        <>
          <FilterSection pageTitle="search" />
          <PlacePage {...{ filterData }} />
        </>
      )
    } else {
      return (
        <>
          <FilterSection pageTitle="what'sOn" />
          <WhatsOn {...{ orignalData, loading }} filterData={whatOnData} />
        </>
      )
    }
  }

  const handleClearText = () => {
    setSearchQuery('')
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input
    }
    if (tabValue === "What's On") {
      fetchDataWhatsOnAsync(searchQuery, selectFilter)
    }

  }


  return (
    <>
      <InputWrapper className="filterInput">
        <SearchInput
          inputRef={inputRef}
          value={searchQuery}
          onchange={(e: any) => handleChange(e.target.value)}
          // handleSearch={handleSearch}
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
