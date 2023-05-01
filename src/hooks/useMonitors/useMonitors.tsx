import { useQuery } from 'react-query';
import monitorsServices from 'api/services/monitors';
import monitorsQueryKeys from 'api/queryKeys/monitors';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import usePagination from 'hooks/usePagination';
import { PaginationParams } from 'hooks/usePagination/usePagination';

const useMonitors = (paginationParams: PaginationParams) => {
  const pagination = usePagination(paginationParams);
  const { tenantId } = useTenant();
  const { pageSize, ordering, page } = pagination;

  const query = useQuery(
    tenantId
      ? monitorsQueryKeys.monitors({ tenantId, page, pageSize, ordering })
      : [],
    tenantId
      ? () => monitorsServices.monitors({ tenantId, page, pageSize, ordering })
      : noop,
    {
      enabled: !!tenantId,
    },
  );

  return {
    ...query,
    ...pagination,
  };
};

export default useMonitors;
