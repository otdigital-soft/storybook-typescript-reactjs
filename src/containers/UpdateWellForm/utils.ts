import { FormValues } from './types';
import {
  CustomWellDetails,
  ExtensionSectionMudTypeEnum,
  MetoceanDataEnum,
  PnaEnum,
  WellSeasonEnum,
  Type357Enum,
  UpdateCustomWell,
} from 'api/schema';

export const getInitialValues = (data: CustomWellDetails): FormValues => {
  return {
    name: data?.name || '',
    type: data?.type ? (data.type as Type357Enum) : null,
    top_hole: data?.top_hole ? (data.top_hole as PnaEnum) : null,
    transport_section: data?.transport_section
      ? (data.transport_section as PnaEnum)
      : null,
    reservoir_section: data?.reservoir_section
      ? (data.reservoir_section as PnaEnum)
      : null,
    completion: data?.completion ? (data.completion as PnaEnum) : null,
    pna: data?.pna ? (data.pna as PnaEnum) : null,
    season: data?.season ? (data.season as WellSeasonEnum) : null,
    water_depth: data?.water_depth ?? '',
    metocean_data: data?.metocean_data
      ? (data.metocean_data as MetoceanDataEnum)
      : null,
    metocean_days_above_hs_5: data?.metocean_days_above_hs_5 ?? '',
    planned_time_per_well: data?.planned_time_per_well ?? '',
    tvd_from_msl: data?.tvd_from_msl ?? '',
    md_from_msl: data?.md_from_msl ?? '',
    expected_reservoir_pressure: data?.expected_reservoir_pressure ?? '',
    expected_reservoir_temperature: data?.expected_reservoir_temperature ?? '',
    top_hole_section_hole_size: data?.top_hole_section_hole_size ?? '',
    surface_casing_section_hole_size:
      data?.surface_casing_section_hole_size ?? '',
    intermediate_casing_section_hole_size:
      data?.intermediate_casing_section_hole_size ?? '',
    production_casing_section_hole_size:
      data?.production_casing_section_hole_size ?? '',
    extension_section_hole_size: data?.extension_section_hole_size ?? '',
    intermediate_casing_section_mud_type:
      data?.intermediate_casing_section_mud_type
        ? (data.intermediate_casing_section_mud_type as ExtensionSectionMudTypeEnum)
        : null,
    production_casing_section_mud_type: data?.production_casing_section_mud_type
      ? (data.production_casing_section_mud_type as ExtensionSectionMudTypeEnum)
      : null,
    extension_section_mud_type: data?.extension_section_mud_type
      ? (data.extension_section_mud_type as ExtensionSectionMudTypeEnum)
      : null,
    intermediate_casing_section_mud_density:
      data?.intermediate_casing_section_mud_density ?? '',
    production_casing_section_mud_density:
      data?.production_casing_section_mud_density ?? '',
    extension_section_mud_density: data?.extension_section_mud_density ?? '',
    conductor_size: data?.conductor_size ?? '',
    conductor_weight: data?.conductor_weight ?? '',
    conductor_tvd_shoe_depth: data?.conductor_tvd_shoe_depth ?? '',
    conductor_md_shoe_depth: data?.conductor_md_shoe_depth ?? '',
    surface_casing_size: data?.surface_casing_size ?? '',
    surface_casing_weight: data?.surface_casing_weight ?? '',
    surface_casing_tvd_shoe_depth: data?.surface_casing_tvd_shoe_depth ?? '',
    surface_casing_md_shoe_depth: data?.surface_casing_md_shoe_depth ?? '',
    intermediate_casing_size: data?.intermediate_casing_size ?? '',
    intermediate_casing_weight: data?.intermediate_casing_weight ?? '',
    intermediate_casing_tvd_shoe_depth:
      data?.intermediate_casing_tvd_shoe_depth ?? '',
    intermediate_casing_md_shoe_depth:
      data?.intermediate_casing_md_shoe_depth ?? '',
    production_casing_size: data?.production_casing_size ?? '',
    production_casing_weight: data?.production_casing_weight ?? '',
    production_casing_tvd_shoe_depth:
      data?.production_casing_tvd_shoe_depth ?? '',
    production_casing_md_shoe_depth:
      data?.production_casing_md_shoe_depth ?? '',
    liner_other_size: data?.liner_other_size ?? '',
    liner_other_weight: data?.liner_other_weight ?? '',
    liner_other_tvd_shoe_depth: data?.liner_other_tvd_shoe_depth ?? '',
    liner_other_md_shoe_depth: data?.liner_other_md_shoe_depth ?? '',
    no_well_to_be_completed: data?.no_well_to_be_completed ?? '',
    planned_time_per_completion_operation:
      data?.planned_time_per_completion_operation ?? '',
    subsea_xmas_tree_size: data?.subsea_xmas_tree_size ?? '',
    xt_weight: data?.xt_weight ?? '',
    lrp_size: data?.lrp_size ?? '',
    lrp_weight: data?.lrp_weight ?? '',
    xt_running_tool_size: data?.xt_running_tool_size ?? '',
    xt_running_tool_weight: data?.xt_running_tool_weight ?? '',
  };
};

const normalizeEmptyString = (value: number | '') => {
  return value !== '' ? Number(value) : null;
};

export const normalizeFormValues = (
  values: FormValues,
): Omit<UpdateCustomWell, 'draft'> => {
  return {
    // General
    name: values.name,
    type: values.type || '',
    top_hole: values.top_hole || '',
    transport_section: values.transport_section || '',
    reservoir_section: values.reservoir_section || '',
    completion: values.completion || '',
    pna: values.pna || '',
    season: values.season || '',
    water_depth: Number(values.water_depth),
    metocean_data: values.metocean_data || '',
    metocean_days_above_hs_5: Number(values.metocean_days_above_hs_5),
    tvd_from_msl: Number(values.tvd_from_msl),
    // Drilling settings (optional)
    planned_time_per_well: normalizeEmptyString(values.planned_time_per_well),
    md_from_msl: normalizeEmptyString(values.md_from_msl),
    expected_reservoir_pressure: normalizeEmptyString(
      values.expected_reservoir_pressure,
    ),
    intermediate_casing_section_mud_type:
      values.intermediate_casing_section_mud_type || '',
    production_casing_section_mud_type:
      values.production_casing_section_mud_type || '',
    extension_section_mud_type: values.extension_section_mud_type || '',
    expected_reservoir_temperature: normalizeEmptyString(
      values.expected_reservoir_temperature,
    ),
    top_hole_section_hole_size: normalizeEmptyString(
      values.top_hole_section_hole_size,
    ),
    surface_casing_section_hole_size: normalizeEmptyString(
      values.surface_casing_section_hole_size,
    ),
    intermediate_casing_section_hole_size: normalizeEmptyString(
      values.intermediate_casing_section_hole_size,
    ),
    production_casing_section_hole_size: normalizeEmptyString(
      values.production_casing_section_hole_size,
    ),
    extension_section_hole_size: normalizeEmptyString(
      values.extension_section_hole_size,
    ),
    intermediate_casing_section_mud_density: normalizeEmptyString(
      values.intermediate_casing_section_mud_density,
    ),
    production_casing_section_mud_density: normalizeEmptyString(
      values.production_casing_section_mud_density,
    ),
    extension_section_mud_density: normalizeEmptyString(
      values.extension_section_mud_density,
    ),
    conductor_size: normalizeEmptyString(values.conductor_size),
    conductor_weight: normalizeEmptyString(values.conductor_weight),
    conductor_tvd_shoe_depth: normalizeEmptyString(
      values.conductor_tvd_shoe_depth,
    ),
    conductor_md_shoe_depth: normalizeEmptyString(
      values.conductor_md_shoe_depth,
    ),
    surface_casing_size: normalizeEmptyString(values.surface_casing_size),
    surface_casing_weight: normalizeEmptyString(values.surface_casing_weight),
    surface_casing_tvd_shoe_depth: normalizeEmptyString(
      values.surface_casing_tvd_shoe_depth,
    ),
    surface_casing_md_shoe_depth: normalizeEmptyString(
      values.surface_casing_md_shoe_depth,
    ),
    intermediate_casing_size: normalizeEmptyString(
      values.intermediate_casing_size,
    ),
    intermediate_casing_weight: normalizeEmptyString(
      values.intermediate_casing_weight,
    ),
    intermediate_casing_tvd_shoe_depth: normalizeEmptyString(
      values.intermediate_casing_tvd_shoe_depth,
    ),
    intermediate_casing_md_shoe_depth: normalizeEmptyString(
      values.intermediate_casing_md_shoe_depth,
    ),
    production_casing_size: normalizeEmptyString(values.production_casing_size),
    production_casing_weight: normalizeEmptyString(
      values.production_casing_weight,
    ),
    production_casing_tvd_shoe_depth: normalizeEmptyString(
      values.production_casing_tvd_shoe_depth,
    ),
    production_casing_md_shoe_depth: normalizeEmptyString(
      values.production_casing_md_shoe_depth,
    ),
    liner_other_size: normalizeEmptyString(values.liner_other_size),
    liner_other_weight: normalizeEmptyString(values.liner_other_weight),
    liner_other_tvd_shoe_depth: normalizeEmptyString(
      values.liner_other_tvd_shoe_depth,
    ),
    liner_other_md_shoe_depth: normalizeEmptyString(
      values.liner_other_md_shoe_depth,
    ),
    // Completion data
    no_well_to_be_completed: normalizeEmptyString(
      values.no_well_to_be_completed,
    ),
    planned_time_per_completion_operation: normalizeEmptyString(
      values.planned_time_per_completion_operation,
    ),
    subsea_xmas_tree_size: normalizeEmptyString(values.subsea_xmas_tree_size),
    xt_weight: normalizeEmptyString(values.xt_weight),
    lrp_size: normalizeEmptyString(values.lrp_size),
    lrp_weight: normalizeEmptyString(values.lrp_weight),
    xt_running_tool_size: normalizeEmptyString(values.xt_running_tool_size),
    xt_running_tool_weight: normalizeEmptyString(values.xt_running_tool_weight),
  };
};

export const emptyValues: FormValues = {
  name: '',
  type: null,
  top_hole: null,
  transport_section: null,
  reservoir_section: null,
  completion: null,
  pna: null,
  season: null,
  water_depth: '',
  metocean_data: null,
  metocean_days_above_hs_5: '',
  planned_time_per_well: '',
  tvd_from_msl: '',
  md_from_msl: '',
  expected_reservoir_pressure: '',
  expected_reservoir_temperature: '',
  top_hole_section_hole_size: '',
  surface_casing_section_hole_size: '',
  intermediate_casing_section_hole_size: '',
  production_casing_section_hole_size: '',
  extension_section_hole_size: '',
  intermediate_casing_section_mud_type: null,
  production_casing_section_mud_type: null,
  extension_section_mud_type: null,
  intermediate_casing_section_mud_density: '',
  production_casing_section_mud_density: '',
  extension_section_mud_density: '',
  conductor_size: '',
  conductor_weight: '',
  conductor_tvd_shoe_depth: '',
  conductor_md_shoe_depth: '',
  surface_casing_size: '',
  surface_casing_weight: '',
  surface_casing_tvd_shoe_depth: '',
  surface_casing_md_shoe_depth: '',
  intermediate_casing_size: '',
  intermediate_casing_weight: '',
  intermediate_casing_tvd_shoe_depth: '',
  intermediate_casing_md_shoe_depth: '',
  production_casing_size: '',
  production_casing_weight: '',
  production_casing_tvd_shoe_depth: '',
  production_casing_md_shoe_depth: '',
  liner_other_size: '',
  liner_other_weight: '',
  liner_other_tvd_shoe_depth: '',
  liner_other_md_shoe_depth: '',
  no_well_to_be_completed: '',
  planned_time_per_completion_operation: '',
  subsea_xmas_tree_size: '',
  xt_weight: '',
  lrp_size: '',
  lrp_weight: '',
  xt_running_tool_size: '',
  xt_running_tool_weight: '',
};
