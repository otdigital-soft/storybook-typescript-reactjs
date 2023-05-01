import { useQuery } from 'react-query';
import projectsServices from 'api/services/projects';
import projectsQueryKeys from 'api/queryKeys/projects';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import usePagination, {
  PaginationParams,
} from 'hooks/usePagination/usePagination';

const useElements = (paginationParams: PaginationParams) => {
  const pagination = usePagination(paginationParams);
  const { tenantId } = useTenant();
  const { pageSize, ordering, page } = pagination;

  const query = useQuery(
    tenantId
      ? projectsQueryKeys.elements({ tenantId, page, pageSize, ordering })
      : [],
    tenantId
      ? () => projectsServices.elements({ tenantId, page, pageSize, ordering })
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

export default useElements;
