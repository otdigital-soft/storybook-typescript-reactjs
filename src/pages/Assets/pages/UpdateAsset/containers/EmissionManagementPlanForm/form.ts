import {
  CreateUpdateEmissionManagementPlan,
  EmissionManagementPlanDetails,
} from 'api/schema';

export type FormValues = {
  name: string;
  description: string;
  version: string;
  draft: number;
};

export const LABELS: Record<keyof FormValues, string> = {
  name: 'EMP name',
  description: 'Description',
  version: 'Version',
  draft: 'EMP status',
};

export const getInitialValues = (
  emissionManagementPlan?: EmissionManagementPlanDetails,
): FormValues => {
  return {
    name: emissionManagementPlan?.name || '',
    description: emissionManagementPlan?.description || '',
    version: emissionManagementPlan?.version || '',
    draft: Number(emissionManagementPlan?.draft ?? true),
  };
};

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdateEmissionManagementPlan => {
  return {
    name: values.name,
    description: values.description,
    version: values.version,
    draft: !!values.draft,
  };
};
