import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  CustomRigListFactory,
  CustomWellListFactory,
  ProjectPlanFactory,
} from 'factories';
import UpdatePlan from 'pages/UpdatePlan';

export default {
  title: 'pages/UpdatePlan',
  component: UpdatePlan,
} as ComponentMeta<typeof UpdatePlan>;

let args = {
  projectPlanLoading: false,
  projectPlanError: false,
  projectPlanErrorStatus: 500,
  projectWellsLoading: false,
  projectWellsError: false,
  projectWellsNumResults: 5,
  projectRigsLoading: false,
  projectRigsError: false,
  projectRigsNumResults: 5,
};

const DemoUpdatePlan = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <UpdatePlan key={key} />;
};

const Template: ComponentStory<typeof DemoUpdatePlan> = (props) => (
  <DemoUpdatePlan {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/plans/:planId/`,
        (req, res, ctx) => {
          if (args.projectPlanLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.projectPlanError) {
            return res(ctx.status(args.projectPlanErrorStatus));
          }
          return res(ctx.json(ProjectPlanFactory.build()));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/rigs/`,
        (req, res, ctx) => {
          if (args.projectRigsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.projectRigsError) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json(
              CustomRigListFactory.buildList(args.projectRigsNumResults),
            ),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/wells/`,
        (req, res, ctx) => {
          if (args.projectWellsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.projectWellsError) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json(
              CustomWellListFactory.buildList(args.projectWellsNumResults),
            ),
          );
        },
      ),
    ],
  },
};
