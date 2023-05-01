import wellsServices from 'api/services/wells';
import wellsQueryKeys from 'api/queryKeys/wells';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import { notification } from 'antd';
import { schema } from './schema';
import Logger from 'utils/logger';
import { FormValues } from './types';
import {
  emptyValues,
  getInitialValues,
  normalizeFormValues,
} from 'containers/UpdateWellForm/utils';
import { CustomWellDetails } from 'api/schema';
import { useCallback } from 'react';

const useUpdateWellForm = (well: CustomWellDetails, onSuccess?: () => void) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const initialValues = getInitialValues(well);
  const wellId = well.id;

  const { mutateAsync: onUpdate } = useMutation<
    CustomWellDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return wellsServices.updateCustomWell(tenantId, wellId, {
        ...normalizeFormValues(values),
        draft: false,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        const customWellQueryKey = wellsQueryKeys.customWell(
          Number(tenantId),
          wellId,
        );
        queryClient.setQueryData<CustomWellDetails>(customWellQueryKey, data);

        notification.success({
          message: 'Saved well',
          description: (
            <>
              Well "<strong>{data.name}</strong>" has been saved.
            </>
          ),
        });

        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save a well. Please try later.',
        );

        Logger.error(`Unable to update CustomWell(id=${wellId}).`, error);
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  const onClear = useCallback((formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.resetForm({
      values: emptyValues,
    });
  }, []);

  return {
    schema,
    initialValues,
    onUpdate,
    onClear,
  };
};

export default useUpdateWellForm;
