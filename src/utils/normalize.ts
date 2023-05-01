import { formatISO } from 'date-fns';

export const normalizeNumber = (value: number | string | undefined | null) =>
  !!value || value === 0 ? Number(value) : null;

export const normalizeDate = (value: Date | undefined | null) =>
  value ? formatISO(value, { representation: 'date' }) : null;
