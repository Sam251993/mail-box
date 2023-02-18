import React, { useRef, useState } from "react";
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './clockPicker.css'
import { View } from "../../../utils/interfaces";


export default function ClockPicker({ max, step, fromZero, onChange, onDayTimeChange, setViewOnClick }: { setViewOnClick?: any, onDayTimeChange?: (arg0: string) => void, onChange?: (arg0: number) => void, step?: number, max?: number, fromZero?: boolean }) {
    const [pointerAngle, setPointerAngle] = useState(0);
    let arrLabels = [];
    const clockWidth = 200;
    const maxNumber = max || 24;
    const stepNumber = step || 1;
    const startFromZero = !!fromZero;
    for (let i = 0; i < maxNumber; i += stepNumber) {
        arrLabels.push(i);
    };
    const change = (m: number) => onChange?.(m);
    const dayTimeChange = (m: string) => onDayTimeChange?.(m);

    const circleRef = useRef<HTMLInputElement>(null);

    const handler = (event: { clientX: number; clientY: number; }) => {
        const rect = circleRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI;
        angle = round((Math.round(angle) + 450) % 360, 360 / maxNumber, 0);
        setPointerAngle(angle); 
    };

    function round(number: number, increment: number, offset: number) {
        return Math.round((number - offset) / increment) * increment + offset;
    }

    function mouseMoveHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.buttons === 1) {
            handler(e);
        }
    }

    function mouseDownHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        handler(e);
    }

    const getNumber = (angle: number) => Math.round(angle / (360 / maxNumber)) % maxNumber;

    const handle = (event: any) => {
        dayTimeChange(event.target.innerText);
    }

    const setView = () => {
        if (View.Hour) {
            setViewOnClick(View.Minute)
        } else { setViewOnClick(View.Hour) }
    }
    return (
        <div>
            <div className="absolute right-0 w-1/4">
                <IconButton size="small" disableFocusRipple disableRipple onClick={setView} className="cursor-pointer p-1  hover:bg-slate-300">
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" disableFocusRipple disableRipple onClick={setView} className="cursor-pointer p-1  hover:bg-slate-300">
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </div>
            <div
                className=" bg-slate-200 rounded-full select-none relative w-[200px] h-[200px] m-auto mt-2 top-2"
                ref={circleRef} onMouseMove={mouseMoveHandler}
                onMouseDown={mouseDownHandler}
                onMouseUp={() => change(getNumber(pointerAngle))}
                style={{ '--width': `${clockWidth}px` } as React.CSSProperties}
            >
                {arrLabels.map((option, index) => (
                    <div key={index} className={`clock-label label-${startFromZero ? index : index + 1}`}>
                        <div className="label">
                            {startFromZero ? option : option + stepNumber}
                        </div>
                    </div>
                ))}
                <div className="line" style={{ transform: `translate(calc(calc(var(--width) / 2) - 1.5px), 0) rotateZ(${pointerAngle}deg)` }}>
                    <div className="stick"></div>
                    <div className="oval"></div>
                </div>
                <div className="center"></div>
            </div>
            <div className=" justify-between flex">
                <div onClick={handle} className="ml-2 cursor-pointer p-1  hover:bg-slate-300 rounded-2xl">AM</div>
                <div onClick={handle} className="mr-2 cursor-pointer p-1  hover:bg-slate-300 rounded-2xl">PM</div>
            </div>
        </div>
    )
}