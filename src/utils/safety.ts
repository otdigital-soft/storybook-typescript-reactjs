export const isSafeToShow = (value: unknown): boolean =>
  !!(value && typeof value === 'string');
