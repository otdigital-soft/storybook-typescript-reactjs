import { ComponentStory, ComponentMeta } from '@storybook/react';
import UpdateWell from 'pages/UpdateWell';
import { rest } from 'msw';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CustomWellDetailsFactory } from 'factories';
import Box from 'components/Box';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/UpdateWell',
  component: UpdateWell,
} as ComponentMeta<typeof UpdateWell>;

let args = {
  loading: false,
  error: false,
  errorStatus: 500,
};

const DemoUpdateWell = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useLayoutEffect(() => {
    routeContext.matches = [
      {
        params: { wellId: '3' },
        pathname: '/dashboard/prepare/wells/3/update/',
        pathnameBase: '/dashboard/prepare/wells/3/update',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <UpdateWell key={key} />;
};

const Template: ComponentStory<typeof DemoUpdateWell> = (props) => (
  <Box paddingBottom={30}>
    <DemoUpdateWell {...props} />
  </Box>
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/custom/:wellId/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(args.errorStatus));
          }
          return res(ctx.json(CustomWellDetailsFactory.build()));
        },
      ),
    ],
  },
};
