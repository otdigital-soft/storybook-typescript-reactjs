import Box from 'components/Box';
import { useFormikContext } from 'formik';
import { Alert, Form, Col } from 'antd';
import { Row } from 'components/Grid';
import { LABELS as labels, FormValues } from './form';
import { prettyPlaceholder } from 'utils/format';
import FormInput from 'components/FormInput';
import { isSafeToShow } from 'utils/safety';

const WellNameForm = () => {
  const { status } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginTop={18}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box marginTop={18}>
        <Row>
          <Col span={11}>
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
          <Col span={13} />
        </Row>
      </Box>
    </Form>
  );
};

export default WellNameForm;
