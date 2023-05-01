import { ComponentStory, ComponentMeta } from '@storybook/react';
import Notifications from 'pages/Notifications';
import { rest } from 'msw';
import { NotificationList } from 'api/schema';
import { useEffect, useState } from 'react';
import { pickRandom } from 'utils/random';

export default {
  title: 'pages/Notifications',
  component: Notifications,
} as ComponentMeta<typeof Notifications>;

let args = {
  count: 15,
  numResults: 5,
  loading: false,
  error: false,
};

const DemoNotifications = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Notifications key={key} />;
};

const Template: ComponentStory<typeof DemoNotifications> = (props) => (
  <DemoNotifications {...props} />
);

const notification: NotificationList = {
  id: 1,
  title: 'Test notification',
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
              count: args.count,
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
    ],
  },
};
