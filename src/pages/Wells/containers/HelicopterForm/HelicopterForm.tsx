import { Alert, Col, Form } from 'antd';
import Box from 'components/Box';
import FormSelect from 'components/FormSelect';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { prettyPlaceholder } from 'utils/format';
import { FormValues, LABELS as labels } from './form';
import FormInputNumber from 'components/FormInputNumber';
import useHelicopterTypesOptions from 'pages/WellPlan/hooks/useHelicopterTypesOptions';

const HelicopterForm = () => {
  const helicopterTypesOptions = useHelicopterTypesOptions();
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {status && typeof status === 'string' ? (
        <Box marginBottom={23}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Row gutter={29}>
        <>
          <Col span={12}>
            <FormSelect<FormValues>
              name="helicopter_type"
              formItemProps={{
                label: labels.helicopter_type,
                required: true,
              }}
              options={helicopterTypesOptions}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.helicopter_type}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="trips"
              formItemProps={{
                label: labels.trips,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.trips}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="trip_duration"
              formItemProps={{
                label: labels.trip_duration,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.trip_duration}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="exposure_against_current_well"
              formItemProps={{
                label: labels.exposure_against_current_well,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.exposure_against_current_well}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="quota_obligation"
              formItemProps={{
                label: labels.quota_obligation,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.quota_obligation}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
      </Row>
    </Form>
  );
};

export default HelicopterForm;
