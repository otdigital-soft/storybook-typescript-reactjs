import {
  CustomSemiRigDetails,
  DrillfloorEfficiencyEnum,
  RigStatusEnum,
  TopsideDesignEnum,
} from 'api/schema';
import { DATE_FORMAT_LONG } from 'consts';
import {
  DRILLFLOOR_EFFICIENCY_DISPLAY,
  RIG_STATUS_DISPLAY,
  SEMI_LABELS as labels,
  TOPSIDE_DESIGN_DISPLAY,
} from 'consts/rigs';
import EMPRigDetails from 'containers/EMPRigDetails/EMPRigDetails';
import { formatDateString } from 'utils/date';

interface EMPSemiRigDetailsProps {
  rigData: CustomSemiRigDetails;
}

export const EMPSemiRigDetails = ({ rigData }: EMPSemiRigDetailsProps) => {
  return (
    <EMPRigDetails
      parameters={[
        {
          title: 'Type',
          description: 'Semi',
        },
        {
          title: labels.build_yard,
          description: rigData.build_yard || '-',
        },
        {
          title: labels.rig_status,
          description: rigData.rig_status
            ? RIG_STATUS_DISPLAY[rigData.rig_status as RigStatusEnum]
            : '-',
        },
        {
          title: labels.months_in_operation_last_3_years,
          description: rigData.months_in_operation_last_3_years ?? '-',
        },
        {
          title: labels.manager,
          description: rigData.manager || '-',
        },
        {
          title: labels.delivery_date,
          description: rigData.delivery_date
            ? formatDateString(rigData.delivery_date, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: labels.end_of_last_contract,
          description: rigData.end_of_last_contract
            ? formatDateString(rigData.end_of_last_contract, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: labels.topside_design,
          description: rigData.topside_design
            ? TOPSIDE_DESIGN_DISPLAY[
                rigData.topside_design as TopsideDesignEnum
              ]
            : '-',
        },
        {
          title: labels.design,
          description: rigData.design || '-',
        },
        {
          title: labels.special_survey_due,
          description: rigData.special_survey_due
            ? formatDateString(rigData.special_survey_due, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: labels.months_in_operation_last_year,
          description: rigData.months_in_operation_last_year ?? '-',
        },
        {
          title: labels.drillfloor_efficiency,
          description: rigData.drillfloor_efficiency
            ? DRILLFLOOR_EFFICIENCY_DISPLAY[
                rigData.drillfloor_efficiency as DrillfloorEfficiencyEnum
              ]
            : '-',
        },
      ]}
    />
  );
};
