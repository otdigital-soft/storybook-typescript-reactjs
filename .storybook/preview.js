import 'antd/dist/antd.less';
import '../src/manrope.css';
import { ThemeProvider } from 'styled-components';
import theme from '../src/style/theme';
import GlobalStyle from '../src/style/GlobalStyle';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';

initialize();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  msw: {
    handlers: {
      auth: [
        rest.get(
          `${process.env.REACT_APP_API_BASE_URL}api/tenants/subdomains/:subdomain/`,
          (req, res, ctx) => {
            return res(
              ctx.json({
                id: 1,
                name: 'Test tenant',
                subdomain: 'test.example.com',
              }),
            );
          },
        ),
      ],
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
export const decorators = [
  mswDecorator,
  (Story) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  ),
];
