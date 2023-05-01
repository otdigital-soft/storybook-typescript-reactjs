import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Collapse } from 'antd';

export default {
  title: 'antd/Collapse',
  component: Collapse,
  argTypes: {},
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => (
  <Collapse defaultActiveKey={['1']} {...args}>
    <Collapse.Panel header="This is panel header 1" key="1">
      <p>
        {' '}
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    </Collapse.Panel>
    <Collapse.Panel header="This is panel header 2" key="2">
      <p>
        {' '}
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    </Collapse.Panel>
    <Collapse.Panel header="This is panel header 3" key="3">
      <p>
        {' '}
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    </Collapse.Panel>
  </Collapse>
);

export const Default = Template.bind({});
Default.args = {};
