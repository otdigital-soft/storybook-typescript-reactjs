import { Alert, Col, Form } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import { Row } from 'components/Grid';
import { useFormikContext } from 'formik';
import { prettyPlaceholder } from 'utils/format';
import { isSafeToShow } from 'utils/safety';
import {
  FormValues,
  LABELS as labels,
  MATERIAL_CATEGORY_OPTIONS,
} from './form';

const MaterialTypeForm = ({ edit }: { edit?: boolean }) => {
  const { status } = useFormikContext<FormValues>();

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
            <FormSelect<FormValues>
              name="category"
              formItemProps={{
                label: labels.category,
                required: true,
              }}
              options={MATERIAL_CATEGORY_OPTIONS}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.category}`,
                disabled: edit,
              }}
            />
          </Col>
          <Col span={12} />
        </>
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
            <FormInput<FormValues>
              name="unit"
              formItemProps={{
                label: labels.unit,
                required: true,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.unit}`,
              }}
            />
          </Col>
          <Col span={12}></Col>
        </>
        <>
          <Col span={12}>
            <FormInputNumber<FormValues>
              name="co2"
              formItemProps={{
                label: labels.co2,
                required: true,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.co2}`,
              }}
            />
          </Col>
          <Col span={12} />
        </>
      </Row>
    </Form>
  );
};

export default MaterialTypeForm;
