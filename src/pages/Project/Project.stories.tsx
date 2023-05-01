import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  CustomWellListFactory,
  PlanFactory,
  ProjectDetailsFactory,
  CustomRigListFactory,
} from 'factories';
import Project from './Project';

export default {
  title: 'pages/Project',
  component: Project,
} as ComponentMeta<typeof Project>;

let args = {
  loadingProject: false,
  projectError: false,
  projectErrorStatus: 500,
  loadingElements: false,
  elementsError: false,
  numElements: 5,
  deleteError: false,
};

const DemoProject = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Project key={key} />;
};

const Template: ComponentStory<typeof DemoProject> = (props) => (
  <DemoProject {...props} />
);

export const Default = Template.bind({});
Default.args = { ...args };
Default.parameters = {
  msw: {
    handlers: [
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
      rest.delete(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/`,
        (req, res, ctx) => {
          if (args.deleteError) {
            return res(ctx.status(500));
          }
          return res(ctx.status(204));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/rigs/`,
        (req, res, ctx) => {
          if (args.loadingElements) {
            return res(ctx.delay('infinite'));
          } else if (args.elementsError) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json(CustomRigListFactory.buildList(args.numElements)),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/wells/`,
        (req, res, ctx) => {
          if (args.loadingElements) {
            return res(ctx.delay('infinite'));
          } else if (args.elementsError) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json(CustomWellListFactory.buildList(args.numElements)),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/plans/`,
        (req, res, ctx) => {
          if (args.loadingElements) {
            return res(ctx.delay('infinite'));
          } else if (args.elementsError) {
            return res(ctx.status(500));
          }
          return res(ctx.json(PlanFactory.buildList(args.numElements)));
        },
      ),
    ],
  },
};
