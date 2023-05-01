import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/antd.less';
import './manrope.css';
import axios from 'axios';
import { ConfigProvider as PhoneCountryProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import * as Sentry from '@sentry/react';
import Logger from 'utils/logger';
import GlobalStyle from 'style/GlobalStyle';
import { notification } from 'antd';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      Logger.error('Unable to query data', error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      retry: (failureCount: number, error: unknown) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          // don't retry 4xx errors
          return false;
        }
        // retry 3 times
        return failureCount < 3;
      },
    },
  },
});

notification.config({
  placement: 'center',
  duration: 3,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PhoneCountryProvider locale={en}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routing />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </PhoneCountryProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
