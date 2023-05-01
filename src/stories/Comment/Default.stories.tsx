import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Comment, Tooltip, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Comment',
  component: Comment,
  argTypes: {},
} as ComponentMeta<typeof Comment>;

const actions = [
  <Tooltip key="comment-basic-like" title="Like">
    <span>
      <LikeOutlined />
      <span className="comment-action">3</span>
    </span>
  </Tooltip>,
  <Tooltip key="comment-basic-dislike" title="Dislike">
    <span>
      <DislikeOutlined />
      <span className="comment-action">3</span>
    </span>
  </Tooltip>,
  <span key="comment-basic-reply-to">Reply to</span>,
];

const Template: ComponentStory<typeof Comment> = (args) => (
  <Comment
    actions={actions}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    datetime={
      <Tooltip title={new Date().toISOString()}>
        <span>{new Date().toISOString()}</span>
      </Tooltip>
    }
    {...args}
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    }
  />
);

export const Default = Template.bind({});
Default.args = {};
