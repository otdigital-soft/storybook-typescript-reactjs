import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvailableStudies from 'pages/Launch/AvailableStudies';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { ProjectListFactory } from 'factories';

export default {
  title: 'pages/Launch/AvailableStudies',
  component: AvailableStudies,
} as ComponentMeta<typeof AvailableStudies>;

let args = {
  numResults: 3,
  loading: false,
  error: false,
  count: 10,
};

const DemoAvailableStudies = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <AvailableStudies key={key} />;
};

const Template: ComponentStory<typeof DemoAvailableStudies> = (props) => (
  <DemoAvailableStudies {...props} />
);

export const Default = Template.bind({});
Default.args = args;
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
              count: args.count,
              next: null,
              previous: null,
              results: ProjectListFactory.buildList(args.numResults),
            }),
          );
        },
      ),
    ],
  },
};
