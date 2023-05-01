import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from 'components/Tabs';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export default {
  title: 'antd/Tabs',
  component: Tabs,
  argTypes: {
    size: {
      options: ['default', 'large', 'small'],
      control: { type: 'select' },
    },
    type: {
      options: ['line', 'card', 'editable-card'],
      control: { type: 'select' },
    },
    tabPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </Tabs.TabPane>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {
  size: 'default' as unknown as SizeType,
  type: 'line',
  tabPosition: 'top',
};
