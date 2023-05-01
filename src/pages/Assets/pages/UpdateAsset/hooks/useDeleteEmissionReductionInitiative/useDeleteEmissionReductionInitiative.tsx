import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import {
  EmissionManagementPlanDetailsInitiative,
  TenantsService,
} from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateBaselineCache from 'hooks/useInvalidateBaselineCache';
import useInvalidateEmissionManagementPlanCache from '../useInvalidateEmissionManagementPlanCache';

const useDeleteEmissionReductionInitiative = ({
  assetId,
  baselineId,
  emissionManagementPlanId,
}: {
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlanId: number | undefined;
}) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const invalidateEmissionManagementPlanCache =
    useInvalidateEmissionManagementPlanCache();
  const { invalidateBaselineCache } = useInvalidateBaselineCache();

  const {
    mutate: deleteEmissionReductionInitiative,
    isLoading: isDeletingEmissionReductionInitiative,
  } = useMutation<void, Error, EmissionManagementPlanDetailsInitiative>(
    async (emissionReductionInitiative) => {
      await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesDeleteDestroy(
        assetId,
        Number(baselineId),
        Number(emissionManagementPlanId),
        emissionReductionInitiative.id,
        Number(tenantId),
      );
      return;
    },
    {
      onSuccess: async (_, emissionReductionInitiative) => {
        notification.success({
          message: 'Deleted energy reduction initiative',
          description: (
            <>
              Energy reduction initiative "
              <strong>{emissionReductionInitiative.name}</strong>" has been
              deleted.
            </>
          ),
        });
        invalidateEmissionManagementPlanCache({
          assetId,
          baselineId: Number(baselineId),
          emissionManagementPlanId: Number(emissionManagementPlanId),
        });
        invalidateBaselineCache(assetId, Number(baselineId));
      },
      onError: (error, emissionManagementPlan) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Unable to delete the energy reduction initiative. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to delete the EmissionReductionInitiative(id=${emissionManagementPlan.id})`,
          error,
        );
      },
    },
  );

  const onDeleteEmissionReductionInitiative = useCallback(
    (emissionReductionInitiative: EmissionManagementPlanDetailsInitiative) => {
      Modal.confirm({
        title: 'Delete energy reduction initiative',
        content: (
          <>
            Are you sure you want to delete energy reduction initiative "
            <strong>{emissionReductionInitiative.name}</strong>"?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk: () =>
          deleteEmissionReductionInitiative(emissionReductionInitiative),
      });
    },
    [colors.red, deleteEmissionReductionInitiative],
  );

  return {
    onDeleteEmissionReductionInitiative,
    isDeletingEmissionReductionInitiative,
  };
};

export default useDeleteEmissionReductionInitiative;
