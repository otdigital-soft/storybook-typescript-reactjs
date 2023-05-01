import { Alert, Button, Col, Form, Row } from 'antd';
import { CustomWellDetails } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import useBack from 'hooks/useBack';
import useUpdateWellForm from 'containers/UpdateWellForm/useUpdateWellForm';
import { Formik } from 'formik';
import FormInput from 'components/FormInput';
import { toLowerCaseFirstLetter } from 'utils/format';
import { SubmitRow } from 'components/Row';
import { FormValues } from './types';
import { WELL_LABELS as labels } from 'consts/wells';
import Divider from 'components/Divider';
import CompletionData from './CompletionData';
import DrillingSettings from './DrillingSettings';
import General from './General';

interface UpdateWellFormProps {
  wellData: CustomWellDetails;
  onSuccess?: () => void;
}

const UpdateWellForm = ({ wellData, onSuccess }: UpdateWellFormProps) => {
  const { handleBack } = useBack();
  const { schema, onUpdate, initialValues, onClear } = useUpdateWellForm(
    wellData,
    onSuccess,
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, formikHelpers) => onUpdate({ values, formikHelpers })}
      initialValues={initialValues}
      validateOnChange={false}
    >
      {(formikHelpers) => {
        const { submitForm, isSubmitting, isValid, status } = formikHelpers;
        return (
          <>
            {status ? (
              <Box mb="10px">
                <Alert message={status} type="error" showIcon />
              </Box>
            ) : undefined}
            <Form layout="vertical">
              <Row gutter={35}>
                <Col span={6}>
                  <FormInput<FormValues>
                    name="name"
                    formItemProps={{ label: labels.name }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.name,
                      )}`,
                    }}
                  />
                </Col>
                <Col span={18}>
                  <Flexbox mt="30px" justifyContent="flex-end">
                    <Button
                      type="primary"
                      danger
                      onClick={() => onClear(formikHelpers)}
                    >
                      Clear data
                    </Button>
                  </Flexbox>
                </Col>
              </Row>
            </Form>
            <Form layout="horizontal">
              <Box marginY={30}>
                <Divider />
              </Box>

              <General />

              <Box marginY={30}>
                <Divider />
              </Box>
              <DrillingSettings />

              <Box marginY={30}>
                <Divider />
              </Box>

              <CompletionData />
            </Form>

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
          </>
        );
      }}
    </Formik>
  );
};

export default UpdateWellForm;
