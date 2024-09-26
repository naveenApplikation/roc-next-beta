"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Instance from "@/app/utils/Instance";
import { useMyContext } from "@/app/Context/MyContext";
import FilterSection from "../filterSection";
import TabPanel from "../tabPanel";
import Lists from "../search/Lists";
import { CategoryIcons } from "@/app/utils/iconList";
import PlacePage from "../search/placeData";
import { useDebounce } from "@/app/utils/debounce";
import WhatsOn from "../search/whatsOn";
import { whatsOnMappingData } from "@/app/utils/mappingFun";
import SearchComponent from "../searchInput/SearchInput";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

interface DashboardSearchContainerProps {
  tabChange?: Function;
  options: any;
  tabValue?: string;
  showMap?: boolean;
  modalClick?: any;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
    closeModal,
  } = useMyContext();
  const [data, setData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [filterData, setFilterData] = useState([]);
  // const [orignalData, setOrignalData] = useState<any>([]);

  // const [whatOnData, setWhatOnData] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [tabValue, setTabValue] = useState("Lists");
  const debouncedValue = useDebounce<string>(searchQuery, 1000); // 500ms delay

  const tabChange = (value: any) => {
    setTabValue(value);
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
    }
  };

  const handleChange = (value: string) => {
    setSearchQuery(value);
    if (searchQuery.length == 0) {
      setData([]);
      setPlaceData([]);
    }
  };

  const fetchDataListAsync = async (value: string) => {
    if (value !== "") {
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
    }
  };
  const {
    data: validData,
    trigger,
    isMutating,
  } = useSWRMutation(
    `/api/whatsOn?value=${searchQuery}&parish=${selectFilter}`,
    fetcher
  );
  const { mutate } = useSWRConfig();

  const whatsOn: any[] = validData ? (whatsOnMappingData(validData) as []) : [];
  const orignalData: any[] = whatsOn;
  let whatsOnData: any[] = whatsOn;

  // setWhatOnData(data);
  // setLoader(false);
  // const fetchDataWhatsOnAsync = async (value: string, selectValue: string) => {
  //   setLoader(true);
  //   try {
  //     // const result = await Instance.get(
  //     //   `/filter/avtivities-events?query=${value}&parish=${selectValue}`
  //     // );
  //        const result ={status:211,data:[]}
  //     if (result.status == 200) {
  //       const data: any = whatsOnMappingData(result?.data);
  //       setOrignalData(data);
  //       setWhatOnData(data);
  //       setLoader(false);
  //     }
  //   } catch (error: any) {
  //     setLoader(false);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleClearText = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input
    }
    if (tabValue === "What's On") {
      // mutate(`api/whatsOn?value=${searchQuery}&parish=${selectFilter}`);
      trigger();
    }
  };

  useEffect(() => {
    if (!modalType.search) {
      setSearchQuery("");
      setData([]);
    }
  }, [modalType.search]);

  // FIRST TIME RENDER
  useEffect(() => {
    // mutate(`api/whatsON?value=${searchQuery}&parish=${selectFilter}`);
    if (tabValue === "What's On") {
      trigger();
    }
  }, [tabValue]);

  // Effect to handle debounced value
  useEffect(() => {
    if (searchQuery) {
      if (debouncedValue) {
        console.log("Debounced Value after 5ms:", debouncedValue);
        if (tabValue === "Lists") {
          fetchDataListAsync(debouncedValue);
        } else if (tabValue === "Places") {
          fetchDataAsync(debouncedValue, filterValues);
        } else if (tabValue === "What's On") {
          // mutate(
          //   `api/whatsOn?value=${searchQuery}&parish=${selectFilter}`
          // );
          trigger();
        }
      }
    } else {
      setData([]);
    }
  }, [debouncedValue]);

  // CALL APIs AFTER TAB CHANGE
  useEffect(() => {
    if (searchQuery) {
      if (tabValue === "Lists") {
        fetchDataListAsync(searchQuery);
      } else if (tabValue === "Places") {
        fetchDataAsync(searchQuery, filterValues);
      } else if (tabValue === "What's On") {
        //  mutate(
        //    `api/whatsOn?value=${searchQuery}&parish=${selectFilter}`
        //  );
        trigger;
      }
    } else {
      setData([]);
    }
  }, [tabValue]);

  // WHAT'S ON API CALL - SELECT FILTER VALUE
  useEffect(() => {
    if (tabValue === "What's On") {
      if (searchQuery) {
        const newWhatsOnData = orignalData.filter((val: any) => {
          if (val?.parishName === selectFilter) return val;
        });
        whatsOnData = selectFilter === "Any" ? orignalData : newWhatsOnData;
        // setWhatOnData(selectFilter === "Any" ? orignalData : newWhatsOnData);
        trigger();
      } else {
        // setWhatOnData(selectFilter === "Any" ? orignalData : []);
        //  mutate(
        //    `api/whatsOn?value=${searchQuery}&parish=${selectFilter}`
        //  );
        trigger();
      }
    }
  }, [selectFilter]);

  // PLACES API CALL - SELECT FILTER VALUE
  useEffect(() => {
    if (tabValue === "Places") {
      if (searchQuery) {
        const newData = placeData.filter((val: any) => {
          if (val?.parishName === selectFilter) return val;
        });
        setFilterData(selectFilter === "Any" ? placeData : newData);
      } else {
        fetchDataAsync(searchQuery, filterValues, selectFilter);
        // setFilterData(placeData)
      }
    }
  }, [selectFilter]);

  // useEffect(() => {
  //   if (searchQuery) {
  //     const newData = placeData.filter((val: any) => {
  //       if (val?.parishName === selectFilter) {
  //         return val
  //       }
  //     })
  //     setFilterData(selectFilter === "Any" ? placeData : newData)
  //   } else {
  //     fetchDataAsync(searchQuery, filterValues, selectFilter);
  //     setFilterData(placeData)
  //   }
  // }, [selectFilter, placeData.length])

  function tabComponent() {
    if (tabValue === "Lists") {
      return (
        <Lists
          tabValue={tabValue}
          searchItem={data}
          searchQuery={searchQuery}
        />
      );
    } else if (tabValue === "Places") {
      return (
        <>
          <FilterSection pageTitle="search" {...{ tabValue }} />
          <PlacePage {...{ filterData, setFilterData }} />
        </>
      );
    } else {
      return (
        <>
          <FilterSection pageTitle="what'sOn" {...{ tabValue }} />
          <WhatsOn
            {...{ orignalData }}
            loader={isMutating}
            filterData={whatsOnData}
          />
        </>
      );
    }
  }

  return (
    <>
      <InputWrapper className="filterInput">
        <SearchComponent
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
      <TabPanel
        defaultValue={tabValue}
        tabChange={tabChange}
        options={options}
      />
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
