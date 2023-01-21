import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getLocalMonthNames } from "../../../utils/helpers";

export default function MonthPicker(props: { onChange?: (month: string) => void; }) {
    const months = getLocalMonthNames();
    const monthIndex: number = new Date().getMonth();
    const [count, setCount] = useState(monthIndex);
    const changeMonth = (m: string) => props?.onChange?.(m);

    return (
        <>
            <ArrowBackIosNewIcon
                className=" cursor-pointer p-1  hover:bg-slate-300 "
                onClick={() => {
                    const newCount = count <= 0 ? 11 : (count - 1);
                    setCount(newCount);
                    changeMonth(`${months[newCount]}`);
                }}
            />
            <ArrowForwardIosIcon
                className=" p-1 cursor-pointer  hover:bg-slate-300 "
                onClick={() => {
                    const newCount = count >= months.length - 1 ? 0 : count + 1;
                    setCount(newCount);
                    changeMonth(`${months[newCount]}`);
                }}
            />
            <div>
                {months[count]}
                
            </div> 
        </>
    )
}   