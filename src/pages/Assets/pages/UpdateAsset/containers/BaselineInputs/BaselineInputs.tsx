import useBaselineInputsColumns from '../../hooks/useBaselineInputsColumns';
import useUpdateBaselineInput from '../../hooks/useUpdateBaselineInput';
import { InputFormInputNumber, InputTable } from './BaselineInputs.styled';
import Box, { Flexbox } from 'components/Box';
import { Season } from '../BaselineForm';
import { Text } from 'components/Typography';
import { CUBIC_METRE } from 'consts/format';
import PhaseSelect from '../PhaseSelect';
import ModeSelect from '../ModeSelect';
import React, { useCallback } from 'react';
import DraggableTableRow from './DraggableTableRow';
import { DraggableTableCell } from 'components/DraggableTable';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { useInputsHeight } from 'pages/Assets/pages/UpdateAsset/containers/InputsHeightProvider';
import DroppableTableBody from './DroppableTableBody';
import { isSafeToShow } from 'utils/safety';
import { Alert } from 'antd';
import { LABELS as labels } from '../BaselineForm/form';
import { prettyPlaceholder } from 'utils/format';

const BaselineInputs = ({ season }: { season: Season }) => {
  const columns = useBaselineInputsColumns(season);
  const inputsHeight = useInputsHeight();
  const {
    seasonValues: { inputs, phases, modes },
    movePhase,
    seasonErrors,
  } = useUpdateBaselineInput(season);
  const onDragEnd: DragDropContextProps['onDragEnd'] = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      movePhase(result.source.index, result.destination.index);
    },
    [movePhase],
  );
  return (
    <>
      <Box marginBottom={16}>
        <Text strong>Fuel baseline input ({CUBIC_METRE} fuel/day)</Text>
      </Box>

      <Flexbox justifyContent="space-between" alignItems="end ">
        <Box width={207}>
          <InputFormInputNumber
            name={`${season}.transit`}
            formItemProps={{
              label: labels.transit,
              required: true,
            }}
            inputNumberProps={{
              placeholder: prettyPlaceholder`Enter ${labels.transit}`,
            }}
          />
        </Box>
        <Flexbox gap={10}>
          <Box width={207}>
            <PhaseSelect season={season} />
          </Box>
          <Box width={207}>
            <ModeSelect season={season} />
          </Box>
        </Flexbox>
      </Flexbox>

      {isSafeToShow(seasonErrors?.modes) ? (
        <Box marginTop={14}>
          <Alert message={seasonErrors?.modes} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box marginTop={14}>
        <DragDropContext onDragEnd={onDragEnd}>
          <InputTable
            pagination={false}
            locale={{
              emptyText: 'No input added',
            }}
            columns={columns}
            scroll={{
              x: modes.length ? 'max-content' : undefined,
              y: phases.length && inputsHeight ? inputsHeight : undefined,
            }}
            dataSource={inputs}
            rowKey={(record) => record.rowId}
            onRow={(record, index) => {
              const attr = {
                index,
                draggableId: record.rowId,
              };
              return attr as React.HTMLAttributes<unknown>;
            }}
            components={{
              body: {
                wrapper: DroppableTableBody,
                row: DraggableTableRow,
                cell: DraggableTableCell,
              },
            }}
          />
        </DragDropContext>
      </Box>
    </>
  );
};

export default BaselineInputs;
