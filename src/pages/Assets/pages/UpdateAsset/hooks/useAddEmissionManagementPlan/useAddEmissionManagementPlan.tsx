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
import useUpdateEmissionManagementPlanDetailsCache from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateEmissionManagementPlanDetailsCache';

const useAddEmissionManagementPlan = ({
  onSuccess,
  assetId,
  baselineId,
}: {
  onSuccess: () => void;
  assetId: number;
  baselineId: number | undefined;
}) => {
  const { tenantId } = useTenant();
  const updateEmissionManagementPlanDetailsCache =
    useUpdateEmissionManagementPlanDetailsCache();
  const addEmissionManagementPlanMutation = useMutation<
    EmissionManagementPlanDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansCreateCreate(
          assetId,
          Number(baselineId),
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (addedEmissionManagementPlan) => {
        await updateEmissionManagementPlanDetailsCache({
          assetId,
          baselineId: Number(baselineId),
          data: addedEmissionManagementPlan,
        });
        notification.success({
          message: 'Added energy management plan',
          description: (
            <>
              Energy management plan{' '}
              <strong>{addedEmissionManagementPlan.name}</strong> has been
              added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new energy management plan. Please try later.',
        );

        Logger.error(
          `Unable to add a new EmissionManagementPlan for Baseline(id=${baselineId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addEmissionManagementPlanMutation,
  };
};

export default useAddEmissionManagementPlan;
