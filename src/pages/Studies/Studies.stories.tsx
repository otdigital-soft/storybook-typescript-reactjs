import { ComponentStory, ComponentMeta } from '@storybook/react';
import Studies from 'pages/Studies';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { ProjectListFactory } from 'factories';

export default {
  title: 'pages/Studies',
  component: Studies,
} as ComponentMeta<typeof Studies>;

let args = {
  numResults: 5,
  loading: false,
  error: false,
  count: 30,
};

const DemoStudies = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Studies key={key} />;
};

const Template: ComponentStory<typeof DemoStudies> = (props) => (
  <DemoStudies {...props} />
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
