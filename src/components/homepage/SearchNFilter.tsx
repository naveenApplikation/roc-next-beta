import React,{useState} from "react";
import styled from "styled-components";
import SearchInput from "@/components/searchInput/SearchInput";
import Image from "next/image";
import SearchModalScreen from '@/components/AllModalScreen/SearchModalScreen';
import FilterModalScreen from '@/components/AllModalScreen/FilterModalScreen';
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
  }

  const options = ["Lists", "Places"];
type tabs = "Lists" | "Places";

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


const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 8px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;

const FilterInput = styled.div`
  position: relative;
  box-shadow: 0px 0px 24px 0px rgba(82, 41, 0, 0.1);
  border-radius: 8px;
  padding: 0px 16px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

const SearchNFilter: React.FC<DashboardProps> = ({modalClick,menuClick}) => {

  const {showMap } = useMyContext();

  const [tabValue, setTabValue] = useState("Lists");

  const tabChange = (value: tabs) => {
    setTabValue(value);
  };

  return (
    <>
     <InputWrapper>
        <SearchInput onFocus={() => modalClick("search")} />
        <FilterInput onClick={() => modalClick("modalFilter")}>
          <Image
            style={{ marginTop: "10px" }}
            src={
              "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Ffilter.png?alt=media&token=39f6b801-3af0-4187-adff-4ba787ceea23"
            }
            width={16}
            height={16}
            alt="Filter icon"
          />
          Filter
        </FilterInput>
      </InputWrapper>
      <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
      {/* <FilterModalScreen showMap={showMap}  /> */}
    </>
  );
};

export default SearchNFilter;
