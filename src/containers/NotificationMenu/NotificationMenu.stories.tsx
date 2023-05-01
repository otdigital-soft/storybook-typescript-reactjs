import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import NotificationMenu from 'containers/NotificationMenu';
import Box from 'components/Box';
import { pickRandom } from 'utils/random';
import { NotificationList } from 'api/schema';

export default {
  title: 'containers/NotificationMenu',
  component: NotificationMenu,
} as ComponentMeta<typeof NotificationMenu>;

let args = {
  numResults: 5,
  loading: false,
  error: false,
  numUnread: 5,
};

const DemoNotificationMenu = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return (
    <Box display="inline-block">
      <NotificationMenu key={key} />
    </Box>
  );
};

const Template: ComponentStory<typeof DemoNotificationMenu> = (props) => (
  <DemoNotificationMenu {...props} />
);

const notification: NotificationList = {
  id: 1,
  title: 'Very very very very long test notification',
  read: false,
  created_at: new Date().toISOString(),
  url: '/dashboard/projects/1/',
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/notifications/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json({
              count: args.numResults,
              next: null,
              previous: null,
              results: new Array(args.numResults)
                .fill(null)
                .map((_, index) => ({
                  ...notification,
                  id: index,
                  read: pickRandom([true, false]),
                })),
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/notifications/unread/`,
        (req, res, ctx) => {
          return res(
            ctx.json({
              count: args.numUnread,
            }),
          );
        },
      ),
    ],
  },
};
