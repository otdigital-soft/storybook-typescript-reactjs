import { useCallback, useState } from 'react';
import { Ordering } from 'utils/ordering';

export type PaginationParams = {
  initialPage?: number;
  initialPageSize?: number;
  initialOrdering?: Ordering;
};

export type Pagination = {
  page: number;
  pageSize: number | undefined;
  ordering: Ordering;
  changePage: (page: number) => void;
  changeOrdering: (ordering: Ordering) => void;
  changePageSize: (pageSize: number) => void;
  reset: () => void;
};

const usePagination = ({
  initialPage,
  initialOrdering,
  initialPageSize,
}: PaginationParams): Pagination => {
  const [page, setPage] = useState(initialPage || 1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [ordering, setOrdering] = useState(
    initialOrdering || Ordering.RecentlyAdded,
  );
  const changeOrdering = useCallback((newOrdering: Ordering) => {
    setPage(1);
    setOrdering(newOrdering);
  }, []);
  const changePageSize = useCallback((newPageSize: number) => {
    setPage(1);
    setPageSize(newPageSize);
  }, []);
  const reset = useCallback(() => {
    setPage(initialPage || 1);
    setPageSize(initialPageSize);
    setOrdering(initialOrdering || Ordering.RecentlyAdded);
  }, [initialOrdering, initialPage, initialPageSize]);

  return {
    page,
    pageSize,
    ordering,
    changePage: setPage,
    changeOrdering,
    changePageSize,
    reset,
  };
};

export default usePagination;
