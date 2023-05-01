import React from 'react';
import usePagination, {
  Pagination,
  PaginationParams,
} from 'hooks/usePagination';

interface PaginationProviderProps extends PaginationParams {
  children: React.ReactNode;
}

export const PaginationContext = React.createContext<Pagination | null>(null);

const PaginationProvider = ({
  children,
  ...initialPaginationParams
}: PaginationProviderProps) => {
  const pagination = usePagination(initialPaginationParams);

  return (
    <PaginationContext.Provider value={pagination}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
