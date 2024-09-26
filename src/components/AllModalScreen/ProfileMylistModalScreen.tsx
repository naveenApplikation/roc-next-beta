import React, { useEffect, useState } from "react";
import MyListModalLayout from "@/components//modal/Modal";
import MylistContainer from "@/components/myListModal/page";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import useSWRMutation from "swr/mutation";

interface DashboardSearchContainerProps {
  myListtabChange: Function;
  mylistoptions: any;
  myListtabValue: string;
  showMap: boolean;
  listData?: any;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfileMylistModalScreen: React.FC<DashboardSearchContainerProps> = ({
  myListtabChange,
  mylistoptions,
  myListtabValue,
  showMap,
}) => {
  const { closeModal, modalType } = useMyContext();
  // const [listData, setListData] = useState<string[]>([]);
  const [contributionData, setContributionData] = useState<string[]>([]);
  const [loader, setloader] = useState<boolean>(false);
  const loginToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginToken")
      : null;
  const { data, error, trigger, isMutating } = useSWRMutation(
    "api/bookmarkAndList?type=my-list",
    fetcher
  );
  console.log(error, "bookmark", isMutating, data?.bookmarks);
  let listData = data ? [...data] : ([] as any[]);
  listData?.forEach((list: any) => {
    const matchedIcon = icons.find((icon) => icon.name === list.iconName);
    if (matchedIcon) {
      list.image = matchedIcon.image;
    }
  });
  if (error) {
    listData = [];
  }
  const fetchDataAsync = async () => {
    if (loginToken) {
      // if (myListtabValue === "Created") {
      //   try {
      //     // const response = await Instance.get("/my-list");

      //     // const list = [...response.data];
      //     const response={status:3002}
      //     const list=[] as any
      //     console.log(response);
      //     if (response.status === 200) {
      //       list.forEach((list: any) => {
      //         const matchedIcon = icons.find(
      //           (icon) => icon.name === list.iconName
      //         );
      //         if (matchedIcon) {
      //           list.image = matchedIcon.image;
      //         }
      //       });

      //       setListData(list);
      //       setloader(false);
      //     } else {
      //       setListData([]);
      //       setloader(false);
      //     }
      //   } catch (error) {
      //     setListData([]);
      //     setloader(false);
      //   }
      // } else
      //  {
      if (myListtabValue === "Contributed") setloader(true);
      try {
        const response = await Instance.get("/my-contribution");
        const list = response.data;
        if (response.status === 200) {
          list.forEach((list: any) => {
            const matchedIcon = icons.find(
              (icon) => icon.name === list.iconName
            );
            if (matchedIcon) {
              list.image = matchedIcon.image;
            }
          });
          setContributionData(list);
          setloader(false);
        } else {
          setContributionData([]);
          setloader(false);
        }
      } catch (error) {
        setContributionData([]);
        setloader(false);
      }
    }
  };

  useEffect(() => {
    if (modalType.myList && loginToken) {
      if (myListtabValue === "Created") {
        trigger();
      } else {
        fetchDataAsync();
      }
    }
  }, [modalType, myListtabValue]);
  console.log(listData, "list data", modalType.myList);
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
          {modalType.myList && (
            <MylistContainer
              {...{
                myListtabChange,
                mylistoptions,
                myListtabValue,
                listData,
                contributionData,
              }}
              loader={loader || isMutating}
            />
          )}
        </SearchedContainer>
      </MyListModalLayout>
    </>
  );
};

export default ProfileMylistModalScreen;

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
