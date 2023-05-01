import { FormValues, LABELS as labels } from './form';
import { booleanSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, { required: true, max: 255 }),
    description: stringSchema(labels.description, { required: true }),
    version: stringSchema(labels.version, { required: true, max: 50 }),
    draft: booleanSchema(labels.draft, { required: true }),
  })
  .required();
