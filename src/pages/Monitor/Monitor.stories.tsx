import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Monitor from 'pages/Monitor';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/Monitor',
  component: Monitor,
} as ComponentMeta<typeof Monitor>;

let args = {
  loading: false,
  error: false,
};

const DemoMonitor = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useLayoutEffect(() => {
    routeContext.matches = [
      {
        params: { monitorId: '13' },
        pathname: '/dashboard/monitors/13/',
        pathnameBase: '/dashboard/monitors/13',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Monitor key={key} />;
};

const Template: ComponentStory<typeof DemoMonitor> = (props) => (
  <DemoMonitor {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/monitors/:monitorId/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json({
              id: 1,
              name: 'Default monitor',
              start_date: '2022-03-01',
              end_date: '2022-03-31',
              elements: [
                {
                  id: 1,
                  name: 'First element',
                  description:
                    'Realtime C02 emissions baseline 2020 against 2025 forecast',
                  value_unit: 'MW',
                  value_title: 'Energy (MW)',
                },
                {
                  id: 2,
                  name: 'Second element',
                  description: 'Total Co2 per well program',
                  value_unit: 'MW',
                  value_title: 'Energy (MW)',
                },
              ],
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/monitors/:monitorId/elements/:elementId/`,
        (req, res, ctx) => {
          return res(
            ctx.json([
              {
                date: '2022-03-01',
                baseline: 11.45,
                target: 6.45,
                current: 10.0,
              },
              {
                date: '2022-03-02',
                baseline: 22.9,
                target: 12.9,
                current: 19.0,
              },
              {
                date: '2022-03-03',
                baseline: 34.35,
                target: 19.35,
                current: 27.0,
              },
              {
                date: '2022-03-04',
                baseline: 45.81,
                target: 25.81,
                current: 37.0,
              },
              {
                date: '2022-03-05',
                baseline: 57.26,
                target: 32.26,
                current: 44.0,
              },
              {
                date: '2022-03-06',
                baseline: 68.71,
                target: 38.71,
                current: 51.0,
              },
              {
                date: '2022-03-07',
                baseline: 80.16,
                target: 45.16,
                current: 62.0,
              },
              {
                date: '2022-03-08',
                baseline: 91.61,
                target: 51.61,
                current: 72.0,
              },
              {
                date: '2022-03-09',
                baseline: 103.06,
                target: 58.06,
                current: 82.0,
              },
              {
                date: '2022-03-10',
                baseline: 114.52,
                target: 64.52,
                current: 91.0,
              },
              {
                date: '2022-03-11',
                baseline: 125.97,
                target: 70.97,
                current: 102.0,
              },
              {
                date: '2022-03-12',
                baseline: 137.42,
                target: 77.42,
                current: 113.0,
              },
              {
                date: '2022-03-13',
                baseline: 148.87,
                target: 83.87,
                current: 119.0,
              },
              {
                date: '2022-03-14',
                baseline: 160.32,
                target: 90.32,
                current: null,
              },
              {
                date: '2022-03-15',
                baseline: 171.77,
                target: 96.77,
                current: null,
              },
              {
                date: '2022-03-16',
                baseline: 183.23,
                target: 103.23,
                current: null,
              },
              {
                date: '2022-03-17',
                baseline: 194.68,
                target: 109.68,
                current: null,
              },
              {
                date: '2022-03-18',
                baseline: 206.13,
                target: 116.13,
                current: null,
              },
            ]),
          );
        },
      ),
    ],
  },
};
