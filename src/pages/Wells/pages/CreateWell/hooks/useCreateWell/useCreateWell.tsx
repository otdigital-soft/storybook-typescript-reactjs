import {
  TenantsService,
  WellPlannerDetails,
  WellPlannerWellTypeEnum,
} from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { WellPlanStep } from 'pages/WellPlan/consts';
import {
  FormValues,
  getInitialValues,
  schema,
} from 'pages/Wells/containers/WellDetailsForm';
import { useMutation } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useUpdateWellDetailsCache from 'pages/Wells/hooks/useUpdateWellDetailsCache';
import { notification } from 'antd';
import useCompleteAssets from 'hooks/useCompleteAssets';
import useWellNames from 'pages/Wells/hooks/useWellNames';

const useCreateWell = () => {
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const updateWellDetailsCache = useUpdateWellDetailsCache();
  const { error: assetsError, isLoading: isLoadingAssets } =
    useCompleteAssets();
  const { error: wellNamesError, isLoading: isLoadingWellNames } =
    useWellNames();
  const { mutateAsync: onSubmit } = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } = await TenantsService.tenantsEmissionsWellsCreateCreate(
        Number(tenantId),
        {
          name: Number(values.name),
          sidetrack: values.sidetrack,
          description: values.description,
          field: values.field,
          location: values.location,
          type: values.type as WellPlannerWellTypeEnum,
          asset: Number(values.asset),
          fuel_type: values.fuel_type,
          fuel_density: Number(values.fuel_density),
          co2_per_fuel: Number(values.co2_per_fuel),
          nox_per_fuel: Number(values.nox_per_fuel),
          co2_tax: Number(values.co2_tax),
          nox_tax: Number(values.nox_tax),
          fuel_cost: Number(values.fuel_cost),
          boilers_co2_per_fuel: Number(values.boilers_co2_per_fuel),
          boilers_nox_per_fuel: Number(values.boilers_nox_per_fuel),
        },
      );

      return data;
    },
    {
      onSuccess: async (data) => {
        notification.success({
          message: 'Created well',
          description: (
            <>
              Well "<strong>{data.name.name}</strong>" has been created.
            </>
          ),
        });
        await updateWellDetailsCache(data.id, data);
        navigate(
          generatePath(routes.updateWellPlanStep, {
            wellPlanId: String(data.id),
            stepId: WellPlanStep.Planning,
          }),
        );
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save well details. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        if (!isBadRequest(error)) {
          Logger.error('Unable to create a new well.', error, values);
        }
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    onSubmit,
    isLoading: isLoadingAssets || isLoadingWellNames,
    error: assetsError || wellNamesError,
  };
};

export default useCreateWell;
