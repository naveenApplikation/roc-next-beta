"use client";

import styled from "styled-components";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { CloseModal, thumbsup } from "@/app/utils/ImagePath";
import { sideWidth } from "@/app/utils/date";
import PageLayout from "@/app/pageLayout";
import { icons } from "@/app/utils/iconList";
import Skeleton from "react-loading-skeleton";
import HeaderScreen from "@/components/header/HeaderScreen";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import { useMyContext } from "@/app/Context/MyContext";
import { handleEventEncoding } from "@/app/utils/commanFun";

interface Props {
  data: any;
  urlTitle?: string;
}

export const ListItem: React.FC<Props> = (props) => {
  const listData = props.data;
  listData.forEach((list: any) => {
    const matchedIcon = icons.find((icon) => icon.name === list.iconName);
    if (matchedIcon) {
      list.image = matchedIcon.image;
    }
  });

  const router = useRouter();

  const skeletonItems = new Array(10).fill(null);
  const { showMap, setSelectFilter, modalType, closeModal } = useMyContext();
  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition === true) {
      if (props.urlTitle?.includes("Event")) {
        router.push(`/eventCategory/${handleEventEncoding("encode", item)}`);
      } else if (props.urlTitle?.includes("Activity")) {
        router.push(`/activityCategory/${handleEventEncoding("encode", item)}`);
      } else {
        router.push(`/screens/${item}?categoryID=${id}`);
      }
    }
  };

  const handleBack = () => {
    router.back();
    if (modalType.modalFilterList) {
      closeModal("modalFilterList");
      setSelectFilter("Any");
    }
  };
  return (
    <>
      <PageLayout>
        <CategoryBody>
          <HeaderScreen />
          <div>
            <Container>
              <PopularListContainer>
                <PopularlistTitle>{props.urlTitle}</PopularlistTitle>
                <Image
                  style={{ width: 40, height: 40, cursor: "pointer" }}
                  src={CloseModal}
                  alt="Logo Outline"
                  onClick={() => handleBack()}
                />
              </PopularListContainer>
              {listData.length
                ? listData.map((item: any, index: any) => {
                    return (
                      <ListContainer
                        key={index}
                        onClick={() => {
                          menuClick(
                            item?.listName,
                            true,
                            item?.categoryId ? item.categoryId : item._id
                          );
                        }}>
                        <ImageTitleContainer>
                          <Imagecontainer style={{ background: item?.bgColor }}>
                            {item?.image}
                          </Imagecontainer>
                          <p>{item?.listName}</p>
                        </ImageTitleContainer>
                        <LikesContainer>
                          <Image
                            style={{ width: 16, height: "auto" }}
                            src={thumbsup}
                            alt="icon"
                          />
                          <p>{item.votes}</p>
                        </LikesContainer>
                      </ListContainer>
                    );
                  })
                : skeletonItems.map((item, index) => (
                    <SearchedData key={index}>
                      <MainWrraper>
                        <MainInsideWrapper>
                          <Skeleton
                            width={40}
                            height={40}
                            style={{ borderRadius: 100 }}
                          />
                          <div className="restroRating">
                            <Skeleton width={120} height={14} />
                          </div>
                        </MainInsideWrapper>
                        <Skeleton width={56} height={24} />
                      </MainWrraper>
                    </SearchedData>
                  ))}
            </Container>
          </div>
        </CategoryBody>
      </PageLayout>
      <CalenderBookDatesModalScreen showMap={showMap} />
      <FilterModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap} />
      <ViewDirectionModalScreen showMap={showMap} />
    </>
  );
};

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
    @media screen and (max-width: 350px) {
      font-size: 1.3rem;
    }
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
    @media screen and (max-width: 350px) {
      font-size: 1.6rem;
    }
  }
  p span {
    color: #2b902b;
  }
`;

const MainWrraper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;
const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Container = styled.div`
  padding: 40px;
  padding-bottom: 90px;
  background-color: #fff;
  width: ${sideWidth};
  height: 100%;
  min-height: 100vh;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 40px 15px;
    padding-bottom: 150px;
  }
`;

const PopularListContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .view {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const PopularlistTitle = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 24px;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 0px;
  cursor: pointer;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  p {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Imagecontainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100%;
  background: #eb5757;
`;

const LikesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: rgba(0, 0, 0, 0.48);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: 480px;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
