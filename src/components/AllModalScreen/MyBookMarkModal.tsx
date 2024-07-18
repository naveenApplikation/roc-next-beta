import React, { useEffect, useState } from "react";
import MyListModalLayout from "@/components//modal/Modal";
import MyBookmark from "@/components/myListModal/MyBookmark";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";

interface DashboardSearchContainerProps {
  myBookmarktabChange: any;
  myBookmarkoptions: any;
  myBookMarkState: string;
  showMap: boolean;
  listData?: any;
}



const MyBookMarkModal: React.FC<DashboardSearchContainerProps> = ({
  myBookmarktabChange,
  myBookmarkoptions,
  myBookMarkState,
  showMap,
}) => {
  const { closeModal, modalType } = useMyContext();
  const [listData, setListData] = useState<string[]>([])
  const [contributionData, setContributionData] = useState<string[]>([])
  const [loader, setloader] = useState<boolean>(false)
  const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;

  const fetchDataAsync = async () => {
    if (loginToken) {
      setloader(true)
      if (myBookMarkState === "Created") {
        try {
          const response = await Instance.get("/my-list")
          const list = [response.data]
          if (response.status === 200) {
            list.forEach((list: any) => {
              const matchedIcon = icons.find(icon => icon.name === list.iconName);
              if (matchedIcon) {
                list.image = matchedIcon.image;
              }
            })
            setListData(list)
            setloader(false)
          } else {
            setListData([])
            setloader(false)
          }
        } catch (error) {
          setListData([])
          setloader(false)
        }

      } else {

        try {
          const response = await Instance.get("/my-contribution")
          const list = response.data
          if (response.status === 200) {
            list.forEach((list: any) => {
              const matchedIcon = icons.find(icon => icon.name === list.iconName);
              if (matchedIcon) {
                list.image = matchedIcon.image;
              }
            })
            setContributionData(list)
            setloader(false)
          } else {
            setContributionData([])
            setloader(false)
          }
        } catch (error) {
          setContributionData([])
          setloader(false)
        }
      }
    }
  }

  useEffect(() => {
    fetchDataAsync()
  }, [loginToken, myBookMarkState])

  return (
    <>
      <MyListModalLayout
        isOpen={modalType.myBookmark}
        onClose={() => closeModal("myBookmark")}
        {...{ showMap }}
        title="My Bookmarks"
        name="myBookmarkModal">
        <SearchedContainer>
          <MyBookmark
            {...{
              myBookmarktabChange,
              myBookmarkoptions,
              myBookMarkState,
              listData,
              contributionData,
              loader,
            }}
          />
        </SearchedContainer>
      </MyListModalLayout>
    </>
  );
};

export default MyBookMarkModal;


const SearchedContainer = styled.div`
  background-color: #fff;
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

