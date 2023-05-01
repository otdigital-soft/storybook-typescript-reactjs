import { Col, Row } from 'antd';
import ElementCard from 'components/ElementCard';
import SelectDraftTypeCard from './SelectDraftTypeCard';
import useCreateRigForm, { CreateRigDraftType } from '../../useCreateRigForm';

interface SelectDraftTypeListProps {
  loading?: boolean;
  customCount?: number;
  conceptCount?: number;
}

const SelectDraftTypeList = ({
  customCount,
  conceptCount,
  loading,
}: SelectDraftTypeListProps) => {
  const { draftType, onDraftTypeChange } = useCreateRigForm();

  return (
    <Row gutter={[24, 18]}>
      <Col span={24}>
        <ElementCard
          title="Empty"
          description="You will have to ful fill all data by yourself"
          onClick={() => onDraftTypeChange()}
        />
      </Col>
      <Col span={24}>
        <SelectDraftTypeCard
          loading={loading}
          disabled={conceptCount === 0}
          title={`List of Concept Rigs(${conceptCount})`}
          onClick={() => onDraftTypeChange(CreateRigDraftType.Concept)}
          active={draftType === CreateRigDraftType.Concept}
        />
      </Col>
      <Col span={24}>
        <SelectDraftTypeCard
          loading={loading}
          disabled={customCount === 0}
          title={`List of Custom Rigs(${customCount})`}
          onClick={() => onDraftTypeChange(CreateRigDraftType.Custom)}
          active={draftType === CreateRigDraftType.Custom}
        />
      </Col>
    </Row>
  );
};

export default SelectDraftTypeList;
