import {
  PlannedVesselUseList,
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
} from 'pages/Wells/containers/VesselForm';
import useInvalidateWellPlannedPlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellPlannedPlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

const useEditPlannedVessel = ({
  wellPlanId,
  vesselUse,
  onSuccess,
}: {
  wellPlanId: number;
  vesselUse?: PlannedVesselUseList;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepsCO2Cache,
  } = useInvalidateWellPlannedPlanCO2Cache();
  const editPlannedVesselMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsPlannedVesselUsesUpdateUpdate(
          Number(vesselUse?.id),
          Number(tenantId),
          wellPlanId,
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data, { values }) => {
        setWellPlanData(data);
        const vesselType = data.planned_vessel_uses.find(
          (plannedVesselUse) =>
            plannedVesselUse.vessel_type.id === values.vessel_type,
        )?.vessel_type.type;
        notification.success({
          message: 'Updated vessel',
          description: (
            <>
              Vessel <strong>{vesselType}</strong> has been updated.
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
          'Unable to update vessel. Please try later.',
        );

        Logger.error(
          `Unable to update PlannedVesselUse(id=${vesselUse?.id}) to WellPlanner(id=${wellPlanId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(vesselUse),
    validationSchema: schema,
    editPlannedVesselUseMutation: editPlannedVesselMutation,
  };
};

export default useEditPlannedVessel;
