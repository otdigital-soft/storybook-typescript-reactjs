import { ComponentStory, ComponentMeta } from '@storybook/react';
import UpdateProject from 'pages/UpdateProject';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { ProjectDetailsFactory } from 'factories';

export default {
  title: 'pages/UpdateProject',
  component: UpdateProject,
} as ComponentMeta<typeof UpdateProject>;

let args = {
  loading: false,
  error: false,
  errorStatus: 500,
};

const DemoUpdateProject = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <UpdateProject key={key} />;
};

const Template: ComponentStory<typeof DemoUpdateProject> = (props) => (
  <DemoUpdateProject {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(args.errorStatus));
          }
          return res(ctx.json(ProjectDetailsFactory.build()));
        },
      ),
    ],
  },
};
