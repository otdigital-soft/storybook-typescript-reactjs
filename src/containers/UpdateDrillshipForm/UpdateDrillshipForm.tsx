import { CustomDrillshipDetails } from 'api/schema';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { Formik } from 'formik';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import FormInput from 'components/FormInput';
import { SEMI_LABELS as labels } from 'consts/rigs';
import { toLowerCaseFirstLetter } from 'utils/format';
import Divider from 'components/Divider';
import { Title } from 'components/Typography';
import { SubmitRow } from 'components/Row';
import useUpdateDrillshipForm from './useUpdateDrillshipForm';
import { FormValues } from './form';
import { emptyFormValues } from 'containers/UpdateDrillshipForm/utils';
import GeneralInformationForm from './GeneralInformationForm';
import OperationEmissionEfficiencyForm from './OperationEmissionEfficiencyForm';
import CapacitiesForm from './CapacitiesForm';

const UpdateDrillshipForm = ({
  drillshipData,
}: {
  drillshipData: CustomDrillshipDetails;
}) => {
  const { handleBack } = useBack(routes.launch);
  const { schema, updateDrillship, initialValues } =
    useUpdateDrillshipForm(drillshipData);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, formikHelpers) =>
        updateDrillship({ values, formikHelpers })
      }
      initialValues={initialValues}
      validateOnChange={false}
    >
      {({ submitForm, isSubmitting, isValid, setValues, status }) => (
        <Form layout="vertical">
          <Box marginX={24} marginTop={20} marginBottom={81}>
            {status ? (
              <Box mb="10px">
                <Alert message={status} type="error" showIcon />
              </Box>
            ) : null}
            <Row gutter={35}>
              <Col span={6}>
                <Form.Item label="Rig type">
                  <Input value={'Drillship'} disabled={true} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <FormInput<FormValues>
                  name="name"
                  formItemProps={{ label: labels.name }}
                  inputProps={{
                    placeholder: `Enter ${toLowerCaseFirstLetter(labels.name)}`,
                  }}
                />
              </Col>
              <Col span={12}>
                <Flexbox mt="30px" justifyContent="flex-end">
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setValues(emptyFormValues, true);
                    }}
                  >
                    Clear data
                  </Button>
                </Flexbox>
              </Col>
            </Row>
            <Divider height={31} />
            <Row gutter={35}>
              <Col span={12}>
                <Box mb="20px">
                  <Title level={5} type="secondary">
                    General information
                  </Title>
                </Box>

                <GeneralInformationForm />

                <Divider height={31} />

                <Box mb="20px">
                  <Title level={5} type="secondary">
                    Operation & emission efficiency
                  </Title>
                </Box>

                <OperationEmissionEfficiencyForm />
              </Col>
              <Col span={12}>
                <Box mb="20px">
                  <Title level={5} type="secondary">
                    Capacities
                  </Title>
                </Box>

                <CapacitiesForm />
              </Col>
            </Row>
          </Box>
          <SubmitRow>
            <>
              <Button onClick={handleBack}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitForm}
                disabled={isSubmitting || !isValid}
              >
                Save
              </Button>
            </>
          </SubmitRow>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateDrillshipForm;
