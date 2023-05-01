import { ColumnsType } from 'antd/lib/table/interface';
import Menu from 'components/Menu';
import { Dropdown } from 'antd';
import Button from 'components/Button';
import { useMemo } from 'react';
import useUpdateBaselineInput from '../useUpdateBaselineInput';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useModes from 'pages/Assets/pages/UpdateAsset/hooks/useModes';
import useDataDict from 'pages/Assets/hooks/useDataDict';
import { MoreOutlined } from '@ant-design/icons';
import usePhases from 'pages/Assets/pages/UpdateAsset/hooks/usePhases';
import { DefaultOptionType } from 'rc-select/lib/Select';
import {
  InputFormSelect,
  InputFormInputNumber,
} from 'pages/Assets/pages/UpdateAsset/containers/BaselineInputs';
import { useTheme } from 'styled-components';
import DragHandle from 'pages/Assets/pages/UpdateAsset/containers/DragHandle';
import {
  PhaseFormValues,
  Season,
} from 'pages/Assets/pages/UpdateAsset/containers/BaselineForm';
import useBaseline from '../useBaseline/useBaseline';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { UpdateAssetAddEditActionContext } from '../../types';

const useBaselineInputsColumns = (season: Season) => {
  const assetId = useAssetId();
  const { colors } = useTheme();
  const {
    seasonValues: { modes, phases },
    duplicatePhase,
    removePhase,
    removeMode,
    updatePhase,
  } = useUpdateBaselineInput(season);
  const { editedRow: baselineId } =
    useAddEditActions<UpdateAssetAddEditActionContext>('baselines');
  const { data: baselineData } = useBaseline(assetId, baselineId);
  const { data: modesData } = useModes(assetId);
  const modesDataDict = useDataDict(modesData);
  const { data: phasesData } = usePhases(assetId);
  const requiredPhases = useMemo(
    () =>
      (phasesData || [])
        .filter((phase) => !phase.custom)
        .map((phase) => phase.id),
    [phasesData],
  );
  const phasesOptions: DefaultOptionType[] = useMemo(
    () =>
      phasesData?.map((phase) => ({
        label: phase.name,
        value: phase.id,
      })) || [],
    [phasesData],
  );
  const [initialPhaseIds, initialModeIds] = useMemo(() => {
    if (!baselineData) {
      return [[], []];
    }

    const phaseIds = new Set();
    const modeIds = new Set();

    for (const input of baselineData[season]?.inputs || []) {
      phaseIds.add(input.phase.id);
      modeIds.add(input.mode.id);
    }

    return [[...phaseIds], [...modeIds]];
  }, [baselineData, season]);

  return useMemo(() => {
    const columns: ColumnsType<PhaseFormValues> = [
      {
        title: '',
        key: 'drag',
        width: 48,
        fixed: 'left',
        render: () => {
          return <DragHandle />;
        },
      },
      {
        title: 'Phase',
        key: 'phase',
        width: modes.length ? 225 : undefined,
        fixed: 'left',
        render: (value, record, index) => {
          return (
            <InputFormSelect
              name={`${season}.phases[${index}]`}
              options={phasesOptions}
              selectInputProps={{
                onChange: (phaseValue: number) => {
                  updatePhase(index, phaseValue);
                },
              }}
            />
          );
        },
      },
    ];
    for (const [modeIndex, modeId] of modes.entries()) {
      columns.push({
        title: modesDataDict[modeId]?.name,
        key: `mode-${modeId}`,
        width: 225,
        filterDropdown: () => {
          return (
            <Menu width={181} style={{ borderRadius: 8 }}>
              <Menu.Item
                key="delete"
                onClick={() => removeMode(modeIndex)}
                disabled={
                  baselineData?.is_used && initialModeIds.includes(modeId)
                }
              >
                Delete
              </Menu.Item>
            </Menu>
          );
        },
        filterIcon: () => (
          <MoreOutlined style={{ color: colors.text.primary, fontSize: 16 }} />
        ),
        render: (value, record, index) => {
          return (
            <InputFormInputNumber
              name={`${season}.inputs[${index}].modes[${modeIndex}].value`}
            />
          );
        },
      });
    }
    columns.push({
      title: '',
      key: 'actions',
      className: 'ant-table-cell-actions',
      fixed: 'right',
      width: 48,
      render: (value, record, index) => {
        const phaseId = phases[index];
        const isUniquePhase =
          phases.filter((phase) => phase === phaseId).length === 1;
        const isBasePhase = requiredPhases.includes(phaseId) && isUniquePhase;
        const isUsedPhase =
          baselineData?.is_used &&
          initialPhaseIds.includes(phaseId) &&
          isUniquePhase;

        const menu = (
          <Menu width={181}>
            <Menu.Item key="duplicate" onClick={() => duplicatePhase(index)}>
              Duplicate
            </Menu.Item>
            <Menu.Item
              key="delete"
              onClick={() => removePhase(index)}
              disabled={isBasePhase || isUsedPhase}
            >
              Delete
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" icon={<MoreOutlined />} block />
          </Dropdown>
        );
      },
    });

    return columns;
  }, [
    colors.text.primary,
    duplicatePhase,
    modes,
    modesDataDict,
    phases,
    phasesOptions,
    removeMode,
    removePhase,
    updatePhase,
    requiredPhases,
    season,
    baselineData?.is_used,
    initialPhaseIds,
    initialModeIds,
  ]);
};

export default useBaselineInputsColumns;
