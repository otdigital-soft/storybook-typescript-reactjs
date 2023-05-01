import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Comment, Input, Avatar, Form, Button } from 'antd';

export default {
  title: 'antd/Comment/Editor',
  component: Comment,
  argTypes: {},
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => (
  <Comment
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    {...args}
    content={
      <>
        <Form.Item>
          <Input.TextArea rows={4} placeholder="Textarea placeholder" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </>
    }
  />
);

export const Default = Template.bind({});
Default.args = {};
