import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'antd';
import { Flexbox } from 'components/Box';
import { Drawer } from 'containers/FormDrawer';

export default {
  title: 'containers/FormDrawer/Drawer',
  component: Drawer,
  argTypes: {
    title: {
      control: 'text',
    },
    visible: {
      control: 'boolean',
    },
    onClose: { action: 'on close' },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => (
  <Drawer
    {...args}
    visible={true}
    footer={
      <Flexbox gap={8}>
        <Button>Cancel</Button>
        <Button type="primary">Add</Button>
      </Flexbox>
    }
  >
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  </Drawer>
);

export const Default = Template.bind({});
Default.args = {
  title: 'New Phase',
  visible: true,
  placement: 'right',
};
