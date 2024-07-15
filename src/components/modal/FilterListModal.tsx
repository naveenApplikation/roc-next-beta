import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonButton from '../../components/button/CommonButton';
import { useMyContext } from "@/app/Context/MyContext";
import { SearchFilterData } from "@/app/utils/data";



const FilterListModal: React.FC = () => {
  const { setSelectFilter, closeModal, selectFilter } = useMyContext();
  const [selectData, setSelectData] = useState<string>("Any");



  const handleCategoryType = (e: any) => {
    setSelectData(e)
  }

  const handleSave = () => {
    setSelectFilter(selectData)
    closeModal("modalFilterList")
  }

  
  useEffect(() => {
    if (selectFilter === "Any") {
      setSelectData("Any")
    }
  }, [selectFilter])

  return (
    <Container>
      <ScrollingMenu>
        {
          SearchFilterData.map(val => {
            return (

              <CheckBoxContainer key={val.id} onClick={() => handleCategoryType(val?.name)}>
                <input type="radio" value={val?.name} checked={selectData === val?.name} />
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
  cursor: pointer;

  p {
    font-size: 13px;
  }
`;