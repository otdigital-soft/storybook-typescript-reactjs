import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import AllElements from 'pages/Prepare/AllElements';
import Box from 'components/Box';
import {
  CustomRigFactory,
  CustomWellListFactory,
  ProjectListFactory,
} from 'factories';

export default {
  title: 'pages/Prepare/AllElements',
  component: AllElements,
} as ComponentMeta<typeof AllElements>;

let args = {
  numResults: 4,
  loading: false,
  error: false,
};

const DemoAllElements = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <AllElements key={key} />;
};

const Template: ComponentStory<typeof DemoAllElements> = (props) => (
  <Box paddingBottom={20}>
    <DemoAllElements {...props} />
  </Box>
);

export const Default = Template.bind({});
Default.args = { ...args };
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/`,
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
              results: ProjectListFactory.buildList(args.numResults),
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/custom/`,
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
              results: CustomWellListFactory.buildList(args.numResults),
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/rigs/custom/`,
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
              results: CustomRigFactory.buildList(args.numResults),
            }),
          );
        },
      ),
    ],
  },
};
