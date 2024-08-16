"use client";

import { useRouter } from "next-nprogress-bar";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface ScrollListPage {
  data?: any;
  background?: any;
  params?: any;
}

const ScrollList: React.FC<ScrollListPage> = ({ background, data, params }) => {
  const router = useRouter();
  console.log(params);
  if (params === "EventsByDate" || params === "Events") {
    params = "event-category-list";
  }

  const navigate = (id: any) => {
    router.push(`/categories/${params}?search=${id}`);
  };
  return (
    <Container>
      <MainWrapper>
        {data.map((item: any) => {
          return (
            <Wrapper
              onClick={() => {
                if(item.id=='upcoming')
                {
                    router.push(`/upcoming`);
                }
                else
                {
                navigate(item.id)
                }
              }}
              key={item}
              style={{ background: background }}>
              <p>{item?.listName}</p>
            </Wrapper>
          );
        })}
      </MainWrapper>
      {/* <HalfBlurContainer></HalfBlurContainer> */}
      <BlurContainer></BlurContainer>
    </Container>
  );
};

export default ScrollList;

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  z-index: 1993;

  @media screen and (min-width: 800px) {
    max-width: 470px;
  }

  p {
    color: #fff;
    font-size: 14px;
    width: max-content;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: 4px;
  margin-left: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BlurContainer = styled.div`
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
`;
// const HalfBlurContainer = styled.div`
//     position: absolute;
//     bottom: 28px;
//     left: 0;
//     right: 0;
//     height: 20px;
//     z-index: -1;
//     background: linear-gradient(to top, transparent 18%, transparent 55%);
//     backdrop-filter: blur(1.5px);
// `;

const Wrapper = styled.div`
  border-radius: 24px;
  padding: 8px 12px;
  cursor: pointer;
`;
