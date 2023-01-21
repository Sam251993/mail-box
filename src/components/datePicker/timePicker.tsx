import React, {useState} from "react";

export default function TimePick() {   
    const [time, setTime] = useState(''); 
    return (
        <>  
            <input type="time" onChange={e=>setTime(e.target.value)}/>
            

        </>
    )
}   