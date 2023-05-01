import { FormValues, LABELS as labels } from './form';
import { stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, { required: true, max: 255 }),
  })
  .required();
