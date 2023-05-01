import { ColumnsType } from 'antd/lib/table/interface';
import { useMemo } from 'react';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import { InputFormInputNumber } from 'pages/Assets/pages/UpdateAsset/containers/BaselineInputs';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import useBaselinePhases from 'pages/Assets/pages/UpdateAsset/hooks/useBaselinePhases';
import useBaselineModes from 'pages/Assets/pages/UpdateAsset/hooks/useBaselineModes';

const useEmissionReductionInitiativeInputsColumns = () => {
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const { data: phasesData } = useBaselinePhases(assetId, activeBaselineId);
  const { data: modesData } = useBaselineModes(assetId, activeBaselineId);

  return useMemo(() => {
    const columns: ColumnsType<number[]> = [
      {
        title: 'Phase',
        key: 'phase',
        width: 192,
        fixed: 'left',
        render: (value, record, index) => {
          return (phasesData || [])[index]?.name;
        },
      },
    ];
    for (const [modeIndex, mode] of (modesData || []).entries()) {
      columns.push({
        title: mode.name,
        key: `mode-${mode.id}`,
        width: 225,
        render: (value, record, index) => {
          return (
            <InputFormInputNumber name={`inputs[${index}][${modeIndex}]`} />
          );
        },
      });
    }
    return columns;
  }, [modesData, phasesData]);
};

export default useEmissionReductionInitiativeInputsColumns;
