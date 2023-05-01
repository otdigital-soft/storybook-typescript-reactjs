import { ComponentStory, ComponentMeta } from '@storybook/react';
import ElementCard from 'components/ElementCard';
import { DeploymentUnitOutlined } from '@ant-design/icons';
import Tag from 'components/Tag';

export default {
  title: 'components/ElementCard',
  component: ElementCard,
  argTypes: {
    onClick: { action: 'on click' },
    updatedAt: {
      control: { type: 'date' },
    },
    cardColor: {
      control: { type: 'color' },
    },
    tag: {
      control: 'boolean',
      mapping: {
        true: <Tag color="success">Tag</Tag>,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof ElementCard>;

const Template: ComponentStory<typeof ElementCard> = (args) => (
  <ElementCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Test card',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a volutpat orci, vitae viverra ex. Cras pharetra tincidunt orci ac blandit. Morbi eu varius turpis, eget lobortis dolor. Sed tortor turpis, posuere nec eros in, porta mattis dolor. Ut dui diam, hendrerit a tempus eu, blandit non ligula',
  icon: <DeploymentUnitOutlined />,
  updatedAt: new Date(),
  width: 600,
  loading: false,
  ellipsis: {
    rows: 2,
  },
  tag: undefined,
};
