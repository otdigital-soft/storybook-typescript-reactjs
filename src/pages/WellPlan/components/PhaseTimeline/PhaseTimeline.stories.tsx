import { ComponentStory, ComponentMeta } from '@storybook/react';
import PhaseTimeline from './PhaseTimeline';

export default {
  title: 'pages/WellPlan/components/PhaseTimeline',
  component: PhaseTimeline,
  argTypes: {},
} as ComponentMeta<typeof PhaseTimeline>;

const Template: ComponentStory<typeof PhaseTimeline> = (args) => (
  <PhaseTimeline {...args} />
);

export const Default = Template.bind({});
Default.args = {
  phases: [
    {
      name: 'Vessel in transit',
      mode: 'Transit',
      lineColor: '#E2E0DC',
      circleColor: '#878786',
      duration: 7.5,
    },
    {
      name: 'Transport section',
      mode: 'DP mode',
      lineColor: '#88D3A6',
      circleColor: '#878786',
      duration: 5,
    },
    {
      name: 'Reservoir section',
      mode: 'PosMoor mode',
      lineColor: '#9FA9B5',
      circleColor: '#88D3A6',
      duration: 7.5,
    },
    {
      name: 'Saved duration',
      lineColor: '#EAECF0',
      circleColor: '#88D3A6',
      duration: 2,
    },
  ],
};
