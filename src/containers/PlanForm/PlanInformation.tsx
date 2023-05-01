import { Button, Col } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import FormTextArea from 'components/FormTextArea';
import { Row } from 'components/Grid';
import { Title } from 'components/Typography';
import { FormValues, labels } from 'containers/PlanForm/form';
import { useFormikContext } from 'formik';
import { prettyPlaceholder } from 'utils/format';
import { encodeRig } from 'utils/rigs';

interface PlanInformationProps {
  onClear?: () => void;
}

const PlanInformation = ({ onClear }: PlanInformationProps) => {
  const {
    values: { projectRigs },
  } = useFormikContext<FormValues>();

  return (
    <>
      <Box marginBottom={8}>
        <Title level={5} type="secondary">
          Plan Definition
        </Title>
      </Box>

      <Box display={onClear ? 'flex' : 'block'}>
        <Row gutter={[35, 20]} flexGrow={1}>
          <Col span={6}>
            <FormInput<FormValues>
              name="name"
              formItemProps={{
                label: labels.name,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.name}`,
              }}
            />
          </Col>
          <Col span={18}>
            <FormTextArea<FormValues>
              name="description"
              formItemProps={{
                label: labels.description,
              }}
              textAreaProps={{
                placeholder: prettyPlaceholder`Enter ${labels.description}`,
                rows: 4,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInput<FormValues>
              name="block_name"
              formItemProps={{
                label: labels.block_name,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.block_name}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="distance_from_tug_base_to_previous_well"
              formItemProps={{
                label: labels.distance_from_tug_base_to_previous_well,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.distance_from_tug_base_to_previous_well}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormSelect<FormValues>
              name="reference_rig"
              formItemProps={{ label: labels.reference_rig }}
              options={
                projectRigs?.map((rigData) => ({
                  value: encodeRig(rigData),
                  label: rigData.name,
                })) || []
              }
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.reference_rig}`,
              }}
            />
          </Col>
        </Row>
        {onClear ? (
          <Box marginLeft={27} marginTop={30} flexShrink={0}>
            <Button type="primary" danger onClick={onClear}>
              Clear data
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default PlanInformation;
