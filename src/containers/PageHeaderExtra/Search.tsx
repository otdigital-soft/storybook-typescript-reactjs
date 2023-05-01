import { SearchInput } from './Search.styled';
import { generatePath, useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import routes from 'routes';
import useDebounce from 'hooks/useDebounce';
import useSearch from 'hooks/useSearch';
import Box from 'components/Box';
import { AutoComplete } from 'antd';
import { Text, Title } from 'components/Typography';
import useOnSearchResultClick from 'hooks/useOnSearchResultClick';
import { MIN_SEARCH_QUERY_LENGTH } from 'consts/search';
import { SelectProps } from 'rc-select/lib/Select';
import Highlight from 'components/Highlight';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 700);
  const { data: searchResultsData, isLoading: isLoadingSearchResults } =
    useSearch({
      query: debouncedQuery,
      initialPage: 1,
      initialPageSize: 3,
      enabled: debouncedQuery.length >= MIN_SEARCH_QUERY_LENGTH,
    });
  const onSearchResultClick = useOnSearchResultClick();
  const onSearch = useCallback(
    (value: string) => {
      if (value.length >= MIN_SEARCH_QUERY_LENGTH) {
        navigate(
          generatePath(routes.search, {
            query: value,
          }),
        );
      }
    },
    [navigate],
  );
  const options = useMemo(() => {
    if (debouncedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
      return [];
    }
    const selectOptions: SelectProps['options'] =
      searchResultsData?.results?.map((searchResult) => ({
        label: (
          <Text fontSize={10} type="secondary">
            {searchResult.type}
          </Text>
        ),
        options: [
          {
            label: (
              <Text onClick={() => onSearchResultClick(searchResult)}>
                <Highlight
                  needle={debouncedQuery}
                  haystack={searchResult.name}
                />
              </Text>
            ),
          },
        ],
      })) || [];
    if (
      searchResultsData?.count !== undefined &&
      searchResultsData?.results &&
      searchResultsData.count > searchResultsData.results.length
    ) {
      selectOptions.push({
        label: (
          <Box paddingY={16} onClick={() => onSearch(debouncedQuery)}>
            <Title level={5} textAlign="center">
              See all
            </Title>
          </Box>
        ),
      });
    }
    return selectOptions;
  }, [debouncedQuery, onSearch, onSearchResultClick, searchResultsData]);

  return (
    <>
      <AutoComplete options={options} defaultActiveFirstOption={false}>
        <SearchInput
          enterButton="Search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          loading={isLoadingSearchResults}
          onSearch={onSearch}
        />
      </AutoComplete>
    </>
  );
};

export default Search;
