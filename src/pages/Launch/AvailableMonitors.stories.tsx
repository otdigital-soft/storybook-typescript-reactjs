import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvailableMonitors from 'pages/Launch/AvailableMonitors';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { MonitorList } from 'api/schema';

export default {
  title: 'pages/Launch/AvailableMonitors',
  component: AvailableMonitors,
} as ComponentMeta<typeof AvailableMonitors>;

let args = {
  numResults: 2,
  loading: false,
  error: false,
};

const DemoAvailableMonitors = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <AvailableMonitors key={key} />;
};

const Template: ComponentStory<typeof DemoAvailableMonitors> = (props) => (
  <DemoAvailableMonitors {...props} />
);

const monitor: MonitorList = {
  id: 1,
  name: 'Test Monitor',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et sodales ex. Nam at orci maximus, ultricies nisl et, egestas lacus. In ac ex nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae massa non leo molestie tristique eu vitae arcu. Sed facilisis neque eu eros rhoncus, nec congue tortor facilisis',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/monitors/`,
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
                .map((_, index) => ({ ...monitor, id: index })),
            }),
          );
        },
      ),
    ],
  },
};
