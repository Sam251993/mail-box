import React, { useState } from "react";
import { createPortal } from "react-dom"; 

export default function Popover({ children }: { children: React.ReactElement[] }) {
    const [open, setOpen] = useState<boolean>(false);

    const container = children.find((child => child.props.role === 'container'));
    const button = children.find((child => child.props.role === 'btn'));

    const clickHandler = () => {
        setOpen(!open);
    }

    return (
        
        <div  className=" w-1">
            <div onClick={clickHandler}>{button}</div>
            {open && createPortal(container, document.body)}
        </div>
    )
}

// function Container(props?: any) {
//     return (
//         <div>
//             container
//         </div>
//     )
// }
//////////////////////////
{/* <datapicker asdf>
    <input />
    <popover>
        <button slot='btn' />
        <container slot='container'>
            &&
            <></>
            &&
            <></>
            &&
            <></>
        <container/>
    <popover/>
<datapicker/> */}