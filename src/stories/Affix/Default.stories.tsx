import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Affix, Button } from 'antd';
import { useState } from 'react';

export default {
  title: 'antd/Affix',
  component: Affix,
  argTypes: {
    offsetBottom: {
      control: 'number',
    },
    offsetTop: {
      control: 'number',
      defaultValue: 0,
    },
    onChange: { action: 'changed' },
  },
} as ComponentMeta<typeof Affix>;

const Template: ComponentStory<typeof Affix> = (args) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <div ref={setContainer} style={{ height: '300vh' }}>
      <Affix target={() => container} {...args}>
        <Button type="primary">Fixed at the top of container</Button>
      </Affix>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
