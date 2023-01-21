import React, { useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TextField } from "@mui/material";

export default function YearPicker(props: { changeYear: (arg0: number) => void; }) {
    const [date, setDate] = useState(0);
    const arrayRange = (start: number, stop: number, step: number) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );
    let range = arrayRange(1900, 2100, 1);
    function handleClick(option: number) {
        setDate(option);
        props.changeYear(option);
    }
    return (
        <>
            <TextField
                id="datePicker"
                label="Select Date"
                variant="filled"
                value={date}           
            />
            <div className="grid-cols-4 gap-[1px] w-2/6 grid">
                {range.map((option, index) => (
                    <div
                        className=" font-['Open_Sans'] hover:font-serif w-10 h-6 rounded-2xl cursor-pointer bg-white hover:bg-slate-300 flex justify-center m-1"
                        key={index}
                        onClick={() => handleClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>

        </>
    )
}   