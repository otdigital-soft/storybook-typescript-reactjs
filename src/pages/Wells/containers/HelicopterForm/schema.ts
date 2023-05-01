import { numberSchema } from 'utils/yup';
import * as yup from 'yup';
import { FormValues, LABELS as labels } from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    helicopter_type: numberSchema(labels.helicopter_type, {
      required: true,
      nullable: true,
    }),
    trips: numberSchema(labels.trips, {
      required: true,
      integer: true,
      moreThan: 0,
    }),
    trip_duration: numberSchema(labels.trip_duration, {
      required: true,
      integer: true,
      moreThan: 0,
    }),
    exposure_against_current_well: numberSchema(
      labels.exposure_against_current_well,
      {
        required: true,
        min: 0,
      },
    ),
    quota_obligation: numberSchema(labels.quota_obligation, {
      required: true,
      min: 0,
    }),
  })
  .required();
