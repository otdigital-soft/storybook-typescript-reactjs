import { useQuery } from 'react-query';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import usePagination, {
  PaginationParams,
} from 'hooks/usePagination/usePagination';

const useCustomRigs = (
  params: PaginationParams & {
    latest?: boolean;
    draft?: boolean;
  },
) => {
  const { tenantId } = useTenant();
  const { draft, latest, ...paginationParams } = params;
  const pagination = usePagination(paginationParams);
  const { pageSize, ordering, page } = pagination;

  const query = useQuery(
    tenantId
      ? rigsQueryKeys.customRigs({
          tenantId,
          page,
          pageSize,
          ordering,
          latest,
          draft,
        })
      : [],
    tenantId
      ? () =>
          rigsServices.customRigs({
            tenantId,
            page,
            pageSize,
            ordering,
            latest,
            draft,
          })
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

export default useCustomRigs;
