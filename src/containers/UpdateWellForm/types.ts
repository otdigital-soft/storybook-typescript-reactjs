import {
  ExtensionSectionMudTypeEnum,
  MetoceanDataEnum,
  PnaEnum,
  WellSeasonEnum,
  Type357Enum,
} from 'api/schema';

export type FormValues = {
  // General
  name: string;
  type: Type357Enum | null;
  top_hole: PnaEnum | null;
  transport_section: PnaEnum | null;
  reservoir_section: PnaEnum | null;
  completion: PnaEnum | null;
  pna: PnaEnum | null;
  season: WellSeasonEnum | null;
  water_depth: number | '';
  metocean_data: MetoceanDataEnum | null;
  metocean_days_above_hs_5: number | '';
  // Drilling settings (optional)
  planned_time_per_well: number | '';
  tvd_from_msl: number | '';
  md_from_msl: number | '';
  expected_reservoir_pressure: number | '';
  expected_reservoir_temperature: number | '';
  top_hole_section_hole_size: number | '';
  surface_casing_section_hole_size: number | '';
  intermediate_casing_section_hole_size: number | '';
  production_casing_section_hole_size: number | '';
  extension_section_hole_size: number | '';
  intermediate_casing_section_mud_type: ExtensionSectionMudTypeEnum | null;
  production_casing_section_mud_type: ExtensionSectionMudTypeEnum | null;
  extension_section_mud_type: ExtensionSectionMudTypeEnum | null;
  intermediate_casing_section_mud_density: number | '';
  production_casing_section_mud_density: number | '';
  extension_section_mud_density: number | '';
  conductor_size: number | '';
  conductor_weight: number | '';
  conductor_tvd_shoe_depth: number | '';
  conductor_md_shoe_depth: number | '';
  surface_casing_size: number | '';
  surface_casing_weight: number | '';
  surface_casing_tvd_shoe_depth: number | '';
  surface_casing_md_shoe_depth: number | '';
  intermediate_casing_size: number | '';
  intermediate_casing_weight: number | '';
  intermediate_casing_tvd_shoe_depth: number | '';
  intermediate_casing_md_shoe_depth: number | '';
  production_casing_size: number | '';
  production_casing_weight: number | '';
  production_casing_tvd_shoe_depth: number | '';
  production_casing_md_shoe_depth: number | '';
  liner_other_size: number | '';
  liner_other_weight: number | '';
  liner_other_tvd_shoe_depth: number | '';
  liner_other_md_shoe_depth: number | '';
  // Completion data
  no_well_to_be_completed: number | '';
  planned_time_per_completion_operation: number | '';
  subsea_xmas_tree_size: number | '';
  xt_weight: number | '';
  lrp_size: number | '';
  lrp_weight: number | '';
  xt_running_tool_size: number | '';
  xt_running_tool_weight: number | '';
};
