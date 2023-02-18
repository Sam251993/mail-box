import ClockPicker from "./clockPicker"

 

export default {
    title: "Clock",
    component: ClockPicker
}

export const hour = () => <ClockPicker step={1} max={12} />
export const minute = () => <ClockPicker fromZero={true} step={5} max={60} />