import Box from 'components/Box';
import { DATE_FORMAT_WITH_DOTS } from 'consts';
import DatePicker from 'components/DatePicker';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import { parseISO } from 'date-fns';
import useUpdatePlannedStartDate from 'pages/Wells/pages/WellPlanning/hooks/useUpdatePlannedStartDate';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum } from 'api/schema';

const PlannedStartDate = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const {
    mutate: updatePlannedStartDate,
    isLoading: isUpdatingPlannedStartDate,
  } = useUpdatePlannedStartDate(wellPlanId);
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  return (
    <Box width={250}>
      <DatePicker
        value={
          wellPlanData?.planned_start_date
            ? parseISO(wellPlanData.planned_start_date)
            : null
        }
        onChange={(value) => {
          if (value) {
            updatePlannedStartDate(value);
          }
        }}
        style={{ width: '100%' }}
        format={DATE_FORMAT_WITH_DOTS}
        placeholder="Select planned start date"
        allowClear={false}
        disabled={isUpdatingPlannedStartDate || !canEdit}
      />
    </Box>
  );
};

export default PlannedStartDate;
