import { useMyContext } from "@/app/Context/MyContext";
import CommonButton from "@/components/button/CommonButton";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  background: #fff;
  padding: 16px;
  width: 100%;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthYear = styled.div`
  font-weight: bold;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: black;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const Day = styled.div<{ isSelected?: any; isInRange?: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background: ${(props) =>
    props.isSelected ? "#007bff" : props.isInRange ? "#e9ecef" : "none"};
  color: ${(props) => (props.isSelected ? "#fff" : "inherit")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.isSelected ? "#0056b3" : "#f8f9fa")};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const FooterButton = styled.button<{ primary?: any }>`
  background: ${(props) => (props.primary ? "#007bff" : "white")};
  border: 1px solid black;
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;
const YearSelect = styled.select`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
  color: #000000;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Calendar = () => {
  const { filterSelection, closeModal } = useMyContext();
  const [startDate, setStartDate] = useState("" as any);
  const [endDate, setEndDate] = useState("" as any);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const handleDateClick = (date: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isDateInRange = (date: any) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const day = new Date(currentYear, currentMonth, date);
      const isSelected =
        (startDate && day.toDateString() === startDate.toDateString()) ||
        (endDate && day.toDateString() === endDate.toDateString());
      const isInRange = isDateInRange(day);
      days.push(
        <Day
          key={day.toDateString()}
          isSelected={isSelected}
          isInRange={isInRange}
          onClick={() => handleDateClick(day)}
        >
          {date}
        </Day>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setStartDate(today);
    setEndDate(today);
  };
  const handleYearChange = (event: any) => {
    setCurrentYear(parseInt(event.target.value, 10));
  };

  return (
    <>
      <CalendarContainer>
        <CalendarHeader>
          <Button onClick={handlePrevMonth}>{"<"}</Button>
          <MonthYear>
            {startOfMonth.toLocaleString("default", { month: "long" })}
            <YearSelect value={currentYear} onChange={handleYearChange}>
              {[...Array(100)].map((_, i) => {
                const year = new Date().getFullYear() - 50 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </YearSelect>
          </MonthYear>
          <Button onClick={handleNextMonth}>{">"}</Button>
        </CalendarHeader>
        <CalendarGrid>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
          {renderDays()}
        </CalendarGrid>
        <Footer>
          <FooterButton onClick={handleTodayClick}>Today</FooterButton>
          <FooterButton
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              filterSelection("date", "");
              handleTodayClick();
              closeModal("filterOption");
            }}
          >
            Clear
          </FooterButton>
        </Footer>
      </CalendarContainer>
      <div
        style={{
          padding: "10px 24px",
          marginBottom: "15px",
          position: "sticky",
          bottom: "0px",
        }}
        onClick={() => {
          filterSelection(
            "date",
            `${startDate ? startDate.toDateString() : ""} - ${
              endDate ? endDate.toDateString() : startDate
            }`
          );
          closeModal("filterOption");
        }}
      >
        <CommonButton text="Apply Filter" />
      </div>
    </>
  );
};

export default Calendar;
