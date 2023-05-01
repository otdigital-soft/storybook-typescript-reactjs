import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import { WellPlannerList, TenantsService } from 'api/schema';
import { usePaginationProvider } from 'components/PaginationProvider';
import useInvalidateWellsCache from '../useInvalidateWellsCache';

const useDuplicateWell = () => {
  const { tenantId } = useTenant();
  const invalidateWellsCache = useInvalidateWellsCache();
  const pagination = usePaginationProvider();

  const { mutate: onDuplicateWell, isLoading: isDuplicatingWell } = useMutation<
    WellPlannerList,
    Error,
    WellPlannerList
  >(
    async (sourceWell) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsDuplicateCreate(
          Number(tenantId),
          sourceWell.id,
        );

      return data;
    },
    {
      onSuccess: async (_, sourceWell) => {
        notification.success({
          message: 'Duplicated well',
          description: (
            <>
              Well <strong>{sourceWell.name.name}</strong> has been duplicated.
            </>
          ),
        });
        pagination.reset();
        invalidateWellsCache();
      },
      onError: (error, sourceWell) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Well cannot be duplicated right now. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to duplicate the WellPlanner(id=${sourceWell.id}).`,
          error,
          sourceWell,
        );
      },
    },
  );

  return {
    onDuplicateWell,
    isDuplicatingWell,
  };
};

export default useDuplicateWell;
