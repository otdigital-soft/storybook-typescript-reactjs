import { FormValues, LABELS as labels } from './form';
import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, { required: true, max: 255 }),
    type: stringSchema(labels.type, { required: true, nullable: true }),
    green_house_gas_class_notation: stringSchema(
      labels.green_house_gas_class_notation,
      { max: 255 },
    ),
    design_description: stringSchema(labels.design_description, {
      required: true,
    }),
    draft: numberSchema(labels.draft, {
      required: true,
    }),
    external_energy_supply: yup
      .object()
      .shape({
        type: stringSchema(labels.external_energy_supply.type, {
          required: true,
          max: 255,
        }),
        capacity: numberSchema(labels.external_energy_supply.capacity, {
          required: true,
          nullable: true,
          min: 0,
        }),
        co2: numberSchema(labels.external_energy_supply.co2, {
          required: true,
          nullable: true,
          min: 0,
        }),
        nox: numberSchema(labels.external_energy_supply.nox, {
          required: true,
          nullable: true,
          min: 0,
        }),
        generator_efficiency_factor: numberSchema(
          labels.external_energy_supply.generator_efficiency_factor,
          {
            required: true,
            nullable: true,
            min: 0,
          },
        ),
      })
      .required(),
  })
  .required();
