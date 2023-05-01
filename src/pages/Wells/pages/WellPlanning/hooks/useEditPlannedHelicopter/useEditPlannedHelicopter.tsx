import {
  PlannedHelicopterUseList,
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
import useInvalidateWellPlannedPlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellPlannedPlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

const useEditPlannedHelicopter = ({
  wellPlanId,
  helicopterUse,
  onSuccess,
}: {
  wellPlanId: number;
  helicopterUse?: PlannedHelicopterUseList;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepsCO2Cache,
  } = useInvalidateWellPlannedPlanCO2Cache();
  const editPlannedHelicopterMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsPlannedHelicopterUsesUpdateUpdate(
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
        const helicopterType = data.planned_helicopter_uses.find(
          (plannedHelicopterUse) =>
            plannedHelicopterUse.helicopter_type.id === values.helicopter_type,
        )?.helicopter_type.type;
        notification.success({
          message: 'Updated helicopter',
          description: (
            <>
              Helicopter <strong>{helicopterType}</strong> has been updated.
            </>
          ),
        });
        await invalidateWellPlannedPlanCO2Cache(data.id);
        await invalidateWellPlannedStepsCO2Cache(data.id);
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update helicopter. Please try later.',
        );

        Logger.error(
          `Unable to update PlannedHelicopterUse(id=${helicopterUse?.id}) to WellPlanner(id=${wellPlanId}).`,
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
    editPlannedHelicopterMutation,
  };
};

export default useEditPlannedHelicopter;
