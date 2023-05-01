import { Alert, Col, Form, InputNumber } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { prettyNumber, prettyPlaceholder } from 'utils/format';
import { isSafeToShow } from 'utils/safety';
import { FormValues, LABELS as labels } from './form';

const HelicopterTypeForm = () => {
  const { status, values } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginBottom={23}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Row gutter={29}>
        <>
          <Col span={12}>
            <FormInput<FormValues>
              name="type"
              formItemProps={{
                label: labels.type,
                required: true,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.type}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="fuel_density"
              formItemProps={{
                label: labels.fuel_density,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.fuel_density}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="co2_per_fuel"
              formItemProps={{
                label: labels.co2_per_fuel,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.co2_per_fuel}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="nox_per_fuel"
              formItemProps={{
                label: labels.nox_per_fuel,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.nox_per_fuel}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="fuel_consumption"
              formItemProps={{
                label: labels.fuel_consumption,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.fuel_consumption}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="fuel_cost"
              formItemProps={{
                label: labels.fuel_cost,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.fuel_cost}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="co2_tax"
              formItemProps={{
                label: labels.co2_tax,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.co2_tax}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="nox_tax"
              formItemProps={{
                label: labels.nox_tax,
                required: true,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.nox_tax}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
        <>
          <Col span={12}>
            <Form.Item label={labels.total_fuel_cost}>
              <InputNumber
                formatter={prettyNumber}
                disabled={true}
                value={(
                  Number(values.fuel_cost) +
                  Number(values.co2_tax) +
                  Number(values.nox_tax)
                ).toFixed(2)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12} />
        </>
      </Row>
    </Form>
  );
};

export default HelicopterTypeForm;
