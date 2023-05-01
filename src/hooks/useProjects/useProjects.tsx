import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import usePagination from 'hooks/usePagination';
import { PaginationParams } from 'hooks/usePagination/usePagination';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

const useProjects = (params: PaginationParams) => {
  const { tenantId } = useTenant();
  const pagination = usePagination(params);
  const { pageSize, ordering, page } = pagination;

  const query = useQuery(
    tenantId
      ? projectsQueryKeys.projects({ tenantId, page, pageSize, ordering })
      : [],
    tenantId
      ? () =>
          projectsServices.projects({
            tenantId,
            page,
            pageSize,
            ordering,
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

export default useProjects;
