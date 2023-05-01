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

const useUpdateEmissionReductionInitiative = ({
  onSuccess,
  assetId,
  baselineId,
  emissionManagementPlanId,
  emissionReductionInitiative,
  phases,
  modes,
}: {
  onSuccess: () => void;
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlanId: number | undefined;
  emissionReductionInitiative: EmissionReductionInitiativeDetails | undefined;
  modes: BaselineMode[];
  phases: BaselinePhase[];
}) => {
  const { tenantId } = useTenant();
  const updateEmissionReductionInitiativeDetailsCache =
    useUpdateEmissionReductionInitiativeDetailsCache();
  const updateEmissionReductionInitiative = useMutation<
    EmissionReductionInitiativeDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesUpdateUpdate(
          assetId,
          Number(baselineId),
          Number(emissionManagementPlanId),
          Number(emissionReductionInitiative?.id),
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
        notification.success({
          message: 'Saved energy reduction initiative',
          description: (
            <>
              Energy reduction initiative <strong>{data.name}</strong> has been
              saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update the energy reduction initiative. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to update the EmissionReductionInitiative(id=${emissionReductionInitiative?.id}).`,
          error,
          values,
        );
      },
    },
  );
  return {
    initialValues: getInitialValues({
      emissionReductionInitiative,
      phases,
      modes,
    }),
    validationSchema: schema,
    updateEmissionReductionInitiative,
  };
};

export default useUpdateEmissionReductionInitiative;
