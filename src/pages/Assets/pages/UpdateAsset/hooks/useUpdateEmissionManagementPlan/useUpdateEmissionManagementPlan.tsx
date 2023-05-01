import { EmissionManagementPlanDetails, TenantsService } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/EmissionManagementPlanForm';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useUpdateEmissionManagementPlanDetailsCache from '../useUpdateEmissionManagementPlanDetailsCache';

const useUpdateEmissionManagementPlan = ({
  onSuccess,
  baselineId,
  emissionManagementPlan,
  assetId,
}: {
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlan: EmissionManagementPlanDetails | undefined;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const updateEmissionManagementPlanDetailsCache =
    useUpdateEmissionManagementPlanDetailsCache();
  const updateEmissionManagementPlanMutation = useMutation<
    EmissionManagementPlanDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansUpdateUpdate(
          assetId,
          Number(baselineId),
          Number(emissionManagementPlan?.id),
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (updatedEmissionManagementPlan) => {
        await updateEmissionManagementPlanDetailsCache({
          assetId,
          baselineId: Number(baselineId),
          data: updatedEmissionManagementPlan,
        });
        notification.success({
          message: 'Saved energy management plan',
          description: (
            <>
              Energy management plan{' '}
              <strong>{updatedEmissionManagementPlan.name}</strong> has been
              saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the energy management plan. Please try later.',
        );
        Logger.error(
          `Unable to save the EmissionManagementPlan(id=${emissionManagementPlan}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(emissionManagementPlan),
    validationSchema: schema,
    updateEmissionManagementPlanMutation,
  };
};

export default useUpdateEmissionManagementPlan;
