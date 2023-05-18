import { TextField } from "@mui/material";
import { useState } from "react";

export default function ChipFilter() {
    const [chips, setChips] = useState([]);
    const addChip = (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                setChips([...chips, e.target.value]);
                e.target.value = "";
            }
        }
    };
    const removeChip = (removedChip: string) => {
        const newChips = chips.filter((chip) => chip !== removedChip);
        setChips(newChips);
    };
    return (
        <div>
            <div>
                {chips.map((chip, index) => {
                    return (
                        <div key={index}>
                            {chip} <span onClick={() => removeChip(chip)}>x</span>
                        </div>
                    );
                })}
                <TextField onKeyDown={addChip}>  
                </TextField>

            </div>
        </div>
    );
}
