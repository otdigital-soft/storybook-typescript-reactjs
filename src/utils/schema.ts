import * as yup from 'yup';

export const yupDateRequired = (label: string) => {
  return yup
    .date()
    .typeError(`${label} is required`)
    .required(`${label} is required`);
};

export const yupPositiveIntegerRequired = (label: string) => {
  return yup
    .number()
    .typeError(`${label} is required`)
    .integer()
    .min(0, `${label} must be greater than or equal to 0`)
    .required(`${label} is required`);
};

export const yupPositiveNumberRequired = (label: string) => {
  return yup
    .number()
    .typeError(`${label} is required`)
    .min(0, `${label} must be greater than or equal to 0`)
    .required(`${label} is required`);
};
