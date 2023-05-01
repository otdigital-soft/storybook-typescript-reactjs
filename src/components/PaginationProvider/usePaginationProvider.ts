import { useContext } from 'react';
import { PaginationContext } from './PaginationProvider';

const usePaginationProvider = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      'usePaginationProvider cannot be used outside of PaginationProvider',
    );
  }
  return context;
};

export default usePaginationProvider;
