import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import {
  ConceptEMPElementFactory,
  CustomJackupRigDetailsFactory,
  ProjectDetailsFactory,
} from 'factories';
import CreateJackupEMP from 'pages/CreateEMP/CreateJackupEMP';

export default {
  title: 'pages/CreateEMP/CreateJackupEMP',
  component: CreateJackupEMP,
} as ComponentMeta<typeof CreateJackupEMP>;

let args = {
  projectLoading: false,
  projectError: false,
  projectErrorStatus: 500,
  rigLoading: false,
  rigError: false,
  rigErrorStatus: 500,
  empConceptElementsLoading: false,
  empConceptElementsError: false,
  empConceptElementsErrorStatus: 500,
  empConceptElementsNumResults: 5,
};

const DemoCreateJackupEMP = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <CreateJackupEMP key={key} />;
};

const Template: ComponentStory<typeof DemoCreateJackupEMP> = (props) => (
  <DemoCreateJackupEMP {...props} />
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
          return res(ctx.json(CustomJackupRigDetailsFactory.build()));
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
