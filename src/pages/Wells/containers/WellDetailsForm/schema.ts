import { FormValues, LABELS as labels } from './form';
import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: numberSchema(labels.name, { nullable: true, required: true }),
    sidetrack: stringSchema(labels.sidetrack, { max: 255, required: true }),
    description: stringSchema(labels.description),
    field: stringSchema(labels.field, { max: 255, required: true }),
    location: stringSchema(labels.location, { max: 255, required: true }),
    type: stringSchema(labels.type, { required: true, nullable: true }),
    asset: numberSchema(labels.asset, {
      nullable: true,
      required: true,
    }),
    fuel_type: stringSchema(labels.fuel_type, { max: 255, required: true }),
    fuel_density: numberSchema(labels.fuel_density, { min: 0, required: true }),
    co2_per_fuel: numberSchema(labels.co2_per_fuel, { min: 0, required: true }),
    nox_per_fuel: numberSchema(labels.nox_per_fuel, { min: 0, required: true }),
    co2_tax: numberSchema(labels.co2_tax, { min: 0, required: true }),
    nox_tax: numberSchema(labels.nox_tax, { min: 0, required: true }),
    fuel_cost: numberSchema(labels.fuel_cost, { min: 0, required: true }),
    boilers_co2_per_fuel: numberSchema(labels.boilers_co2_per_fuel, {
      min: 0,
      required: true,
    }),
    boilers_nox_per_fuel: numberSchema(labels.boilers_nox_per_fuel, {
      min: 0,
      required: true,
    }),
  })
  .required();
