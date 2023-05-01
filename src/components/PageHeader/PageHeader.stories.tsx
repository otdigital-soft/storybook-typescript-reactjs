import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Tabs, Tag } from 'antd';
import PageHeader from './PageHeader';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

const extra = [
  <Button key="3">Operation</Button>,
  <Button key="2">Operation</Button>,
  <Button key="1" type="primary">
    Primary
  </Button>,
];

const footer = (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Details" key="1" />
    <Tabs.TabPane tab="Rule" key="2" />
  </Tabs>
);

const tags = <Tag color="blue">Processing</Tag>;

export default {
  title: 'antd/PageHeader',
  component: PageHeader,
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'Title',
    },
    subTitle: {
      control: { type: 'text' },
      defaultValue: 'This is a subtitle',
    },
    breadcrumb: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: { routes },
        false: undefined,
      },
    },
    extra: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: extra,
        false: undefined,
      },
    },
    ghost: {
      control: 'boolean',
      defaultValue: true,
    },
    footer: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: footer,
        false: undefined,
      },
    },
    tags: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: tags,
        false: undefined,
      },
    },
    onBack: { action: 'on back' },
  },
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
