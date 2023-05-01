import { AssetMode } from 'api/schema';

export type FormValues = {
  name: string;
  description: string;
};

export const LABELS: Record<keyof FormValues, string> = {
  name: 'Mode name',
  description: 'Mode description',
};

export const getInitialValues = (mode?: AssetMode): FormValues => ({
  name: mode?.name || '',
  description: mode?.description || '',
});
