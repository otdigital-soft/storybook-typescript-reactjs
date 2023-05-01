import { ColumnsType } from 'antd/lib/table/interface';
import { CompleteVesselUseList, PlannedVesselUseList } from 'api/schema';
import { useMemo } from 'react';
import { SEASON_NAME_MAP } from 'pages/WellPlan/consts';
import CheckMark from 'pages/Wells/components/CheckMark';
import { Flexbox } from 'components/Box';

const useVesselListColumns = <
  VesselUseList extends CompleteVesselUseList | PlannedVesselUseList,
>() => {
  const columns: ColumnsType<VesselUseList> = useMemo(
    () => [
      {
        title: 'Type',
        dataIndex: 'vessel_type',
        width: 300,
        render: (vesselType: VesselUseList['vessel_type']) => {
          return vesselType.type;
        },
      },
      {
        title: 'Season',
        dataIndex: 'season',
        width: 250,
        render: (value: VesselUseList['season']) => {
          return SEASON_NAME_MAP[value];
        },
      },
      {
        title: 'Days',
        dataIndex: 'duration',
        width: 135,
      },
      {
        title: 'Quota obligation',
        dataIndex: 'quota_obligation',
        width: 135,
        render: (value: VesselUseList['quota_obligation']) => {
          return (
            <Flexbox justifyContent="center">
              <CheckMark checked={!!value} />
            </Flexbox>
          );
        },
      },
      {
        title: '% exposure against current well',
        dataIndex: 'exposure_against_current_well',
        width: 250,
        render: (value: VesselUseList['exposure_against_current_well']) => {
          return `${value}%`;
        },
      },
      {
        title: 'Waiting on weather (%)',
        dataIndex: 'waiting_on_weather',
        width: 294,
        render: (value: VesselUseList['waiting_on_weather']) => {
          return `${value}%`;
        },
      },
    ],
    [],
  );

  return columns;
};

export default useVesselListColumns;
