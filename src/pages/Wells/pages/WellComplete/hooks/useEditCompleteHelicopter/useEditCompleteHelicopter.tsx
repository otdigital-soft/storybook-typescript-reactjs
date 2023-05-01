import {
  CompleteHelicopterUseList,
  TenantsService,
  WellPlannerDetails,
} from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';

import { notification } from 'antd';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from 'pages/Wells/containers/HelicopterForm';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

const useEditCompleteHelicopter = ({
  wellPlanId,
  helicopterUse,
  onSuccess,
}: {
  wellPlanId: number;
  helicopterUse?: CompleteHelicopterUseList;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { invalidateWellCompletePlanCO2CacheWithoutMeasurements } =
    useInvalidateWellCompletePlanCO2Cache();
  const editCompleteHelicopterMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsCompleteHelicopterUsesUpdateUpdate(
          Number(helicopterUse?.id),
          Number(tenantId),
          wellPlanId,
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data, { values }) => {
        setWellPlanData(data);
        const helicopterType = data.complete_helicopter_uses.find(
          (completeHelicopterUse) =>
            completeHelicopterUse.helicopter_type.id === values.helicopter_type,
        )?.helicopter_type?.type;
        notification.success({
          message: 'Updated helicopter',
          description: (
            <>
              Helicopter <strong>{helicopterType}</strong> has been updated.
            </>
          ),
        });
        await invalidateWellCompletePlanCO2CacheWithoutMeasurements(data.id);
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update helicopter. Please try later.',
        );

        Logger.error(
          `Unable to update CompleteHelicopterUse(id=${helicopterUse?.id}) to WellPlanner(id=${wellPlanId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(helicopterUse),
    validationSchema: schema,
    editCompleteHelicopterMutation,
  };
};

export default useEditCompleteHelicopter;
