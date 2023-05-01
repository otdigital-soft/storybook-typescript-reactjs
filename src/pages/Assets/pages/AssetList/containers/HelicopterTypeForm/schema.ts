import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';
import { FormValues, LABELS as labels } from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    type: stringSchema(labels.type, {
      required: true,
      max: 255,
    }),
    fuel_density: numberSchema(labels.fuel_density, {
      required: true,
      nullable: true,
      min: 0,
    }),
    co2_per_fuel: numberSchema(labels.co2_per_fuel, {
      required: true,
      nullable: true,
      min: 0,
    }),
    nox_per_fuel: numberSchema(labels.nox_per_fuel, {
      required: true,
      nullable: true,
      min: 0,
    }),
    fuel_consumption: numberSchema(labels.fuel_consumption, {
      required: true,
      nullable: true,
      min: 0,
    }),
    fuel_cost: numberSchema(labels.fuel_cost, {
      required: true,
      nullable: true,
      min: 0,
    }),
    co2_tax: numberSchema(labels.co2_tax, {
      required: true,
      nullable: true,
      min: 0,
    }),
    nox_tax: numberSchema(labels.nox_tax, {
      required: true,
      nullable: true,
      min: 0,
    }),
  })
  .required();
