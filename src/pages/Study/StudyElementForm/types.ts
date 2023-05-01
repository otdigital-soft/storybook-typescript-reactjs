import { EncodedRig } from 'utils/rigs';

export type FormValues = {
  title: string;
  metric: string | null;
  plan: string | null;
  rigs: EncodedRig[];
};
