import { parseISO, format } from 'date-fns';

export const formatDateString = (dateString: string, dateFormat: string) => {
  const date = parseISO(dateString);
  return format(date, dateFormat);
};
