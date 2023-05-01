import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvailableProjects from 'pages/Launch/AvailableProjects';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { ProjectListFactory } from 'factories';

export default {
  title: 'pages/Launch/AvailableProjects',
  component: AvailableProjects,
} as ComponentMeta<typeof AvailableProjects>;

let args = {
  numResults: 2,
  loading: false,
  error: false,
};

const DemoAvailableProjects = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <AvailableProjects key={key} />;
};

const Template: ComponentStory<typeof DemoAvailableProjects> = (props) => (
  <DemoAvailableProjects {...props} />
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
              count: args.numResults,
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
