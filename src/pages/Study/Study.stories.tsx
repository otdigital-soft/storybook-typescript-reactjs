import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  CustomRigListFactory,
  PlanFactory,
  ProjectDetailsFactory,
  StudyElementListFactory,
  StudyMetricFactory,
} from 'factories';
import { rest } from 'msw';
import Study from 'pages/Study';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/Study',
  component: Study,
} as ComponentMeta<typeof Study>;

let args = {
  projectLoading: false,
  projectError: false,
  projectErrorStatus: 500,
  rigsLoading: false,
  rigsError: false,
  rigsErrorStatus: 500,
  rigsNumElements: 5,
  plansLoading: false,
  plansError: false,
  plansErrorStatus: 500,
  plansNumElements: 5,
  studyElementsLoading: false,
  studyElementsError: false,
  studyElementsErrorStatus: 500,
  studyElementsNumElements: 5,
  studyMetricLoading: false,
  studyMetricError: false,
  studyMetricErrorStatus: 500,
  studyMetricNumElements: 5,
};

const DemoStudy = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useLayoutEffect(() => {
    routeContext.matches = [
      {
        params: { projectId: '2' },
        pathname: '/dashboard/benchmarks/2/',
        pathnameBase: '/dashboard/benchmarks/2',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <Study key={key} />;
};

const Template: ComponentStory<typeof DemoStudy> = (props) => (
  <DemoStudy {...props} />
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
          if (args.rigsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.rigsError) {
            return res(ctx.status(args.rigsErrorStatus));
          }
          return res(
            ctx.json(CustomRigListFactory.buildList(args.rigsNumElements)),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/projects/:projectId/plans/`,
        (req, res, ctx) => {
          if (args.plansLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.plansError) {
            return res(ctx.status(args.plansErrorStatus));
          }
          return res(ctx.json(PlanFactory.buildList(args.plansNumElements)));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/studies/:projectId/elements/`,
        (req, res, ctx) => {
          if (args.studyElementsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.studyElementsError) {
            return res(ctx.status(args.studyElementsErrorStatus));
          }
          return res(
            ctx.json(
              StudyElementListFactory.buildList(args.studyElementsNumElements),
            ),
          );
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/studies/metrics/`,
        (req, res, ctx) => {
          if (args.studyMetricLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.studyMetricError) {
            return res(ctx.status(args.studyMetricErrorStatus));
          }
          return res(
            ctx.json(StudyMetricFactory.buildList(args.studyMetricNumElements)),
          );
        },
      ),
    ],
  },
};
