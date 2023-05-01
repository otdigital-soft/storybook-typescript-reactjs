import { useQuery } from 'react-query';
import wellsServices from 'api/services/wells';
import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import usePagination, {
  PaginationParams,
} from 'hooks/usePagination/usePagination';

const useCustomWells = (
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
      ? wellsQueryKeys.customWells({
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
          wellsServices.customWells({
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

export default useCustomWells;
