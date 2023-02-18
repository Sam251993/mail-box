import React from "react"; 

export default function YearPicker(props: { onChange?: (arg0: number) => void, style?: React.CSSProperties, className?: string; }) { 
    const changeYear = (m: number) => props?.onChange?.(m);
    const arrayRange = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);
    let range = arrayRange(1900, 2100);
    function handleClick(option: number) { 
        changeYear(option);
    }
    return (
        <>
            <div style={props.style} className={`grid-cols-4 gap-[4px] grid ${props?.className}`}>
                {range.map((option, index) => (
                    <div
                        className=" font-['Open_Sans'] rounded-2xl cursor-pointer bg-white hover:bg-slate-300 flex justify-center m-1 p-[2px]"
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