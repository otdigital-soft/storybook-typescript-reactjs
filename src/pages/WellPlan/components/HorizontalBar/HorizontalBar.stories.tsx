import { ComponentStory, ComponentMeta } from '@storybook/react';
import Box from 'components/Box';
import HorizontalBar from './HorizontalBar';
import { Separator } from './HorizontalBar.styled';
import Bar from './Bar';
import HorizontalBarTitle from './HorizontalBarTitle';

export default {
  title: 'pages/WellPlan/components/HorizontalChart',
  component: HorizontalBar,
  argTypes: {},
} as ComponentMeta<typeof HorizontalBar>;

const Template: ComponentStory<typeof HorizontalBar> = () => (
  <Box padding={100}>
    <HorizontalBar>
      <Bar
        width="70%"
        backgroundColor="turquoise.7"
        title={
          <HorizontalBarTitle
            title="Improved duration"
            description="2,25 days"
          />
        }
      />
      <Separator borderStyle="solid" borderColor="#050D14" />
      <Bar
        width="30%"
        backgroundColor="gray.4"
        title={
          <HorizontalBarTitle
            title="Planned duration"
            description="2,50 days"
          />
        }
      />
    </HorizontalBar>
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
