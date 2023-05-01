import { useMemo } from 'react';
import { Table } from 'antd';
import {
  WellPlannerDetailsCompleteStep,
  WellPlannerDetailsPlannedStep,
} from 'api/schema';
import { ColumnsType } from 'antd/lib/table/interface';
import { SEASON_NAME_MAP } from 'pages/WellPlan/consts';
import { prettyNumber, roundNumber } from 'utils/format';
import CheckMark from 'pages/Wells/components/CheckMark';
import { Flexbox } from 'components/Box';
import { notEmpty } from 'utils/data';

const usePhaseListColumns = <
  PhaseType extends
    | WellPlannerDetailsPlannedStep
    | WellPlannerDetailsCompleteStep,
>({
  selectionColumn,
  expandColumn,
}: {
  selectionColumn: boolean;
  expandColumn: boolean;
}) => {
  const columns: ColumnsType<PhaseType> = useMemo(
    () =>
      [
        selectionColumn ? Table.SELECTION_COLUMN : undefined,
        expandColumn ? Table.EXPAND_COLUMN : undefined,
        {
          title: 'Phase',
          dataIndex: 'phase',
          width: 120,
          render: (phase: PhaseType['phase']) => phase.name,
        },
        {
          title: 'Section length (m)',
          dataIndex: 'well_section_length',
          width: 150,
          render: (sectionLength: PhaseType['well_section_length']) =>
            sectionLength ? sectionLength : undefined,
        },
        {
          title: 'Mode',
          dataIndex: 'mode',
          width: 120,
          render: (mode: PhaseType['mode']) => mode.name,
        },
        {
          title: 'Season',
          dataIndex: 'season',
          width: 80,
          render: (season: PhaseType['season']) => SEASON_NAME_MAP[season],
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          width: 70,
          render: (duration: PhaseType['duration']) =>
            prettyNumber(roundNumber(duration, 2)),
        },
        {
          title: 'Waiting on weather (%)',
          dataIndex: 'waiting_on_weather',
          width: 170,
          render: (value: PhaseType['waiting_on_weather']) => {
            return `${value}%`;
          },
        },
        {
          title: 'External supply',
          dataIndex: 'external_energy_supply_enabled',
          width: 120,
          render: (
            externalEnergySupplyEnabled: PhaseType['external_energy_supply_enabled'],
          ) => (
            <Flexbox justifyContent="center">
              <CheckMark checked={externalEnergySupplyEnabled} />
            </Flexbox>
          ),
        },
        {
          title: 'CC&S',
          dataIndex: 'carbon_capture_storage_system_quantity',
          width: 50,
          render: (
            carbonCaptureStorageSystemQuantity: PhaseType['carbon_capture_storage_system_quantity'],
          ) => (
            <Flexbox justifyContent="center">
              <CheckMark checked={!!carbonCaptureStorageSystemQuantity} />
            </Flexbox>
          ),
        },
        {
          title: 'Materials',
          dataIndex: 'materials',
          width: 90,
          render: (materials: PhaseType['materials']) => (
            <Flexbox justifyContent="center">
              <CheckMark checked={!!materials.length} />
            </Flexbox>
          ),
        },
        {
          title: 'Comment',
          dataIndex: 'comment',
          width: 340,
        },
      ].filter(notEmpty),
    [expandColumn, selectionColumn],
  );

  return columns;
};

export default usePhaseListColumns;
