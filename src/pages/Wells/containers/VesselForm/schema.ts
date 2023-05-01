import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';
import { FormValues, LABELS as labels } from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    vessel_type: numberSchema(labels.vessel_type, {
      required: true,
      nullable: true,
    }),
    duration: numberSchema(labels.duration, {
      required: true,
      moreThan: 0,
    }),
    exposure_against_current_well: numberSchema(
      labels.exposure_against_current_well,
      {
        required: true,
        min: 0,
      },
    ),
    waiting_on_weather: numberSchema(labels.waiting_on_weather, {
      required: true,
      min: 0,
    }),
    season: stringSchema(labels.season, {
      nullable: true,
      required: true,
    }),
    quota_obligation: numberSchema(labels.quota_obligation, {
      required: true,
      min: 0,
    }),
  })
  .required();
