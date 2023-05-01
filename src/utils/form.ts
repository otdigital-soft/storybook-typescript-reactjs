import { DefaultOptionType } from 'rc-select/lib/Select';

export const getDisplayOptions = <T extends Record<string, unknown>>(
  data: T,
  display: Record<keyof T, string>,
): DefaultOptionType[] => {
  return Object.keys(data).map((key) => ({
    value: key,
    label: display[key],
  }));
};
