import React, { useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover from "../popover/popover";
import { TextField } from "@mui/material";
import MonthPicker from "./monthPicker/monthPicker";
import { Console } from "../../utils/helpers"; 
import YearPicker from "./YearPicker/yearPicker";


enum View {
    Month = "Month",
    Year = "Year",
    Hour = "Hour",
    Minute = 'Minute'
}

export default function DatePicker() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(0);
    const [viewType, setViewType] = useState(View.Year);
    const arrayRange = (start: number, stop: number, step: number) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );
    let range = arrayRange(1900, 2100, 1);
    const yearHandler = (year: number) => {
        setYear(year);
        setViewType(View.Month);
    }
    return (
        <>
            <Console log="rendered" />
            <TextField
                id="datePicker"
                label="Select Date"
                variant="filled"
                value={ year + ':' + month }
            />
            <Popover>
                <CalendarMonthIcon role="btn" />
                <div role='container'>
                    {[
                        viewType === View.Year ? <YearPicker changeYear={yearHandler} /> 
                          /*   <div className="grid-cols-4 gap-[1px] w-2/6 grid">
                                {range.map((option, index) => (
                                    <div
                                        className=" font-['Open_Sans'] hover:font-serif w-10 h-6 rounded-2xl cursor-pointer bg-white hover:bg-slate-300 flex justify-center m-1"
                                        key={index}
                                        onClick={() => handleClick(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>  */: null,
                        viewType === View.Month ? <MonthPicker onChange = {(month: React.SetStateAction<string>)=>setMonth(month)} /> : null,
                        // viewType === View.Hour ? <TimePicker step={1} maxNumber={12} /> : null,
                        // viewType === View.Minute ? <TimePicker step={5} maxNumber={60} /> : null,
                    ]}
                </div>
            </Popover>
            {/* {viewType === View.Hour} && */}

            {/* display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 1px;
    grid-auto-rows: minmax(15px, auto);
    width: 30%; */}
 
        </>
    )
}   