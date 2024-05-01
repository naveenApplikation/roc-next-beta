import { styled } from "styled-components";
import type { CSSProperties } from 'react';
import { Collapse, TimePicker, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './index.css'
import dayjs from 'dayjs';


interface ModalProps {
    onClose: (name: string) => void;
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

.react-calendar, .react-calendar *, .react-calendar *:before, .react-calendar *:after {
    box-sizing: border-box;
    text-decoration: none;
}

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
    const format = 'HH:mm';
    const [value, setValue] = useState(new Date());
    const [timeVal, setTimeVal] = useState(dayjs('12:08', format))

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

    const handleDate = (value: any, event: any) => {
        const originalDate = new Date(value);

        // Convert the date to UTC format
        const utcDate = originalDate.toISOString();
        console.log("data", utcDate)
        setValue(value)
    }



    const handleTime = (time: any, timeString: any) => {
        console.log("time", time.$d.toISOString(), timeString)
        setTimeVal(time)
    }

    const CalenderData = () => {
        return (
            <CalenderContainer>
                <Calendar
                    className="react-cal"
                    next2Label={null}
                    prev2Label={null}
                    defaultView="month"
                    value={value}
                    onChange={(value, event) => handleDate(value, event)}
                    calendarType="gregory"
                    tileClassName={tileClassName} />
            </CalenderContainer>
        )
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Party Size',
            children: text,
            style: panelStyle,
        },
        {
            key: '2',
            label: 'Calender',
            children: <CalenderData />,
            style: panelStyle,
        },
        {
            key: '3',
            label: 'Time',
            children: <TimePicker
                style={{ width: '100%' }}
                onChange={(time, timeString) => handleTime(time, timeString)}
                value={timeVal}
                format={format} />,
            style: panelStyle,
        },
    ];
    return (
        <Container>
            <CalenderModalContainer>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['2']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={items}
                    expandIconPosition="end"
                />
            </CalenderModalContainer>
            {/* <CalenderModalContainer>
                <TimePicker
                    // style={{ width: '100%' }}
                    style={{ width:'100%', background: token.colorFillAlter,}}
                    onChange={(time, timeString) => handleTime(time, timeString)}
                    value={timeVal}
                    format={format} />
            </CalenderModalContainer> */}
        </Container>
    )
}

export default CalenderModal;