import * as yup from 'yup';
import { FormValues } from 'containers/UpdateWellForm/types';
import { WELL_LABELS as labels } from 'consts/wells';
import { UpdateDraftWellFormStep } from 'containers/UpdateDraftWellForm/useUpdateDraftWellForm';
import { WellFormStep } from 'containers/CreateWellForm/consts';
import { numberSchema, stringSchema } from 'utils/yup';

export const generalInformationStepSchema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    name: stringSchema(labels.name, {
      required: true,
      max: 255,
    }),
    type: stringSchema(labels.type, { nullable: true }),
    top_hole: stringSchema(labels.top_hole, { nullable: true }),
    transport_section: stringSchema(labels.transport_section, {
      nullable: true,
    }),
    reservoir_section: stringSchema(labels.reservoir_section, {
      nullable: true,
    }),
    completion: stringSchema(labels.completion, { nullable: true }),
    pna: stringSchema(labels.pna, { nullable: true }),
    season: stringSchema(labels.season, { nullable: true }),
    water_depth: numberSchema(labels.water_depth, {
      min: 0,
      max: 10000,
      integer: true,
    }),
    metocean_data: stringSchema(labels.metocean_data, {
      nullable: true,
    }),
    metocean_days_above_hs_5: numberSchema(labels.metocean_days_above_hs_5, {
      min: 0,
      max: 30,
    }),
    tvd_from_msl: numberSchema(labels.tvd_from_msl, {
      min: 0,
      max: 20000,
      integer: true,
    }),
  })
  .required();

export const drillingSettingsStepSchema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    planned_time_per_well: numberSchema(labels.planned_time_per_well, {
      min: 0,
      max: 365,
    }),
    md_from_msl: numberSchema(labels.md_from_msl, {
      min: 0,
      max: 20000,
      integer: true,
    }),
    expected_reservoir_pressure: numberSchema(
      labels.expected_reservoir_pressure,
      {
        min: 0,
        max: 25000,
        integer: true,
      },
    ),
    expected_reservoir_temperature: numberSchema(
      labels.expected_reservoir_temperature,
      {
        min: 0,
        max: 200,
      },
    ),
    top_hole_section_hole_size: numberSchema(
      labels.top_hole_section_hole_size,
      {
        min: 0,
        max: 100,
      },
    ),
    surface_casing_section_hole_size: numberSchema(
      labels.surface_casing_section_hole_size,
      {
        min: 0,
        max: 100,
      },
    ),
    intermediate_casing_section_hole_size: numberSchema(
      labels.intermediate_casing_section_hole_size,
      {
        min: 0,
        max: 100,
      },
    ),
    production_casing_section_hole_size: numberSchema(
      labels.production_casing_section_hole_size,
      {
        min: 0,
        max: 100,
      },
    ),
    extension_section_hole_size: numberSchema(
      labels.extension_section_hole_size,
      {
        min: 0,
        max: 100,
      },
    ),
    intermediate_casing_section_mud_type: stringSchema(
      labels.intermediate_casing_section_mud_type,
      { nullable: true },
    ),
    production_casing_section_mud_type: stringSchema(
      labels.production_casing_section_mud_type,
      { nullable: true },
    ),
    extension_section_mud_type: stringSchema(
      labels.extension_section_mud_type,
      { nullable: true },
    ),
    intermediate_casing_section_mud_density: numberSchema(
      labels.intermediate_casing_section_mud_density,
      {
        min: 0,
        max: 15,
      },
    ),
    production_casing_section_mud_density: numberSchema(
      labels.production_casing_section_mud_density,
      {
        min: 0,
        max: 15,
      },
    ),
    extension_section_mud_density: numberSchema(
      labels.extension_section_mud_density,
      {
        min: 0,
        max: 15,
      },
    ),
    conductor_size: numberSchema(labels.conductor_size, {
      min: 0,
      max: 100,
    }),
    conductor_weight: numberSchema(labels.conductor_weight, {
      min: 0,
      max: 1000,
    }),
    conductor_tvd_shoe_depth: numberSchema(labels.conductor_tvd_shoe_depth, {
      min: 0,
      max: 1000,
    }),
    conductor_md_shoe_depth: numberSchema(labels.conductor_md_shoe_depth, {
      min: 0,
      max: 1000,
    }),
    surface_casing_size: numberSchema(labels.surface_casing_size, {
      min: 0,
      max: 100,
    }),
    surface_casing_weight: numberSchema(labels.surface_casing_weight, {
      min: 0,
      max: 1000,
    }),
    surface_casing_tvd_shoe_depth: numberSchema(
      labels.surface_casing_tvd_shoe_depth,
      {
        min: 0,
        max: 10000,
        integer: true,
      },
    ),
    surface_casing_md_shoe_depth: numberSchema(
      labels.surface_casing_md_shoe_depth,
      {
        min: 0,
        max: 10000,
        integer: true,
      },
    ),
    intermediate_casing_size: numberSchema(labels.intermediate_casing_size, {
      min: 0,
      max: 100,
    }),
    intermediate_casing_weight: numberSchema(
      labels.intermediate_casing_weight,
      {
        min: 0,
        max: 1000,
      },
    ),
    intermediate_casing_tvd_shoe_depth: numberSchema(
      labels.intermediate_casing_tvd_shoe_depth,
      {
        min: 0,
        max: 20000,
        integer: true,
      },
    ),
    intermediate_casing_md_shoe_depth: numberSchema(
      labels.intermediate_casing_md_shoe_depth,
      {
        min: 0,
        max: 20000,
        integer: true,
      },
    ),
    production_casing_size: numberSchema(labels.production_casing_size, {
      min: 0,
      max: 100,
    }),
    production_casing_weight: numberSchema(labels.production_casing_weight, {
      min: 0,
      max: 1000,
    }),
    production_casing_tvd_shoe_depth: numberSchema(
      labels.production_casing_tvd_shoe_depth,
      {
        min: 0,
        max: 20000,
        integer: true,
      },
    ),
    production_casing_md_shoe_depth: numberSchema(
      labels.production_casing_md_shoe_depth,
      {
        min: 0,
        max: 20000,
        integer: true,
      },
    ),
    liner_other_size: numberSchema(labels.liner_other_size, {
      min: 0,
      max: 100,
    }),
    liner_other_weight: numberSchema(labels.liner_other_weight, {
      min: 0,
      max: 1000,
    }),
    liner_other_tvd_shoe_depth: numberSchema(
      labels.liner_other_tvd_shoe_depth,
      {
        min: 0,
        max: 20000,
        integer: true,
      },
    ),
    liner_other_md_shoe_depth: numberSchema(labels.liner_other_md_shoe_depth, {
      min: 0,
      max: 20000,
      integer: true,
    }),
  })
  .required();

export const additionalDataStepSchema: yup.SchemaOf<FormValues> = yup
  .object()
  .shape({
    no_well_to_be_completed: numberSchema(labels.no_well_to_be_completed, {
      min: 0,
      max: 100,
      integer: true,
    }),
    planned_time_per_completion_operation: numberSchema(
      labels.planned_time_per_completion_operation,
      {
        min: 0,
        max: 100,
      },
    ),
    subsea_xmas_tree_size: numberSchema(labels.subsea_xmas_tree_size, {
      min: 0,
      max: 500,
    }),
    xt_weight: numberSchema(labels.xt_weight, {
      min: 1,
      max: 100,
    }),
    lrp_size: numberSchema(labels.lrp_size, {
      min: 0,
      max: 500,
    }),
    lrp_weight: numberSchema(labels.lrp_weight, {
      min: 0,
      max: 200,
    }),
    xt_running_tool_size: numberSchema(labels.xt_running_tool_size, {
      min: 0,
      max: 500,
    }),
    xt_running_tool_weight: numberSchema(labels.xt_running_tool_weight, {
      min: 0,
      max: 200,
    }),
  })
  .required();

export const updateDraftWellStepSchemaMap: Record<
  UpdateDraftWellFormStep,
  | typeof generalInformationStepSchema
  | typeof drillingSettingsStepSchema
  | typeof additionalDataStepSchema
> = {
  [WellFormStep.EnterGeneralInformation]: generalInformationStepSchema,
  [WellFormStep.EnterDrillingSettings]: drillingSettingsStepSchema,
  [WellFormStep.EnterAdditionalData]: additionalDataStepSchema,
};
