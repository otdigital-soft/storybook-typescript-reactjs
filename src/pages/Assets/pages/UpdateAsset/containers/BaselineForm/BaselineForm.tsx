import Box from 'components/Box';
import { useFormikContext } from 'formik';
import { Alert, Form, Col } from 'antd';
import { Row } from 'components/Grid';
import { LABELS as labels, FormValues, Season } from './form';
import { prettyPlaceholder } from 'utils/format';
import FormInput from 'components/FormInput';
import { isSafeToShow } from 'utils/safety';
import { STATUS_OPTIONS } from 'pages/Assets/form';
import FormSelect from 'components/FormSelect';
import Tabs from 'components/Tabs';
import BaselineInputs from '../BaselineInputs';

const BaselineForm = () => {
  const { status, values, setFieldValue } = useFormikContext<FormValues>();

  return (
    <Form layout="vertical">
      {isSafeToShow(status) ? (
        <Box marginBottom={20}>
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box>
        <Row gutter={12}>
          <Col span={7}>
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
          <Col span={9}>
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
          <Col span={8}>
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
      <Box marginTop={5} position="relative">
        <Tabs
          activeKey={values.activeSeason}
          onChange={(key) => setFieldValue('activeSeason', key as Season)}
          type="card"
          size="large"
          destroyInactiveTabPane
        >
          <Tabs.TabPane tab="Summer" key={Season.Summer}>
            <Box marginTop={19}>
              <BaselineInputs season={Season.Summer} />
            </Box>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Winter" key={Season.Winter}>
            <Box marginTop={19}>
              <BaselineInputs season={Season.Winter} />
            </Box>
          </Tabs.TabPane>
        </Tabs>
      </Box>
    </Form>
  );
};

export default BaselineForm;
