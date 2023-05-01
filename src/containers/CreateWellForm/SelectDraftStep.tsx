import useCustomWells from 'hooks/useCustomWells';
import { Col, Row } from 'antd';
import ElementCard from 'components/ElementCard';
import SelectDraftTypeCard from 'containers/CreateRigForm/SelectDraftTypeStep/SelectDraftTypeList/SelectDraftTypeCard';
import useCreateWellForm from 'containers/CreateWellForm/useCreateWellForm';
import { DraftType } from 'containers/CreateWellForm/CreateWellFormProvider';
import useConceptWells from 'hooks/useConceptWells';
import { Title } from 'components/Typography';
import Box from 'components/Box';

const SelectDraftStep = () => {
  const { data: conceptWellsData, isLoading: isLoadingConceptWells } =
    useConceptWells({ pageSize: 1 });
  const { data: customWellsData, isLoading: isLoadingCustomWells } =
    useCustomWells({ initialPageSize: 1, draft: false });
  const { draftType, selectDraftType } = useCreateWellForm();

  return (
    <>
      <Box marginBottom={20}>
        <Title level={5} type="secondary">
          Select well
        </Title>
      </Box>
      <Row gutter={[24, 18]}>
        <Col span={24}>
          <ElementCard
            title="Empty"
            description="You will have to ful fill all data by yourself"
            onClick={() => selectDraftType(DraftType.Empty)}
          />
        </Col>
        <Col span={24}>
          <SelectDraftTypeCard
            loading={isLoadingConceptWells}
            disabled={conceptWellsData?.count === 0}
            title={`List of Concept Wells(${conceptWellsData?.count || 0})`}
            onClick={() => selectDraftType(DraftType.Concept)}
            active={draftType === DraftType.Concept}
          />
        </Col>
        <Col span={24}>
          <SelectDraftTypeCard
            loading={isLoadingCustomWells}
            disabled={customWellsData?.count === 0}
            title={`List of Custom Wells(${customWellsData?.count || 0})`}
            onClick={() => selectDraftType(DraftType.Custom)}
            active={draftType === DraftType.Custom}
          />
        </Col>
      </Row>
    </>
  );
};

export default SelectDraftStep;
