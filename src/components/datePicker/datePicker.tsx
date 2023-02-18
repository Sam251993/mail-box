import React, { useState, forwardRef, useRef, createRef, useCallback } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover, { Positions } from "../popover/popover";
import { IconButton, TextField } from "@mui/material";
import MonthPicker from "./monthPicker/monthPicker";
import { Console } from "../../utils/helpers";
import YearPicker from "./YearPicker/yearPicker";
import { View } from "../../utils/interfaces";
import ClockPicker from "./clockPicker/clockPicker";

type DatePickerProps = Partial<{
    locale: Intl.LocalesArgument,
    options: Intl.DateTimeFormatOptions
}>;

export default function DatePicker({ locale, options }: DatePickerProps) {

    const [value, setValue] = useState('');
    const [month, setMonth] = useState(0);
    const [hour, setHour] = useState(0);
    const [dayTime, setDayTime] = useState("AM");
    const [minute, setMinute] = useState(0);
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);
    const [viewType, setViewType] = useState(View.Year);
    const popoverRef = useRef<any>();
    const [bounds, setBounds] = useState<DOMRect | undefined>(undefined);

    const yearHandler = (year: number) => {
        setYear(year);
        setDay(day);
        setViewType(View.Month);
    }

    const dayHandler = (day: number) => {
        setDay(day);
        setViewType(View.Hour)
    };

    const hourHandler = (hour: number) => { 
        setHour(hour);
        setViewType(View.Minute)
    };

    const minuteHandler = (minute: number) => { 
        popoverRef.current && popoverRef.current.triggerOpen(false);
        setMinute(minute);
        setViewType(View.Year);
    };

    const setViewOnClick = () => {
        viewType === View.Hour ?
            setViewType(View.Minute) : setViewType(View.Hour)
    };

    const formattedDate = year <= 0 ? new Date().toLocaleString(locale, options) : new Date(year, month, day, hour, minute).toLocaleString(locale, options);

    const dayTimeHandler = (dayTime: string) => {
        setDayTime(dayTime);
    };

    if (dayTime === "PM" && hour <= 12) {
        setHour(hour + 12);
    } else if (dayTime === "AM" && hour > 12) {
        setHour(hour - 12);
    }
    const textFieldRef = useCallback((node: any) => {
        if (node !== null) {
            setBounds(node.getBoundingClientRect());
        }
    }, []);
    /* function handleChange (event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue(event.target.value);
    } */
    console.log(`${formattedDate} test`)
    return (
        <div className='w-60' >
            <Console log="rendered" />
            <TextField
                id="datePicker"
                ref={textFieldRef}
                label="Select Date"
                variant="filled"
                value={formattedDate}/* 
                onChange={handleChange} */
                InputProps={{
                    endAdornment:
                        <Popover
                            bounds={bounds}
                            position={Positions.Top}
                            ref={popoverRef}
                        >
                            <IconButton
                                aria-label="calendar"
                                edge="end"
                                role="btn"
                            >
                                <CalendarMonthIcon />
                            </IconButton>
                            <div role="container" className="w-60 h-64 bg-white rounded shadow-md border-t">
                                {
                                    (viewType === View.Year || viewType === View.Month || viewType === View.Hour || viewType === View.Minute) ?
                                        <div className="h-full">
                                            {viewType === View.Year ? <YearPicker style={{ height: 'calc(100% - 24px)' }} className="overflow-auto" onChange={yearHandler} /> : null}
                                            {viewType === View.Month ? <MonthPicker
                                                year={year} onChange={(month: number) => setMonth(month)} Change={dayHandler} locale={locale} options={options} /> : null}
                                            {viewType === View.Hour ? <ClockPicker setViewOnClick={setViewOnClick} step={1} max={12} onChange={hourHandler} onDayTimeChange={dayTimeHandler} /> : null}

                                            {viewType === View.Minute ? <ClockPicker setViewOnClick={setViewOnClick} step={5} max={60} fromZero={true} onChange={minuteHandler} onDayTimeChange={dayTimeHandler} /> : null}

                                        </div> : null
                                    // viewType === View.Hour ? <TimePicker onchange={hourHandler} step={1} max={12} /> : null,
                                    // viewType === View.Minute ? <TimePicker onchange={minuteHandler} step={5} max={60} /> : null,
                                }
                            </div>
                        </Popover>
                }}
            >
            </TextField>
        </div>
    )
}   