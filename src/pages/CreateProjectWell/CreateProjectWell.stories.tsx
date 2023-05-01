import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  ConceptWellDetailsFactory,
  ConceptWellListFactory,
  CustomWellDetailsFactory,
  CustomWellListFactory,
  ProjectDetailsFactory,
} from 'factories';
import CreateProjectWell from 'pages/CreateProjectWell';

export default {
  title: 'pages/CreateProjectWell',
  component: CreateProjectWell,
} as ComponentMeta<typeof CreateProjectWell>;

let args = {
  loadingProject: false,
  projectError: false,
  projectErrorStatus: 500,
  customWellsLoading: false,
  customWellsError: false,
  customWellsErrorStatus: 500,
  customWellsNumResults: 10,
  conceptWellsLoading: false,
  conceptWellsError: false,
  conceptWellsErrorStatus: 500,
  conceptWellsNumResults: 5,
  customWellLoading: false,
  customWellError: false,
  customWellErrorStatus: 500,
  conceptWellLoading: false,
  conceptWellError: false,
  conceptWellErrorStatus: 500,
};

const DemoCreateProjectWell = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <CreateProjectWell key={key} />;
};

const Template: ComponentStory<typeof DemoCreateProjectWell> = (props) => (
  <DemoCreateProjectWell {...props} />
);

export const Default = Template.bind({});
Default.args = args;
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
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/custom/`,
        (req, res, ctx) => {
          if (args.customWellsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.customWellsError) {
            return res(ctx.status(args.customWellsErrorStatus));
          }
          return res(
            ctx.json({
              next: null,
              previous: null,
              count: args.customWellsNumResults,
              results: CustomWellListFactory.buildList(
                args.customWellsNumResults,
              ),
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/concept/`,
        (req, res, ctx) => {
          if (args.conceptWellsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.conceptWellsError) {
            return res(ctx.status(args.conceptWellsErrorStatus));
          }
          return res(
            ctx.json({
              next: null,
              previous: null,
              count: args.conceptWellsNumResults,
              results: ConceptWellListFactory.buildList(
                args.conceptWellsNumResults,
              ),
            }),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/custom/:wellId/`,
        (req, res, ctx) => {
          if (args.customWellLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.customWellError) {
            return res(ctx.status(args.customWellErrorStatus));
          }
          return res(ctx.json(CustomWellDetailsFactory.build()));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/wells/concept/:wellId/`,
        (req, res, ctx) => {
          if (args.conceptWellLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.conceptWellError) {
            return res(ctx.status(args.conceptWellErrorStatus));
          }
          return res(ctx.json(ConceptWellDetailsFactory.build()));
        },
      ),
    ],
  },
};
