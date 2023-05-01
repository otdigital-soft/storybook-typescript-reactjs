import { ComponentStory, ComponentMeta } from '@storybook/react';
import Well from 'pages/Well';
import { rest } from 'msw';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CustomWellDetailsFactory } from 'factories';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/Well',
  component: Well,
} as ComponentMeta<typeof Well>;

let args = {
  loading: false,
  error: false,
  errorStatus: 500,
};

const DemoWell = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useLayoutEffect(() => {
    routeContext.matches = [
      {
        params: { wellId: '3' },
        pathname: '/dashboard/prepare/wells/42/',
        pathnameBase: '/dashboard/prepare/wells/42',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Well key={key} />;
};

const Template: ComponentStory<typeof DemoWell> = (props) => (
  <DemoWell {...props} />
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
