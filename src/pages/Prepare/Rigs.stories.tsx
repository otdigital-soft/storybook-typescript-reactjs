import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import Rigs from 'pages/Prepare/Rigs';
import { CustomRigFactory } from 'factories';

export default {
  title: 'pages/Prepare/Rigs',
  component: Rigs,
} as ComponentMeta<typeof Rigs>;

let args = {
  count: 30,
  numResults: 12,
  loading: false,
  error: false,
};

const DemoRigs = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Rigs key={key} />;
};

const Template: ComponentStory<typeof DemoRigs> = (props) => (
  <DemoRigs {...props} />
);

export const Default = Template.bind({});
Default.args = { ...args };
Default.parameters = {
  msw: {
    handlers: [
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
              count: args.count,
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
