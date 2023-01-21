import Popover from "./popover";
import DatePicker from "../datePicker/datePicker";

export default {
    title: "Popover",
    component: Popover
}

export const popover = () => <Popover>
   
    <div slot='btn'>  <input/></div>
    <div slot='container'><DatePicker/></div> 
</Popover>