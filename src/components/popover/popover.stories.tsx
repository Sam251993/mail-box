import Popover, { Positions } from "./popover";
import DatePicker from "../datePicker/datePicker";
import { ComponentStory } from "@storybook/react";

export default {
    title: "Popover",
    component: Popover
}

export const popover = () => <Popover>

    <div role='btn'><span>aa</span></div>
    <div role='container'><DatePicker /></div>
</Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} style={{width: '200px'}}>
    <div style={{width: '200px'}} role='btn'><span>aa</span></div>
    <div role='container'><span>ss</span></div>
</Popover>;

export const Bottom = Template.bind({});
Bottom.args = {
    position: Positions.Bottom,
};

export const Top = Template.bind({});
Top.args = {
    position: Positions.Top,
};

export const Left = Template.bind({});
Left.args = {
    position: Positions.Left,
};

export const Right = Template.bind({});
Right.args = {
    position: Positions.Right,
};