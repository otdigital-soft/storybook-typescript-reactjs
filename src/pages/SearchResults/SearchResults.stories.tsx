import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { useContext, useEffect, useState } from 'react';
import SearchResults from 'pages/SearchResults';
import { SearchResultFactory } from 'factories';
import { UNSAFE_RouteContext } from 'react-router-dom';

export default {
  title: 'pages/SearchResults',
  component: SearchResults,
} as ComponentMeta<typeof SearchResults>;

let args = {
  count: 15,
  numResults: 5,
  loading: false,
  error: false,
};

const DemoSearchResults = (props: typeof args) => {
  const [key, setKey] = useState(0);
  const routeContext = useContext(UNSAFE_RouteContext);
  useEffect(() => {
    // todo: we should use MemoryRouter instead
    routeContext.matches = [
      {
        params: { query: 'test' },
        pathname: '/dashboard/search/test/',
        pathnameBase: '/dashboard/search/test',
        route: {},
      },
    ];
  }, [routeContext]);
  useEffect(() => {
    args = props;
    setKey((prevKey) => prevKey + 1);
  }, [props]);

  return <SearchResults key={key} />;
};

const Template: ComponentStory<typeof DemoSearchResults> = (props) => (
  <DemoSearchResults {...props} />
);

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/search/`,
        (req, res, ctx) => {
          if (args.loading) {
            return res(ctx.delay('infinite'));
          } else if (args.error) {
            return res(ctx.status(500));
          }
          return res(
            ctx.json({
              count: args.count,
              next: null,
              previous: null,
              results: SearchResultFactory.buildList(args.numResults),
            }),
          );
        },
      ),
    ],
  },
};
