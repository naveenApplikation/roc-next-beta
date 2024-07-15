import React from "react";
import SearchModalLayout from "@/components/searchModal/page";
import DashboardSearchContainer from "@/components/dashboardSearchContainer/page";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface SearchContainerProps {
  tabChange?:Function,
  options:any,
  tabValue?:string,
  showMap:boolean
}



const SearchModalScreen: React.FC<SearchContainerProps> = ({tabChange , options , tabValue , showMap})=> {

    const { closeModal, modalClick, modalType } = useMyContext();


  return (
    <>
       <SearchModalLayout
          isOpen={modalType.search}
          onClose={() => closeModal("search")}
          {...{ showMap }}
          title="Search"
          name="search"
        >
          <SearchedContainer>
            <DashboardSearchContainer
              {...{ tabChange, options, tabValue, showMap, modalClick }}
            />
          </SearchedContainer>
        </SearchModalLayout>
    </>
  );
};

export default SearchModalScreen;

const SearchedContainer = styled.div`
  background-color: #fff;
  padding: 0px 40px;
  border-radius: 24px 24px 0px 0px;
  transition: 5s;
  height: 100%;
  @media screen and (max-width: 800px) {
    box-shadow: none;
    background-color: transparent;
    padding: 0px 15px;
  }

  .ant-segmented {
    width: 100%;
    min-height: 32px;
    padding: 3px;
    background-color: #7676801f;
  }
  .filterInput {
    padding: 0px;
    box-shadow: 0px 0px 0px 0px #5229001a;
    box-shadow: 0px 9px 21px 0px #5229001a;
    margin: 15px 0px;
  }
  .ant-segmented-item {
    flex-grow: 1;
  }
  :where(.css-dev-only-do-not-override-1rqnfsa).ant-segmented
    .ant-segmented-item-selected {
    border-radius: 7px;
    box-shadow: 0px 3px 8px 0px #0000001f;
  }
  .ant-segmented-item-label {
    font-size: 13px;
    font-weight: 500;
  }
  .ant-segmented-item-selected .ant-segmented-item-label {
    font-weight: 600;
  }
`;

