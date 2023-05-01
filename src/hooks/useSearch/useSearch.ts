import { useQuery } from 'react-query';
import tenantsServices from 'api/services/tenants';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import usePagination, {
  PaginationParams,
} from 'hooks/usePagination/usePagination';

const useSearch = ({
  query,
  enabled,
  ...paginationParams
}: {
  query: string;
  enabled?: boolean;
} & Omit<PaginationParams, 'initialOrdering'>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ordering, changeOrdering, ...pagination } =
    usePagination(paginationParams);
  const { page, pageSize } = pagination;
  const { tenantId } = useTenant();
  const queryResult = useQuery(
    tenantId
      ? tenantsQueryKeys.search({
          tenantId,
          page,
          pageSize,
          query,
        })
      : [],
    tenantId
      ? () =>
          tenantsServices.search({
            tenantId,
            page,
            pageSize,
            query,
          })
      : noop,
    {
      enabled: !!tenantId && (enabled === undefined ? true : enabled),
      staleTime: 0,
    },
  );
  return {
    ...pagination,
    ...queryResult,
  };
};

export default useSearch;
