import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProjectWell from 'pages/ProjectWell';
import { rest } from 'msw';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CustomWellDetailsFactory, ProjectDetailsFactory } from 'factories';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/ProjectWell',
  component: ProjectWell,
} as ComponentMeta<typeof ProjectWell>;

let args = {
  loadingWell: false,
  wellError: false,
  wellErrorStatus: 500,
  loadingProject: false,
  projectError: false,
  projectErrorStatus: 500,
};

const DemoProjectWell = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useLayoutEffect(() => {
    routeContext.matches = [
      {
        params: { projectId: '2', wellId: '3' },
        pathname: '/dashboard/prepare/projects/2/wells/39/',
        pathnameBase: '/dashboard/prepare/projects/2/wells/39',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <ProjectWell key={key} />;
};

const Template: ComponentStory<typeof DemoProjectWell> = (props) => (
  <DemoProjectWell {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/custom/:wellId/`,
        (req, res, ctx) => {
          if (args.loadingWell) {
            return res(ctx.delay('infinite'));
          } else if (args.wellError) {
            return res(ctx.status(args.wellErrorStatus));
          }
          return res(ctx.json(CustomWellDetailsFactory.build()));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/`,
        (req, res, ctx) => {
          if (args.loadingProject) {
            return res(ctx.delay('infinite'));
          } else if (args.projectError) {
            return res(ctx.status(args.projectErrorStatus));
          }
          return res(ctx.json(ProjectDetailsFactory.build()));
        },
      ),
    ],
  },
};
