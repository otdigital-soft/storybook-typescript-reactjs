import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from 'components/Tag';
import { CheckCircleOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Tag',
  component: Tag,
  argTypes: {
    closable: {
      control: 'boolean',
    },
    visible: {
      control: 'boolean',
    },
    color: {
      options: [
        'success',
        'processing',
        'error',
        'warning',
        'default',
        undefined,
      ],
      control: { type: 'select' },
    },
    icon: {
      control: 'boolean',
      mapping: {
        true: <CheckCircleOutlined />,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  closable: false,
  visible: true,
  children: 'Tag',
  icon: false,
};
