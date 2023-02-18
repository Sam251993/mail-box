import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getLocalMonthNames } from "../../../utils/helpers";

export default function MonthPicker(props: { year?: number, onChange?: (month: number) => void, Change?: (arg0: number) => void, locale?: any, options?: any; }) {
    // const formattedDate = new Date(/* Date.UTC(2017, 0, 2) */).toLocaleString(props.locale, { weekday: 'long' });
    const months = getLocalMonthNames();
    const DefaultMonthIndex: number = new Date().getMonth();
    const [monthIndex, setMonthIndex] = useState(DefaultMonthIndex);
    const changeMonth = (m: number) => props?.onChange?.(m);
    const yearValue = props.year || new Date().getFullYear();
    const changeDay = (w: number) => props?.Change?.(w);
    const [day, setDay] = useState(0);

    const backward = () => {
        const newCount = monthIndex <= 0 ? 11 : (monthIndex - 1);
        setMonthIndex(newCount);
        newCount < 9 ?
            changeMonth(newCount + 1) : changeMonth(newCount + 1);
    }

    const forward = () => {
        const newCount = monthIndex >= months.length - 1 ? 0 : monthIndex + 1;
        setMonthIndex(newCount);
        newCount < 9 ?
            changeMonth(newCount + 1) : changeMonth(newCount + 1);
    }

    const getWeekDays = (locale: string) => {
        const baseDate = new Date(); // just a Monday
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            weekDays.push(baseDate.toLocaleDateString(props.locale, { weekday: 'long' }));
            baseDate.setDate(baseDate.getDate() + 1);
        }
        return weekDays;
    }
    const weekDays = getWeekDays(props.locale).map(([a]) => a);
    const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const days = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

    const monthDays = days(1, daysInMonth(yearValue, monthIndex + 1));
    
    const firstDayOfEachMonthUS = new Date(yearValue, monthIndex, 1).getDay();
    let firstDayOfEachMonthRU;
    firstDayOfEachMonthUS > 0 ? firstDayOfEachMonthRU = firstDayOfEachMonthUS: firstDayOfEachMonthRU = 7; 

    function handle(day: number) {
        setDay(day);
        changeDay(day);
    }
    
    return (
        <>
            <div className="flex justify-end float-right w-2/4">
                <ArrowBackIosNewIcon
                    className=" cursor-pointer p-1  hover:bg-slate-300 "
                    onClick={backward}
                />
                <ArrowForwardIosIcon
                    className=" p-1 cursor-pointer  hover:bg-slate-300 "
                    onClick={forward}
                />
            </div>
            <div>
                <div className="float w-2/4 px-2 capitalize">
                    {months[monthIndex]}
                </div>
                <div className="flex justify-around capitalize">
                    {
                        weekDays.map((week, i) => (
                            <div key={i} className="px-3 inline-block font-bold">{week}</div>))
                    }
                </div>
                <div className="grid-cols-7 grid">
                    {Array.from({ length: firstDayOfEachMonthRU - 1}, (_, i) => (
                        <div key={i}></div>
                    ))}
                    {monthDays.map((day, i) => (
                        <div key={i} className="flex justify-center font-['Open_Sans'] rounded-2xl cursor-pointer bg-white hover:bg-slate-300 p-[2px]" onClick={() => handle(day)}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}   