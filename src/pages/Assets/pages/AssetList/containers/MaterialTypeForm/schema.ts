import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';
import { FormValues, LABELS as labels } from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    category: stringSchema(labels.type, {
      required: true,
      nullable: true,
    }),
    type: stringSchema(labels.type, {
      required: true,
      max: 255,
    }),
    unit: stringSchema(labels.unit, {
      required: true,
      max: 255,
    }),
    co2: numberSchema(labels.co2, {
      required: true,
      nullable: true,
      min: 0,
    }),
  })
  .required();
