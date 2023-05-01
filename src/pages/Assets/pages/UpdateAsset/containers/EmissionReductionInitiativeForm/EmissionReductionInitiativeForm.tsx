import { Alert, Col, Form } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP } from 'pages/Assets/consts';
import { prettyPlaceholder } from 'utils/format';
import { isSafeToShow } from 'utils/safety';
import EmissionReductionInitiativeInputs from '../EmissionReductionInitiativeInputs';
import { StyledFormDatePicker } from './EmissionReductionInitiativeForm.styled';
import { FormValues, LABELS as labels } from './form';
import FormInputNumber from 'components/FormInputNumber';
import { Text } from 'components/Typography';

const EmissionReductionInitiativeForm = () => {
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginBottom={20}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Row gutter={12}>
        <Col span={10}>
          <FormInput<FormValues>
            name="name"
            formItemProps={{
              label: labels.name,
              required: true,
            }}
            inputProps={{
              placeholder: prettyPlaceholder`Enter ${labels.name}`,
            }}
          />
        </Col>
        <Col span={14}>
          <FormInput<FormValues>
            name="description"
            formItemProps={{
              label: labels.description,
              required: true,
            }}
            inputProps={{
              placeholder: prettyPlaceholder`Enter ${labels.description}`,
            }}
          />
        </Col>
        <Col span={10}>
          <FormSelect<FormValues>
            name="type"
            formItemProps={{
              label: labels.type,
              required: true,
            }}
            options={Object.entries(
              EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP,
            ).map(([value, label]) => ({
              value,
              label,
            }))}
            selectInputProps={{
              placeholder: prettyPlaceholder`Select ${labels.type}`,
            }}
          />
        </Col>
        <Col span={10}>
          <FormInput<FormValues>
            name="vendor"
            formItemProps={{
              label: labels.vendor,
              required: true,
            }}
            inputProps={{
              placeholder: prettyPlaceholder`Enter ${labels.vendor}`,
            }}
          />
        </Col>
        <Col span={10}>
          <StyledFormDatePicker<FormValues>
            name="deployment_date"
            formItemProps={{
              label: labels.deployment_date,
              required: true,
            }}
            datePickerProps={{
              placeholder: prettyPlaceholder`Enter ${labels.deployment_date}`,
            }}
          />
        </Col>
      </Row>
      <Box>
        <Text strong>Estimated potential reduction from Baseline (%)</Text>
      </Box>
      <Row gutter={19} marginTop={15}>
        <Col span={10}>
          <FormInputNumber<FormValues>
            name="transit"
            formItemProps={{
              label: labels.transit,
              required: true,
            }}
            inputNumberProps={{
              placeholder: prettyPlaceholder`Enter ${labels.transit}`,
            }}
          />
        </Col>
      </Row>
      <EmissionReductionInitiativeInputs />
    </Form>
  );
};

export default EmissionReductionInitiativeForm;
