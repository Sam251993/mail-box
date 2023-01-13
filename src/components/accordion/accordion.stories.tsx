import { ComponentStory } from "@storybook/react";
import Accordion from "./accordion";

export default {
    title: "accordion",
    component: Accordion
}

export const accordion = (...args: any) => <Accordion {...args} />

const Template: ComponentStory<typeof Accordion> = (args: any) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variants: 'primary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <div className='flex items-center gap-2'>

      <span>Search</span>
    </div>
  ),
};