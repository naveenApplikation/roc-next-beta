import { styled } from "styled-components";
import type { CSSProperties } from 'react';
import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface ModalProps {
    onClose: () => void;
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 24px;
`;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const CalenderModalContainer = styled.div`
.ant-collapse-header{
    background-color:#ffffff;
    border-radius : 8px;
    margin-bottom:8px;
}
.ant-collapse , .ant-collapse-item{
    background-color:transparent !important;
}
.ant-collapse-item{
    margin-bottom:8px !important;
    background-color:transparent !important;
}
.ant-collapse-content-box{
    background-color:#ffffff;
}
`
const CalenderContainer = styled.div`

.react-calendar button {
    height: 39px;
    padding: 0;
    display:flex;
    justify-content:center;
}

.react-calendar__tile--active {
    background: transparent;
}

.react-calendar__tile--active abbr {
    background-color: #EDAC2F !important;

}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile {
    background-color: transparent !important;
}
.react-calendar{
    border:none;
    width:100%;
}
.react-calendar__tile abbr {
    display: flex;
    height: 36px;
    width: 36px;
    background: #2F80ED;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    color: white;
}
.sunday abbr{
    color: black;
    background-color: #0000000A;
    text-decoration: line-through;
}
@media(max-width:360px){
    .react-calendar__tile abbr{
        height:30px;
        width:30px;
    }
    .react-calendar button{
        height:33px;
    }
}

`




const CalenderModal: React.FC<ModalProps> = ({ onClose }) => {
    const [value , onChange] = useState(new Date());

    const { token } = theme.useToken();
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const tileClassName = (date: any) => {
        return date.date.getDay() === 0 ? 'sunday' : null;
    };

    const CalenderData = () => {
        return (
            <CalenderContainer>
            <Calendar onChange={onChange} value={value} calendarType="US" tileClassName={tileClassName} />
            </CalenderContainer>
        )
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Party Size',
            children: <CalenderData />,
            style: panelStyle,
        },
        {
            key: '2',
            label: 'Time',
            children: text,
            style: panelStyle,
        },
    ];
    return (
        <Container>
            <CalenderModalContainer>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={items}
                    expandIconPosition="end"
                />
            </CalenderModalContainer>
        </Container>
    )
}

export default CalenderModal;