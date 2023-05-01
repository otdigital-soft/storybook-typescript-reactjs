import {
  CustomJackupRigDetails,
  RigStatusEnum,
  TopsideDesignEnum,
} from 'api/schema';
import { DATE_FORMAT_LONG } from 'consts';
import { RIG_STATUS_DISPLAY, TOPSIDE_DESIGN_DISPLAY } from 'consts/rigs';
import EMPRigDetails from 'containers/EMPRigDetails/EMPRigDetails';
import { formatDateString } from 'utils/date';

interface EMPJackupRigDetailsProps {
  rigData: CustomJackupRigDetails;
}

export const EMPJackupRigDetails = ({ rigData }: EMPJackupRigDetailsProps) => {
  return (
    <EMPRigDetails
      parameters={[
        {
          title: 'Type',
          description: 'Jackup',
        },
        {
          title: 'Build Yard',
          description: rigData.build_yard || '-',
        },
        {
          title: 'Rig status',
          description: rigData.rig_status
            ? RIG_STATUS_DISPLAY[rigData.rig_status as RigStatusEnum]
            : '-',
        },
        {
          title: 'Months in operation last 3 years',
          description: rigData.months_in_operation_last_3_years ?? '-',
        },
        {
          title: 'Manager',
          description: rigData.manager || '-',
        },
        {
          title: 'Delivery Date',
          description: rigData.delivery_date
            ? formatDateString(rigData.delivery_date, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: 'End of Last Contract',
          description: rigData.end_of_last_contract
            ? formatDateString(rigData.end_of_last_contract, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: 'Top side design',
          description: rigData.topside_design
            ? TOPSIDE_DESIGN_DISPLAY[
                rigData.topside_design as TopsideDesignEnum
              ]
            : '-',
        },
        {
          title: 'Design',
          description: rigData.design || '-',
        },
        {
          title: 'Special Survey Due',
          description: rigData.special_survey_due
            ? formatDateString(rigData.special_survey_due, DATE_FORMAT_LONG)
            : '-',
        },
        {
          title: 'Months in operation last year',
          description: rigData.months_in_operation_last_year ?? '-',
        },
      ]}
    />
  );
};
