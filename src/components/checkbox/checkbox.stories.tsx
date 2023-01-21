import App from "./checkbox";
import { ComponentStory } from "@storybook/react";

export default {
    title: "checkbox",
    component: App
}

export const checkbox = (...args: any) => <App {...args} />
const Template: ComponentStory<typeof App> = (args: any) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variants: 'primary',
};

