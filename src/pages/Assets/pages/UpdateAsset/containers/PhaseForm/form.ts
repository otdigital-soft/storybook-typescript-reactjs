import { AssetPhase } from 'api/schema';

export type FormValues = {
  name: string;
  description: string;
};

export const LABELS: Record<keyof FormValues, string> = {
  name: 'Phase name',
  description: 'Phase description',
};

export const getInitialValues = (asset?: AssetPhase): FormValues => ({
  name: asset?.name || '',
  description: asset?.description || '',
});
