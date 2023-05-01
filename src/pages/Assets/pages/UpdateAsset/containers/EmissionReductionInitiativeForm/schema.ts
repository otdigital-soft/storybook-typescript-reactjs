import { FormValues, LABELS as labels } from './form';
import { dateSchema, numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, { required: true, max: 255 }),
    description: stringSchema(labels.description, { required: true }),
    type: stringSchema(labels.type, { required: true, nullable: true }),
    vendor: stringSchema(labels.vendor, { required: true, max: 100 }),
    deployment_date: dateSchema(labels.deployment_date, {
      required: true,
      nullable: true,
    }),
    inputs: yup
      .array()
      .of(yup.array().of(numberSchema('Value', { min: 0, required: true }))),
    transit: numberSchema(labels.transit, { min: 0, required: true }),
  })
  .required();
