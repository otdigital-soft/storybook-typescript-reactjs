import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  ConceptEMPElementFactory,
  CustomDrillshipDetailsFactory,
  ProjectDetailsFactory,
} from 'factories';
import CreateDrillshipEMP from './CreateDrillshipEMP';
import useMockRoute from 'hooks/useMockRoute';

export default {
  title: 'pages/CreateEMP/CreateDrillshipEMP',
  component: CreateDrillshipEMP,
} as ComponentMeta<typeof CreateDrillshipEMP>;

let args = {
  projectLoading: false,
  projectError: false,
  projectErrorStatus: 500,
  rigLoading: false,
  rigError: false,
  rigErrorStatus: 500,
  empConceptElementsLoading: false,
  empConceptElementsError: false,
  empConceptElementsNumResults: 5,
  empConceptElementsErrorStatus: 500,
};

const DemoCreateDrillshipEMP = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useMockRoute({
    params: { projectId: '1', rigId: '1', rigType: 'drillship' },
    pathname: '/dashboard/prepare/projects/1/rigs/drillship/4/emp/create/',
    pathnameBase: '/dashboard/prepare/projects/1/rigs/drillship/4/emp/create',
    route: {},
  });
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <CreateDrillshipEMP key={key} />;
};

const Template: ComponentStory<typeof DemoCreateDrillshipEMP> = (props) => (
  <DemoCreateDrillshipEMP {...props} />
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
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/rigs/custom/:rigType/:rigId/`,
        (req, res, ctx) => {
          if (args.rigLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.rigError) {
            return res(ctx.status(args.rigErrorStatus));
          }
          return res(ctx.json(CustomDrillshipDetailsFactory.build()));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/emps/`,
        (req, res, ctx) => {
          if (args.empConceptElementsLoading) {
            return res(ctx.delay('infinite'));
          } else if (args.empConceptElementsError) {
            return res(ctx.status(args.empConceptElementsErrorStatus));
          }
          return res(
            ctx.json(
              ConceptEMPElementFactory.buildList(
                args.empConceptElementsNumResults,
              ),
            ),
          );
        },
      ),
    ],
  },
};
