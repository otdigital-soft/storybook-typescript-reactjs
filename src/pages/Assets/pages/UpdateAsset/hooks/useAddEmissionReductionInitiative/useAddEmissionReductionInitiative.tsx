import {
  BaselineMode,
  BaselinePhase,
  EmissionReductionInitiativeDetails,
  TenantsService,
} from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/EmissionReductionInitiativeForm';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useUpdateEmissionReductionInitiativeDetailsCache from '../useUpdateEmissionReductionInitiativeDetailsCache';
import useInvalidateBaselineCache from 'hooks/useInvalidateBaselineCache';

const useAddEmissionReductionInitiative = ({
  onSuccess,
  assetId,
  baselineId,
  emissionManagementPlanId,
  phases,
  modes,
}: {
  onSuccess: () => void;
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlanId: number | undefined;
  modes: BaselineMode[];
  phases: BaselinePhase[];
}) => {
  const { tenantId } = useTenant();

  const updateEmissionReductionInitiativeDetailsCache =
    useUpdateEmissionReductionInitiativeDetailsCache();
  const { invalidateBaselineCache } = useInvalidateBaselineCache();

  const addEmissionReductionInitiative = useMutation<
    EmissionReductionInitiativeDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesCreateCreate(
          assetId,
          Number(baselineId),
          Number(emissionManagementPlanId),
          Number(tenantId),
          normalizeFormValues({
            values,
            modes,
            phases,
          }),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        await updateEmissionReductionInitiativeDetailsCache({
          assetId,
          baselineId: Number(baselineId),
          emissionManagementPlanId: Number(emissionManagementPlanId),
          data,
        });
        await invalidateBaselineCache(assetId, Number(baselineId));

        notification.success({
          message: 'Added energy reduction initiative',
          description: (
            <>
              Energy reduction initiative <strong>{data.name}</strong> has been
              added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new energy reduction initiative. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to add a new EmissionReductionInitiative for EmissionManagementPlan(id=${emissionManagementPlanId}).`,
          error,
          values,
        );
      },
    },
  );
  return {
    initialValues: getInitialValues({
      phases,
      modes,
    }),
    validationSchema: schema,
    addEmissionReductionInitiative,
  };
};

export default useAddEmissionReductionInitiative;
