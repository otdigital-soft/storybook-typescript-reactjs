import { ComponentStory, ComponentMeta } from '@storybook/react';
import Box from 'components/Box';
import LineChart from 'pages/Monitor/LineChart';

export default {
  title: 'pages/Monitor/LineChart',
  component: LineChart,
  argTypes: {},
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <Box height={600}>
    <LineChart {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    { date: '2022-03-01', baseline: 30, target: 10, current: 40 },
    { date: '2022-03-02', baseline: 60, target: 20, current: 80 },
    { date: '2022-03-03', baseline: 90, target: 30, current: 60 },
    { date: '2022-03-04', baseline: 120, target: 40, current: 80 },
    { date: '2022-03-05', baseline: 150, target: 50, current: 100 },
    { date: '2022-03-06', baseline: 180, target: 60, current: 120 },
    { date: '2022-03-07', baseline: 210, target: 70, current: 130 },
    { date: '2022-03-08', baseline: 240, target: 80, current: 140 },
    { date: '2022-03-09', baseline: 270, target: 90, current: 180 },
    { date: '2022-03-10', baseline: 300, target: 100, current: 200 },
  ],
  valueTitle: 'Energy (MW)',
  valueUnit: 'MW',
};
