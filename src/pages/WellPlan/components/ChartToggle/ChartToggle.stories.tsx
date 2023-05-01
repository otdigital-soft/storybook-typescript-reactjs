import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChartToggle from './ChartToggle';

export default {
  title: 'pages/WellPlan/components/ChartToggle',
  component: ChartToggle,
  argTypes: {
    onClick: { action: 'on click' },
    enabled: {
      control: 'boolean',
    },
    type: {
      options: ['circle', 'line'],
      control: { type: 'select' },
      defaultValue: 'circle',
    },
    color: {
      control: { type: 'color' },
    },
  },
} as ComponentMeta<typeof ChartToggle>;

const Template: ComponentStory<typeof ChartToggle> = (args) => (
  <ChartToggle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 'circle',
  enabled: true,
  color: '#40108f',
  label: 'Support vessel',
};
