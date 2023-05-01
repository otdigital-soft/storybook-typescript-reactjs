import * as yup from 'yup';
import { numberSchema, stringSchema } from 'utils/yup';
import { FormValues, labels } from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, {
      required: true,
      max: 255,
    }),
    description: stringSchema(labels.description, {
      required: true,
    }),
    block_name: stringSchema(labels.block_name, {
      required: true,
      max: 255,
    }),
    distance_from_tug_base_to_previous_well: numberSchema(
      labels.distance_from_tug_base_to_previous_well,
      {
        required: true,
        min: 0,
        max: 10000,
      },
    ),
    reference_rig: stringSchema(labels.reference_rig, {
      required: true,
      nullable: true,
    }),
    addedWells: yup.array().of(
      yup.object().shape({
        distance_from_previous_location: numberSchema(
          labels.distance_from_previous_location,
          {
            required: true,
            min: 0,
            max: 10000,
          },
        ),
        distance_to_helicopter_base: numberSchema(
          labels.distance_to_helicopter_base,
          {
            required: true,
            min: 0,
            max: 10000,
          },
        ),
        distance_to_psv_base: numberSchema(labels.distance_to_psv_base, {
          required: true,
          min: 0,
          max: 10000,
        }),
        distance_to_ahv_base: numberSchema(labels.distance_to_ahv_base, {
          required: true,
          min: 0,
          max: 10000,
        }),
        distance_to_tug_base: numberSchema(labels.distance_to_tug_base, {
          required: true,
          min: 0,
          max: 10000,
        }),
        jackup_positioning_time: numberSchema(labels.jackup_positioning_time, {
          required: true,
          min: 0,
          max: 10,
        }),
        semi_positioning_time: numberSchema(labels.semi_positioning_time, {
          required: true,
          min: 0,
          max: 10,
        }),
        operational_time: numberSchema(labels.operational_time, {
          required: true,
          moreThan: 0,
        }),
      }),
    ),
  })
  .required();
