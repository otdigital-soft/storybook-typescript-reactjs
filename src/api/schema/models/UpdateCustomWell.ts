/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlankEnum } from './BlankEnum';
import type { ExtensionSectionMudTypeEnum } from './ExtensionSectionMudTypeEnum';
import type { MetoceanDataEnum } from './MetoceanDataEnum';
import type { PnaEnum } from './PnaEnum';
import type { Type357Enum } from './Type357Enum';
import type { WellSeasonEnum } from './WellSeasonEnum';

export type UpdateCustomWell = {
    name?: string;
    type?: (Type357Enum | BlankEnum);
    top_hole?: (PnaEnum | BlankEnum);
    transport_section?: (PnaEnum | BlankEnum);
    reservoir_section?: (PnaEnum | BlankEnum);
    completion?: (PnaEnum | BlankEnum);
    pna?: (PnaEnum | BlankEnum);
    season?: (WellSeasonEnum | BlankEnum);
    water_depth?: number | null;
    metocean_data?: (MetoceanDataEnum | BlankEnum);
    metocean_days_above_hs_5?: number | null;
    planned_time_per_well?: number | null;
    tvd_from_msl?: number | null;
    md_from_msl?: number | null;
    expected_reservoir_pressure?: number | null;
    expected_reservoir_temperature?: number | null;
    top_hole_section_hole_size?: number | null;
    surface_casing_section_hole_size?: number | null;
    intermediate_casing_section_hole_size?: number | null;
    production_casing_section_hole_size?: number | null;
    extension_section_hole_size?: number | null;
    intermediate_casing_section_mud_type?: (ExtensionSectionMudTypeEnum | BlankEnum);
    production_casing_section_mud_type?: (ExtensionSectionMudTypeEnum | BlankEnum);
    extension_section_mud_type?: (ExtensionSectionMudTypeEnum | BlankEnum);
    intermediate_casing_section_mud_density?: number | null;
    production_casing_section_mud_density?: number | null;
    extension_section_mud_density?: number | null;
    conductor_size?: number | null;
    conductor_weight?: number | null;
    conductor_tvd_shoe_depth?: number | null;
    conductor_md_shoe_depth?: number | null;
    surface_casing_size?: number | null;
    surface_casing_weight?: number | null;
    surface_casing_tvd_shoe_depth?: number | null;
    surface_casing_md_shoe_depth?: number | null;
    intermediate_casing_size?: number | null;
    intermediate_casing_weight?: number | null;
    intermediate_casing_tvd_shoe_depth?: number | null;
    intermediate_casing_md_shoe_depth?: number | null;
    production_casing_size?: number | null;
    production_casing_weight?: number | null;
    production_casing_tvd_shoe_depth?: number | null;
    production_casing_md_shoe_depth?: number | null;
    liner_other_size?: number | null;
    liner_other_weight?: number | null;
    liner_other_tvd_shoe_depth?: number | null;
    liner_other_md_shoe_depth?: number | null;
    no_well_to_be_completed?: number | null;
    planned_time_per_completion_operation?: number | null;
    subsea_xmas_tree_size?: number | null;
    xt_weight?: number | null;
    lrp_size?: number | null;
    lrp_weight?: number | null;
    xt_running_tool_size?: number | null;
    xt_running_tool_weight?: number | null;
    draft: boolean;
};
