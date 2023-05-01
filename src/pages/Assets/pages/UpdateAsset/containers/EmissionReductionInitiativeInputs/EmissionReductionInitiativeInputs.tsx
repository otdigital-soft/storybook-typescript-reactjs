import { useInputsHeight } from 'pages/Assets/pages/UpdateAsset/containers/InputsHeightProvider';
import { InputTable } from './EmissionReductionInitiativeInputs.styled';
import { useFormikContext } from 'formik';
import { FormValues } from 'pages/Assets/pages/UpdateAsset/containers/EmissionReductionInitiativeForm';
import useEmissionReductionInitiativeInputsColumns from 'pages/Assets/pages/UpdateAsset/hooks/useEmissionReductionInitiativeInputsColumns';

const EmissionReductionInitiativeInputs = () => {
  const columns = useEmissionReductionInitiativeInputsColumns();
  const inputsHeight = useInputsHeight();
  const {
    values: { inputs },
  } = useFormikContext<FormValues>();
  return (
    <InputTable
      pagination={false}
      columns={columns}
      scroll={{
        x: 'max-content',
        y: inputsHeight ? inputsHeight : undefined,
      }}
      dataSource={inputs}
      rowKey={(record, index) => Number(index)}
    />
  );
};

export default EmissionReductionInitiativeInputs;
