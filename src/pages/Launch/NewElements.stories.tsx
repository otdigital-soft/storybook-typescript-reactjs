import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewElements from 'pages/Launch/NewElements';
import { rest } from 'msw';
import { useEffect, useState } from 'react';
import { pickRandom } from 'utils/random';
import { ElementList, ElementListTypeEnum } from 'api/schema';

export default {
  title: 'pages/Launch/NewElements',
  component: NewElements,
} as ComponentMeta<typeof NewElements>;

let args = {
  numResults: 2,
  loading: false,
  error: false,
};

const DemoNewElements = (props: typeof args) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <NewElements key={key} />;
};

const Template: ComponentStory<typeof DemoNewElements> = (props) => (
  <DemoNewElements {...props} />
);

const element: ElementList = {
  id: 1,
  type: pickRandom([
    ElementListTypeEnum.JACKUP_RIG,
    ElementListTypeEnum.SEMI_RIG,
    ElementListTypeEnum.WELL,
  ]),
  name: 'Test Element',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  project: 1,
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/elements/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json({
              count: args.numResults,
              next: null,
              previous: null,
              results: new Array(args.numResults)
                .fill(null)
                .map((_, index) => ({ ...element, id: index })),
            }),
          );
        },
      ),
    ],
  },
};
