import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import star from "../../../assets/images/star.svg";
import CommonButton from '../../components/button/CommonButton';
import { useMyContext } from "@/app/Context/MyContext";
import { SearchFilterData } from "@/app/utils/data";



const FilterListModal: React.FC = () => {

  const { setFilterValues, searchQuery, fetchDataAsync, closeModal, filterValues, modalType } = useMyContext();

  const [selectData, setSelectData] = useState<string>("Any");



  const handleCategoryType = (e: any) => {
    setSelectData(e.target.value)
  }

  const handleSave = () => {
    console.log("data saved")
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!modalType.modalFilterList) {
      timer = setTimeout(() => {
        setSelectData('Any');
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [modalType.modalFilterList]);
  return (
    <Container>
      <ScrollingMenu>
        {
          SearchFilterData.map((val, index) => {
            return (

              <CheckBoxContainer key={val.id}>
                <input type="radio" value={val?.name} checked={selectData === val?.name} onChange={(e) => handleCategoryType(e)} />
                <p>{val?.name}</p>
              </CheckBoxContainer>
            )

          })
        }
      </ScrollingMenu>
      <div style={{ padding: "0px 20px", marginBottom: '15px', position: "sticky", bottom: '0px' }} onClick={handleSave}>
        <CommonButton text="Save" />
      </div>
    </Container>
  );
};

export default FilterListModal;


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

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;




const CheckBoxContainer = styled.div`
  background-color: white;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  border-bottom : 1px solid #00000040;

  p {
    font-size: 13px;
  }
`;