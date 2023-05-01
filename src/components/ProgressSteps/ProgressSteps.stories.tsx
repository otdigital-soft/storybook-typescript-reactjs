import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProgressSteps, { Step } from 'components/ProgressSteps';

export default {
  title: 'components/ProgressSteps',
  component: ProgressSteps,
} as ComponentMeta<typeof ProgressSteps>;

const Template: ComponentStory<typeof ProgressSteps> = (args) => (
  <ProgressSteps {...args}>
    <Step title="Well details" description="Well description" />
    <Step title="Well planning" description="Well planning & calculations" />
    <Step title="Well complete" description="Update and approve actual" />
    <Step title="Well report" description="Well complete report" />
  </ProgressSteps>
);

export const Default = Template.bind({});
Default.args = {
  current: 0,
};
