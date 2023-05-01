import {
  BaselineDetails,
  BaselineDetailsSeason,
  CreateUpdateBaseline,
  CreateUpdateBaselineSeason,
  CreateUpdateBaselineSeasonInput,
} from 'api/schema';
import Logger from 'utils/logger';
import { v4 as uuidv4 } from 'uuid';

export enum Season {
  Summer = 'summer',
  Winter = 'winter',
}

export type ModeFormValues = {
  value: number;
};

export type PhaseFormValues = {
  rowId: string;
  modes: ModeFormValues[];
};

export type SeasonFormValues = {
  phases: number[];
  modes: number[];
  inputs: PhaseFormValues[];
  transit: number | null;
};

export type FormValues = {
  name: string;
  description: string;
  draft: number;
  activeSeason: Season;
  summer: SeasonFormValues;
  winter: SeasonFormValues;
};

export const LABELS: Record<
  keyof Pick<FormValues, 'name' | 'description' | 'draft'> | 'transit',
  string
> = {
  name: 'Baseline name',
  description: 'Description',
  draft: 'Baseline status',
  transit: 'Transit',
};

const createEmptyInputs = (
  numPhases: number,
  numModes: number,
): PhaseFormValues[] => {
  return Array(numPhases)
    .fill(null)
    .map(() => ({
      rowId: uuidv4(),
      modes: Array(numModes)
        .fill(null)
        .map(() => ({ value: 0 })),
    }));
};

const getSeasonInitialValues = (
  seasonData?: BaselineDetailsSeason,
): SeasonFormValues => {
  if (!seasonData) {
    return {
      phases: [],
      modes: [],
      inputs: [],
      transit: null,
    };
  }

  const phases = [...new Set(seasonData.inputs.map((input) => input.phase.id))];
  const modes = [...new Set(seasonData.inputs.map((input) => input.mode.id))];
  const inputs = createEmptyInputs(phases.length, modes.length);

  for (const seasonInput of seasonData.inputs) {
    const phaseIndex = phases.indexOf(seasonInput.phase.id);
    const modeIndex = modes.indexOf(seasonInput.mode.id);

    if (phaseIndex < 0) {
      Logger.warn(
        `CustomPhase(id=${seasonInput.phase.id}) not found in phases list)`,
      );
      continue;
    }
    if (modeIndex < 0) {
      Logger.warn(
        `CustomMode(id=${seasonInput.mode.id}) not found in modes list)`,
      );
      continue;
    }

    inputs[phaseIndex].modes[modeIndex].value = seasonInput.value;
  }

  return {
    phases,
    modes,
    inputs,
    transit: seasonData.transit,
  };
};

export const getAddInitialValues = ({
  initialPhases,
  initialModes,
}: {
  initialPhases: number[];
  initialModes: number[];
}): FormValues => {
  return {
    name: '',
    description: '',
    draft: Number(true),
    activeSeason: Season.Summer,
    summer: {
      phases: initialPhases,
      modes: initialModes,
      inputs: createEmptyInputs(initialPhases.length, initialModes.length),
      transit: 0,
    },
    winter: {
      phases: initialPhases,
      modes: initialModes,
      inputs: createEmptyInputs(initialPhases.length, initialModes.length),
      transit: 0,
    },
  };
};

export const getUpdateInitialValues = (
  baseline: BaselineDetails | undefined,
): FormValues => {
  return {
    name: baseline?.name || '',
    description: baseline?.description || '',
    draft: Number(baseline?.draft),
    activeSeason: Season.Summer,
    winter: getSeasonInitialValues(baseline?.winter),
    summer: getSeasonInitialValues(baseline?.summer),
  };
};

const normalizeSeasonFormValues = (
  values: SeasonFormValues,
): CreateUpdateBaselineSeason => {
  const inputs: CreateUpdateBaselineSeasonInput[] = [];
  for (const [phaseIndex, phaseId] of values.phases.entries()) {
    for (const [modeIndex, modeId] of values.modes.entries()) {
      inputs.push({
        mode: modeId,
        phase: phaseId,
        value: values.inputs[phaseIndex].modes[modeIndex].value,
      });
    }
  }
  return {
    inputs,
    transit: Number(values.transit),
  };
};

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdateBaseline => {
  return {
    name: values.name,
    description: values.description,
    draft: !!values.draft,
    winter: normalizeSeasonFormValues(values.winter),
    summer: normalizeSeasonFormValues(values.summer),
  };
};
