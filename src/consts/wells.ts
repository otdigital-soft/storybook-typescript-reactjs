import {
  ExtensionSectionMudTypeEnum,
  MetoceanDataEnum,
  PnaEnum,
  WellSeasonEnum,
  Type357Enum,
} from 'api/schema';
import { getDisplayOptions } from 'utils/form';

export const WELL_LABELS = {
  // General
  name: 'Well name',
  water_depth: 'Water depth (ft)',
  transport_section: 'Transport section 17 1/2" & 12 1/4"',
  pna: 'P&A',
  type: 'Type of well',
  reservoir_section: 'Reservoir section 8 1/2"',
  season: 'Season',
  top_hole: 'Top hole 36" & 26"',
  completion: 'Completion',
  metocean_data: 'Metocean data',
  metocean_days_above_hs_5: 'Metocean days above HS 5',
  tvd_from_msl: 'TVD from MSL (m)',
  // Drilling settings
  planned_time_per_well: 'Planned time per well, d (time/depth curve)',
  md_from_msl: 'MD from MSL (m)',
  expected_reservoir_pressure: 'Expected reservoir pressure (bar)',
  expected_reservoir_temperature: 'Expected reservoir temperature (C)',
  top_hole_section_hole_size: 'Top hole section hole size (inch)',
  surface_casing_section_hole_size: 'Surface casing section hole size (inch)',
  intermediate_casing_section_hole_size:
    'Intermediate casing section hole size (inch)',
  production_casing_section_hole_size:
    'Production casing section hole size (inch)',
  extension_section_hole_size: 'Extension section hole size (inch)',
  intermediate_casing_section_mud_type: 'Intermediate casing section mud type',
  production_casing_section_mud_type: 'Production casing section mud type',
  extension_section_mud_type: 'Extension section mud type',
  intermediate_casing_section_mud_density:
    'Intermediate casing section mud density (10-3kg/m\u00B3)',
  production_casing_section_mud_density:
    'Production casing section mud density (10-3kg/m\u00B3)',
  extension_section_mud_density:
    'Extension section mud density (10-3kg/m\u00B3)',
  conductor_size: 'Conductor size (inch)',
  conductor_weight: 'Conductor weight (lbs/ft)',
  conductor_tvd_shoe_depth: 'Conductor TVD shoe depth (m)',
  conductor_md_shoe_depth: 'Conductor MD shoe depth (m)',
  surface_casing_size: 'Surface casing size (inch)',
  surface_casing_weight: 'Surface casing weight (lbs/ft)',
  surface_casing_tvd_shoe_depth: 'Surface casing TVD shoe depth (m)',
  surface_casing_md_shoe_depth: 'Surface casing MD shoe depth (m)',
  intermediate_casing_size: 'Intermediate casing size (inch)',
  intermediate_casing_weight: 'Intermediate casing weight (lbs/ft)',
  intermediate_casing_tvd_shoe_depth: 'Intermediate casing TVD shoe depth (m)',
  intermediate_casing_md_shoe_depth: 'Intermediate casing MD shoe depth (m)',
  production_casing_size: 'Production casing size (inch)',
  production_casing_weight: 'Production casing weight (lbs/ft)',
  production_casing_tvd_shoe_depth: 'Production casing TVD shoe depth (m)',
  production_casing_md_shoe_depth: 'Production casing MD shoe depth (m)',
  liner_other_size: 'Liner/other size (inch)',
  liner_other_weight: 'Liner/other weight (lbs/ft)',
  liner_other_tvd_shoe_depth: 'Liner/other TVD shoe depth (m)',
  liner_other_md_shoe_depth: 'Liner/other MD shoe depth (m)',
  // Completion data
  no_well_to_be_completed: 'Number of wells to be completed',
  planned_time_per_completion_operation:
    'Planned time per completion operation (days)',
  subsea_xmas_tree_size: 'Sub-sea christmas tree size (m\u00B3)',
  xt_weight: 'XT weight (t)',
  lrp_size: 'LRP size (m\u00B3)',
  lrp_weight: 'LRP weight (t)',
  xt_running_tool_size: 'XT running tool size (m\u00B3)',
  xt_running_tool_weight: 'XT running tool weight (t)',
};

const SIMPLE_MEDIUM_DEMANDING_DISPLAY: Record<PnaEnum, string> = {
  [PnaEnum.SIMPLE]: 'Simple',
  [PnaEnum.MEDIUM]: 'Medium',
  [PnaEnum.DEMANDING]: 'Demanding',
};

export const WELL_TYPE_DISPLAY: Record<Type357Enum, string> = {
  [Type357Enum.PNA]: 'P&A',
  [Type357Enum.EXPLORATION]: 'Exploration',
  [Type357Enum.PRODUCTION]: 'Production',
};
export const TOP_HOLE_DISPLAY = SIMPLE_MEDIUM_DEMANDING_DISPLAY;
export const TRANSPORT_SECTION_DISPLAY = SIMPLE_MEDIUM_DEMANDING_DISPLAY;
export const RESERVOIR_SECTION_DISPLAY = SIMPLE_MEDIUM_DEMANDING_DISPLAY;
export const COMPLETION_DISPLAY = SIMPLE_MEDIUM_DEMANDING_DISPLAY;
export const PNA_DISPLAY = SIMPLE_MEDIUM_DEMANDING_DISPLAY;
export const SEASON_DISPLAY: Record<WellSeasonEnum, string> = {
  [WellSeasonEnum.SUMMER]: 'Summer',
  [WellSeasonEnum.WINTER]: 'Winter',
  [WellSeasonEnum.SPECIFIC]: 'Specific',
  [WellSeasonEnum.YEARLY_AVERAGE]: 'Yearly Average',
};

export const METOCEAN_DATA_DISPLAY: Record<MetoceanDataEnum, string> = {
  [MetoceanDataEnum.GENERIC_NORTH_SEA]: 'Generic North Sea',
  [MetoceanDataEnum.GENERIC_NORWEGIAN_SEA]: 'Generic Norwegian Sea',
  [MetoceanDataEnum.GENERIC_BARENTS_SEA]: 'Generic Barents Sea',
  [MetoceanDataEnum.CLIENT_SPECIFIC]: 'Client Specific',
};

export const METOCEAN_DATA_OPTIONS = getDisplayOptions(
  MetoceanDataEnum,
  METOCEAN_DATA_DISPLAY,
);
export const WELL_TYPE_OPTIONS = getDisplayOptions(
  Type357Enum,
  WELL_TYPE_DISPLAY,
);
export const SEASON_OPTIONS = getDisplayOptions(WellSeasonEnum, SEASON_DISPLAY);
const SIMPLE_MEDIUM_DEMANDING_OPTIONS = getDisplayOptions(
  PnaEnum,
  SIMPLE_MEDIUM_DEMANDING_DISPLAY,
);
export const TOP_HOLE_OPTIONS = SIMPLE_MEDIUM_DEMANDING_OPTIONS;
export const TRANSPORT_SECTION_OPTIONS = SIMPLE_MEDIUM_DEMANDING_OPTIONS;
export const RESERVOIR_SECTION_OPTIONS = SIMPLE_MEDIUM_DEMANDING_OPTIONS;
export const COMPLETION_OPTIONS = SIMPLE_MEDIUM_DEMANDING_OPTIONS;
export const PNA_OPTIONS = SIMPLE_MEDIUM_DEMANDING_OPTIONS;

export const MUD_TYPE_DISPLAY: Record<ExtensionSectionMudTypeEnum, string> = {
  [ExtensionSectionMudTypeEnum.OIL_BASED]: 'Oil based',
  [ExtensionSectionMudTypeEnum.WATER_BASED]: 'Water based',
};

export const MUD_TYPE_OPTIONS = getDisplayOptions(
  ExtensionSectionMudTypeEnum,
  MUD_TYPE_DISPLAY,
);
