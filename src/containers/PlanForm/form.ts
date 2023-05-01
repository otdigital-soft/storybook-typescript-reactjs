import { CustomRigList } from 'api/schema';
import { EncodedRig } from 'utils/rigs';

export const labels = {
  name: 'Plan name',
  description: 'Plan description',
  block_name: 'Block name/number',
  distance_from_tug_base_to_previous_well:
    'Distance from Tug base to previous well (nm)',
  reference_rig: 'Reference rig',
  distance_from_previous_location: 'Distance between wells (nm)',
  distance_to_helicopter_base: 'Distance to Helicopter base (nm)',
  distance_to_psv_base: 'Distance to PSV base (nm)',
  distance_to_ahv_base: 'Distance to AHV base (nm)',
  distance_to_tug_base: 'Distance to Tug base (nm)',
  jackup_positioning_time: 'Jackup positioning time (d)',
  semi_positioning_time: 'Semi positioning time (d)',
  operational_time: 'Operational time (d)',
};

export interface FormWellValues {
  id: number;
  name: string;
  distance_from_previous_location: number | '';
  distance_to_helicopter_base: number | '';
  distance_to_psv_base: number | '';
  distance_to_ahv_base: number | '';
  distance_to_tug_base: number | '';
  jackup_positioning_time: number | '';
  semi_positioning_time: number | '';
  operational_time: number | '';
}

export type FormValues = {
  name: string;
  description: string;
  block_name: string;
  distance_from_tug_base_to_previous_well: number | '';
  reference_rig: EncodedRig | null;
  availableWells: FormWellValues[];
  addedWells: FormWellValues[];
  // read only
  projectRigs: CustomRigList[];
};
