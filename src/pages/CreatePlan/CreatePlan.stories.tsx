import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreatePlan from 'pages/CreatePlan';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  CustomRigListFactory,
  CustomWellListFactory,
  ProjectDetailsFactory,
} from 'factories';

export default {
  title: 'pages/CreatePlan',
  component: CreatePlan,
} as ComponentMeta<typeof CreatePlan>;

let args = {
  projectLoading: false,
  projectError: false,
  projectErrorStatus: 500,
  projectWellsLoading: false,
  projectWellsError: false,
  projectWellsNumResults: 5,
  projectRigsLoading: false,
  projectRigsError: false,
  projectRigsNumResults: 5,
};

const DemoCreatePlan = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <CreatePlan key={key} />;
};

const Template: ComponentStory<typeof DemoCreatePlan> = (props) => (
  <DemoCreatePlan {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/`,
        (req, res, ctx) => {
          if (args.projectLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.projectError) {
            return res(ctx.status(args.projectErrorStatus));
          }
          return res(ctx.json(ProjectDetailsFactory.build()));
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
