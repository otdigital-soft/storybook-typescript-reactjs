import { FormValues, FormWellValues } from './form';
import { CustomWellList, CreateUpdatePlan, CustomRigList } from 'api/schema';
import { decodeRig } from 'utils/rigs';

export const normalizeFormValues = (values: FormValues): CreateUpdatePlan => {
  if (!values.reference_rig) {
    throw new Error('Reference rig cannot be empty');
  }

  return {
    name: values.name,
    block_name: values.block_name,
    description: values.description,
    distance_from_tug_base_to_previous_well: Number(
      values.distance_from_tug_base_to_previous_well,
    ),
    reference_rig: decodeRig(values.reference_rig),
    wells: values.addedWells.map((well) => ({
      id: well.id,
      distance_from_previous_location: Number(
        well.distance_from_previous_location,
      ),
      distance_to_helicopter_base: Number(well.distance_to_helicopter_base),
      distance_to_psv_base: Number(well.distance_to_psv_base),
      distance_to_ahv_base: Number(well.distance_to_ahv_base),
      distance_to_tug_base: Number(well.distance_to_tug_base),
      jackup_positioning_time: Number(well.jackup_positioning_time),
      semi_positioning_time: Number(well.semi_positioning_time),
      operational_time: Number(well.operational_time),
    })),
  };
};

export const emptyFormValues = ({
  projectWells,
  projectRigs,
}: {
  projectWells: CustomWellList[];
  projectRigs: CustomRigList[];
}): FormValues => {
  return {
    name: '',
    description: '',
    block_name: '',
    distance_from_tug_base_to_previous_well: '',
    reference_rig: null,
    availableWells: projectWells.map((well) => ({
      id: well.id,
      name: well.name || '',
      distance_from_previous_location: '' as const,
      distance_to_helicopter_base: '' as const,
      distance_to_psv_base: '' as const,
      distance_to_ahv_base: '' as const,
      distance_to_tug_base: '' as const,
      jackup_positioning_time: '' as const,
      semi_positioning_time: '' as const,
      operational_time: '' as const,
    })),
    addedWells: [],
    // read only
    projectRigs,
  };
};

export const resetWellValues = (well: FormWellValues): FormWellValues => {
  return {
    id: well.id,
    name: well.name,
    distance_from_previous_location: '',
    distance_to_helicopter_base: '',
    distance_to_psv_base: '',
    distance_to_ahv_base: '',
    distance_to_tug_base: '',
    semi_positioning_time: '',
    jackup_positioning_time: '',
    operational_time: '',
  };
};
