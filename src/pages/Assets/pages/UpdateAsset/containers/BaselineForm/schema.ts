import { FormValues, SeasonFormValues, LABELS as labels } from './form';
import { booleanSchema, numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

const seasonSchema: yup.SchemaOf<SeasonFormValues> = yup
  .object()
  .shape({
    phases: yup.array().of(
      yup
        .number()
        .test('unique', 'Phases need te be unique', (value, context) => {
          const phases = context.parent as number[];
          return phases.filter((phase) => phase === value).length <= 1;
        }),
    ),
    modes: yup.array().of(yup.number()).min(1, 'Add at least one mode'),
    inputs: yup.array().of(
      yup.object().shape({
        modes: yup.array().of(
          yup.object().shape({
            value: numberSchema('Value', {
              required: true,
              min: 0,
            }),
          }),
        ),
      }),
    ),
    transit: numberSchema(labels.transit, { min: 0, required: true }),
  })
  .required();

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, { required: true, max: 255 }),
    description: stringSchema(labels.description, { required: true }),
    draft: booleanSchema(labels.draft, { required: true }),
    summer: seasonSchema,
    winter: seasonSchema,
  })
  .required();
