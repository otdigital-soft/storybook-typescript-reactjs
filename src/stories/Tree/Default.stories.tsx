import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tree } from 'antd';
import { FormOutlined } from '@ant-design/icons';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

export default {
  title: 'antd/Tree',
  component: Tree,
  argTypes: {
    checkable: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
    icon: {
      control: 'boolean',
      mapping: {
        true: () => <FormOutlined />,
        false: undefined,
      },
    },
    switcherIcon: {
      control: 'boolean',
      mapping: {
        true: <FormOutlined />,
        false: undefined,
      },
    },
    showLine: {
      control: 'boolean',
    },
    defaultExpandAll: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Tree>;

const Template: ComponentStory<typeof Tree> = (args) => (
  <Tree treeData={treeData} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checkable: false,
  multiple: false,
  disabled: false,
  showLine: false,
  showIcon: false,
  defaultExpandAll: false,
  switcherIcon: undefined,
};
