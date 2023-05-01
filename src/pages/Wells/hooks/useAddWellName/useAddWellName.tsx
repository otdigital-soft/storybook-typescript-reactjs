import { TenantsService, WellNameList } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  schema,
  getInitialValues,
} from '../../containers/WellNameForm';
import { useMutation } from 'react-query';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useWellNamesCache from 'pages/Wells/hooks/useWellNamesCache';

const useAddWellName = ({ onSuccess }: { onSuccess: () => void }) => {
  const { tenantId } = useTenant();
  const { addToCache } = useWellNamesCache();
  const addWellNameMutation = useMutation<
    WellNameList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellNamesCreateCreate(
          Number(tenantId),
          {
            name: values.name,
          },
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        addToCache(data, { compareFn: (a, b) => a.name.localeCompare(b.name) });
        notification.success({
          message: 'Added well name',
          description: (
            <>
              Well name <strong>{data.name}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new well name. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);

        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to add a new well name for Tenant(id=${tenantId}).`,
            error,
            values,
          );
        }
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addWellNameMutation,
  };
};

export default useAddWellName;
