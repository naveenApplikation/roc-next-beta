import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { LocalCuisineMenuItem } from "@/app/dashboard/data";
import Image from "next/image";

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
}

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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const StarContainer = styled.div`
  width: 120px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const StarWrapper = styled.div`
  height: 64px;
  width: 100%;
  background: linear-gradient(45deg, black, transparent);
  position: relative;

  p {
    position: absolute;
    top: 4px;
    right: 5px;
    background: #fff;
    width: 30px;
    text-align: center;
    border-radius: 10px;
    font-size: 8px;
  }

  .StarImageStyle {
    /* width: -webkit-fill-available; */
    height: 64px;
    border-radius: 6px;
  }
`;

const Surfing: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  return (
    <>
      <MenuDetails isOpen={() => menuClick("Events")} title="Surfing" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => modalClick("ModalContent", item)}
            >
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"
                    }
                    width={69}
                    height={12}
                    alt="right icon"
                  />{" "}
                  <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default Surfing;
