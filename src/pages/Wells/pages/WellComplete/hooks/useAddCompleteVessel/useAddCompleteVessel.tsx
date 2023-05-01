import { TenantsService, WellPlannerDetails } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';

import { notification } from 'antd';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from 'pages/Wells/containers/VesselForm';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

const useAddCompleteVessel = ({
  wellPlanId,
  onSuccess,
}: {
  wellPlanId: number;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { invalidateWellCompletePlanCO2CacheWithoutMeasurements } =
    useInvalidateWellCompletePlanCO2Cache();
  const addCompleteVesselMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsCompleteVesselUsesCreateCreate(
          Number(tenantId),
          wellPlanId,
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data, { values }) => {
        setWellPlanData(data);
        const vesselType = data.complete_vessel_uses.find(
          (vesselUse) => vesselUse.vessel_type.id === values.vessel_type,
        )?.vessel_type.type;
        notification.success({
          message: 'Added vessel',
          description: (
            <>
              Vessel <strong>{vesselType}</strong> has been added.
            </>
          ),
        });
        await invalidateWellCompletePlanCO2CacheWithoutMeasurements(data.id);
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new vessel. Please try later.',
        );

        Logger.error(
          `Unable to add a new complete vessel use to WellPlanner(id=${wellPlanId}).`,
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
    addCompleteVesselMutation,
  };
};

export default useAddCompleteVessel;
