import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Content, Header } from 'components/Layout';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import useBack from 'hooks/useBack';
import Box, { Flexbox } from 'components/Box';
import { Button, List } from 'antd';
import { Text, Title } from 'components/Typography';
import Pagination from 'components/Pagination';
import Result from 'components/Result';
import routes from 'routes';
import { NOTIFICATION_LIST_PAGE_SIZE } from 'consts';
import { generatePath, useParams } from 'react-router-dom';
import useSearch from 'hooks/useSearch/useSearch';
import useOnSearchResultClick from 'hooks/useOnSearchResultClick';
import { MIN_SEARCH_QUERY_LENGTH } from 'consts/search';
import Highlight from 'components/Highlight';

const SearchResults = () => {
  const { handleBack } = useBack(routes.launch);
  const { query } = useParams<{ query: string }>();
  const breadcrumbRoutes = [
    {
      path: routes.launch,
      breadcrumbName: 'Launch',
    },
    {
      path: generatePath(routes.search, {
        query: String(query),
      }),
      breadcrumbName: 'Search results',
    },
  ];
  const {
    data: searchResultsData,
    error: searchResultsError,
    isLoading: isLoadingSearchResults,
    pageSize,
    page,
    changePage,
  } = useSearch({
    query: String(query),
    initialPage: 1,
    initialPageSize: NOTIFICATION_LIST_PAGE_SIZE,
    enabled: (query || '').length >= MIN_SEARCH_QUERY_LENGTH,
  });
  let content;
  const onSearchResultClick = useOnSearchResultClick();

  if (searchResultsError) {
    content = (
      <Result status="error" subTitle="Unable to load search results" />
    );
  } else {
    content = (
      <>
        <List
          loading={isLoadingSearchResults}
          size="large"
          header={
            searchResultsData
              ? `Results for "${query}": ${searchResultsData.count}`
              : `Results for "${query}"`
          }
          bordered
          dataSource={searchResultsData?.results || []}
          renderItem={(item) => (
            <List.Item
              extra={
                <Button type="link" onClick={() => onSearchResultClick(item)}>
                  <Title color="purple.7" level={5}>
                    Details
                  </Title>
                </Button>
              }
            >
              <Flexbox flexDirection="column" width="100%">
                <Text>{item.type}</Text>
                <Text>
                  <Highlight haystack={item.name} needle={query || ''} />
                </Text>
              </Flexbox>
            </List.Item>
          )}
        />
        <Flexbox marginTop={41} justifyContent="flex-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            hideOnSinglePage
            total={searchResultsData?.count}
            showSizeChanger={false}
            onChange={changePage}
          />
        </Flexbox>
      </>
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Search results"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginY={20} marginX={24}>
          {content}
        </Box>
      </Content>
    </>
  );
};

export default SearchResults;
