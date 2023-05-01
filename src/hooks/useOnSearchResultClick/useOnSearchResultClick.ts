import { SearchResult } from 'api/schema';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useOnSearchResultClick = () => {
  const navigate = useNavigate();
  return useCallback(
    (result: SearchResult) => {
      return navigate(result.url);
    },
    [navigate],
  );
};

export default useOnSearchResultClick;
