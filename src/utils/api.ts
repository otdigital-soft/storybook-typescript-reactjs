import axios, { AxiosError } from 'axios';

export const noop = () => undefined;

const isStatusError = (error: unknown, status: number) => {
  return axios.isAxiosError(error) && error.response?.status === status;
};

export const isNotFoundError = (error: unknown) => {
  return isStatusError(error, 404);
};

export const isForbiddenError = (error: unknown) => {
  return isStatusError(error, 403);
};

export const isBadRequest = (error: unknown) => {
  return isStatusError(error, 400);
};

export const getSubdomain = () => {
  return window.location.hostname;
};

const normalizeField = (field: unknown) =>
  Array.isArray(field) ? field.join(', ') : String(field);

export const apiValidationErrors = (
  error: unknown,
  defaultMessage: string,
): { nonFieldErrors?: string; fieldErrors: Record<string, string> } => {
  if (isStatusError(error, 400)) {
    const detail = (error as AxiosError).response?.data.detail as {
      non_field_errors?: string;
    } & Record<string, unknown>;
    const { non_field_errors, ...fields } = detail;
    return {
      nonFieldErrors: non_field_errors
        ? normalizeField(non_field_errors)
        : undefined,
      fieldErrors: Object.entries(fields).reduce<Record<string, string>>(
        (previousValue, [field, value]) => {
          previousValue[field] = normalizeField(value);
          return previousValue;
        },
        {},
      ),
    };
  }
  return { nonFieldErrors: defaultMessage, fieldErrors: {} };
};
