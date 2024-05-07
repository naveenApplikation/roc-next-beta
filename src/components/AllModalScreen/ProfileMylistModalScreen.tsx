import React,{useEffect, useState} from "react";
import MyListModalLayout from "@/components//modal/Modal";
import MylistContainer from "@/components/myListModal/page";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";

interface DashboardSearchContainerProps {
    myListtabChange:Function,
    mylistoptions:any,
    myListtabValue:string,
    showMap:boolean
}

const SearchedContainer = styled.div`
  background-color: #f2f3f3;
  padding: 0px 40px;
  border-radius: 24px 24px 0px 0px;
  transition: 5s;
  min-height: 100vh;
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

type tabs = "Lists" | "Places";

const ProfileMylistModalScreen: React.FC<DashboardSearchContainerProps> = ({myListtabChange , mylistoptions , myListtabValue , showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();
    const [listData, setListData] = useState<string[]>([])

    const fetchDataAsync = async () => {
      try {
        const response = await Instance.get("/category?limit=true")
        if (response.status === 200) {
          response.data.forEach((list: any) => {
            const matchedIcon = icons.find(icon => icon.name === list.iconName);
            if (matchedIcon) {
              list.image = matchedIcon.image;
            }
          })
          setListData(response?.data)
        } else {
          setListData([])
  
        }
      } catch (error) {
        setListData([])
  
      }
    }
  
    useEffect(() => {
      fetchDataAsync()
    }, [])

  return (
    <>
      <MyListModalLayout
          isOpen={modalType.myList}
          onClose={() => closeModal("myList")}
          {...{ showMap }}
          title="My Lists"
          name="myListModal"
        >
          <SearchedContainer>
            <MylistContainer
              {...{ myListtabChange, mylistoptions, myListtabValue, showMap, listData }}
            />
          </SearchedContainer>
        </MyListModalLayout>
    </>
  );
};

export default ProfileMylistModalScreen;
