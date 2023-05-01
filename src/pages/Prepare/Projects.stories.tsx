import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import Projects from 'pages/Prepare/Projects';
import { ProjectListFactory } from 'factories';

export default {
  title: 'pages/Prepare/Projects',
  component: Projects,
} as ComponentMeta<typeof Projects>;

let args = {
  count: 30,
  numResults: 12,
  loading: false,
  error: false,
};

const DemoProjects = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Projects key={key} />;
};

const Template: ComponentStory<typeof DemoProjects> = (props) => (
  <DemoProjects {...props} />
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
