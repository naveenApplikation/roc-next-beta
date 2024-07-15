"use client";

import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
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
import useSWR from "swr";

 
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

  useLayoutEffect(() => {
    if (tabValue === "Lists") {
      fetchDataListAsync(searchQuery);
      
    } else {
      fetchDataAsync(searchQuery, filterValues);
    }
  }, []);
 
 



  const debouncedSearch = useCallback(
    debounce((q: string) => {
      tabValue === "Lists" ? fetchDataListAsync(q) : fetchDataAsync(q, filterValues);
    }, 1000),
    [tabValue]
  )

  useEffect(() => {
    debouncedSearch(searchQuery);
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





  return (
    <>
      <InputWrapper className="filterInput">
        <SearchInput
          value={searchQuery}
          onchange={(e: any) => handleChange(e.target.value)}
          handleSearch={handleSearch}
          id="myInput"
          homeSearch={true}
          loader={loader}
        />
      </InputWrapper>
      <TabPanel defaultValue={tabValue} tabChange={tabChange} options={options} />
      {tabValue == "Lists" ? (
          <Lists searchItem={data} searchQuery={searchQuery} />
      ) : (
        <>
          <FilterSection pageTitle="search" />
          <PlacePage {...{ filterData }} />
        </>
      )}
    </>
  );
};

export default DashboardSearchContainer;

const ListDataWrraper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px 0px;
  position: relative;
  cursor: ${(props) => (props.selected ? "pointer" : "not-allowed")};
`;

const ListDataTittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ListDataInfoText = styled.p.attrs((props) => ({
  className: props.className,
}))`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
  &.type_style {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 95%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;
const SearchedListContainer = styled.div`
  padding-bottom: 40px;
  min-height: 50vh;
`;
const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  p {
    font-size: 13px;
    font-weight: 400;
  }
  .likes {
    background-color: #00000014;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;

    @media screen and (max-width: 350px) {
      padding: 6px 12px;
    }
  }
  .shopName {
    font-size: 16px;
    font-weight: 600;
  }
  p span {
    color: #2b902b;
  }
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;
