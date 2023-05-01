import {
  BaselineMode,
  BaselinePhase,
  CreateUpdateEmissionReductionInitiative,
  CreateUpdateEmissionReductionInitiativeInput,
  EmissionReductionInitiativeDetails,
  EmissionReductionInitiativeTypeEnum,
} from 'api/schema';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import Logger from 'utils/logger';

export type FormValues = {
  name: string;
  description: string;
  type: string | null;
  vendor: string;
  deployment_date: Date | null;
  inputs: number[][];
  transit: number | null;
};

export const LABELS: Record<keyof Omit<FormValues, 'inputs'>, string> = {
  name: 'ERI name',
  description: 'Description',
  type: 'Type',
  vendor: 'Vendor',
  deployment_date: 'Deployment date',
  transit: 'Transit',
};

const createMatrix = (x: number, y: number): number[][] => {
  return Array(x)
    .fill(null)
    .map(() => Array(y).fill(0));
};

export const getInitialValues = ({
  emissionReductionInitiative,
  phases,
  modes,
}: {
  emissionReductionInitiative?: EmissionReductionInitiativeDetails;
  phases: BaselinePhase[];
  modes: BaselineMode[];
}): FormValues => {
  const inputs = createMatrix(phases.length, modes.length);
  if (!emissionReductionInitiative) {
    return {
      name: '',
      description: '',
      type: null,
      vendor: '',
      deployment_date: null,
      inputs,
      transit: null,
    };
  }
  const phaseIds = phases.map((phase) => phase.id);
  const modeIds = modes.map((mode) => mode.id);

  for (const input of emissionReductionInitiative.inputs) {
    const phaseIndex = phaseIds.indexOf(input.phase.id);
    const modeIndex = modeIds.indexOf(input.mode.id);

    if (phaseIndex < 0) {
      Logger.warn(
        `CustomPhase(id=${input.phase.id}) not found in phases list)`,
      );
      continue;
    }
    if (modeIndex < 0) {
      Logger.warn(`CustomMode(id=${input.mode.id}) not found in modes list)`);
      continue;
    }

    inputs[phaseIndex][modeIndex] = input.value;
  }

  return {
    name: emissionReductionInitiative.name,
    description: emissionReductionInitiative.description,
    type: emissionReductionInitiative.type,
    vendor: emissionReductionInitiative.vendor,
    deployment_date: parseISO(emissionReductionInitiative.deployment_date),
    inputs,
    transit: emissionReductionInitiative.transit,
  };
};

export const normalizeFormValues = ({
  values,
  phases,
  modes,
}: {
  values: FormValues;
  phases: BaselinePhase[];
  modes: BaselineMode[];
}): CreateUpdateEmissionReductionInitiative => {
  const inputs: CreateUpdateEmissionReductionInitiativeInput[] = [];
  for (const [phaseIndex, phase] of phases.entries()) {
    for (const [modeIndex, mode] of modes.entries()) {
      inputs.push({
        mode: mode.id,
        phase: phase.id,
        value: values.inputs[phaseIndex][modeIndex],
      });
    }
  }
  return {
    name: values.name,
    type: values.type as EmissionReductionInitiativeTypeEnum,
    description: values.description,
    vendor: values.vendor,
    deployment_date: formatISO(values.deployment_date as Date, {
      representation: 'date',
    }),
    inputs,
    transit: Number(values.transit),
  };
};
