import Box from 'components/Box';
import { useFormikContext } from 'formik';
import { Alert, Form, Col } from 'antd';
import { Row } from 'components/Grid';
import { LABELS as labels, FormValues } from './form';
import { prettyPlaceholder } from 'utils/format';
import FormInput from 'components/FormInput';
import { isSafeToShow } from 'utils/safety';
import { STATUS_OPTIONS } from 'pages/Assets/form';
import FormSelect from 'components/FormSelect';

const EmissionManagementPlanForm = () => {
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginBottom={20}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box>
        <Row gutter={10}>
          <Col span={6}>
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
          <Col span={6}>
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
          <Col span={6}>
            <FormInput<FormValues>
              name="version"
              formItemProps={{
                label: labels.version,
                required: true,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.version}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormSelect<FormValues>
              name="draft"
              formItemProps={{
                label: labels.draft,
                required: true,
              }}
              options={STATUS_OPTIONS}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.draft}`,
              }}
            />
          </Col>
        </Row>
      </Box>
    </Form>
  );
};

export default EmissionManagementPlanForm;
