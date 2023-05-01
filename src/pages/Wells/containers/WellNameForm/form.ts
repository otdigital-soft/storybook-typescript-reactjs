export type FormValues = {
  name: string;
};

export const LABELS: Record<keyof FormValues, string> = {
  name: 'Well name',
};

export const getInitialValues = (): FormValues => ({
  name: '',
});
