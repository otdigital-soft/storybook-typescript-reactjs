import * as yup from 'yup';
import { booleanSchema, numberSchema, stringSchema } from 'utils/yup';
import {
  FormValues,
  LABELS as labels,
  MATERIAL_LABELS as materialLabels,
} from './form';

export const schema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    phase: stringSchema(labels.phase, {
      required: true,
      nullable: true,
    }),
    duration: numberSchema(labels.duration, {
      required: true,
      moreThan: 0,
    }),
    waiting_on_weather: numberSchema(labels.waiting_on_weather, {
      required: true,
      min: 0,
    }),
    mode: stringSchema(labels.mode, {
      required: true,
      nullable: true,
    }),
    season: stringSchema(labels.season, {
      required: true,
      nullable: true,
    }),
    well_section_length: numberSchema(labels.well_section_length, {
      required: true,
      min: 0,
    }),
    carbon_capture_storage_system_quantity: numberSchema(
      labels.carbon_capture_storage_system_quantity,
    ),
    emission_reduction_initiatives: yup.array().of(yup.number()).required(),
    external_energy_supply_enabled: booleanSchema(
      labels.external_energy_supply_enabled,
    ),
    external_energy_supply_quota: booleanSchema(
      labels.external_energy_supply_quota,
    ),
    comment: stringSchema(labels.comment),
    materials: yup.array().of(
      yup.object().shape({
        material_category: stringSchema(materialLabels.material_category, {
          required: true,
          nullable: true,
        }),
        material_type: numberSchema(materialLabels.material_type, {
          required: true,
          nullable: true,
        }),
        quantity: numberSchema(materialLabels.quantity, {
          required: true,
          min: 0,
        }),
        quota: booleanSchema(materialLabels.quota, {
          required: true,
        }),
      }),
    ),
  })
  .required();
