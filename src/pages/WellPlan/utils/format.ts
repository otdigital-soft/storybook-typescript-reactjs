import { WellPlannerDetails } from 'api/schema';
import { notEmpty } from 'utils/data';

export function wellPlanName(data: WellPlannerDetails | undefined): string {
  if (!data) {
    return '';
  }
  return [data.name.name, data.sidetrack].filter(notEmpty).join(' ');
}
