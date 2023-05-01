import { SubmitRow } from 'components/Row';
import { Button } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import EMPBaseForm, {
  FormValues,
  schema as formSchema,
} from 'containers/EMPForm/EMPBaseForm';

interface EMPFormProps {
  initialValues: FormValues;
  schema: typeof formSchema;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => void;
  handleBack: () => void;
  onClear?: (formikHelpers: FormikHelpers<FormValues>) => void;
}

const EMPForm = ({
  schema,
  initialValues,
  onSubmit,
  handleBack,
  onClear,
}: EMPFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {(formikHelpers) => {
        const { submitForm, isSubmitting, isValid } = formikHelpers;
        const handleOnClear = onClear
          ? () => onClear(formikHelpers)
          : undefined;
        return (
          <EMPBaseForm onClear={handleOnClear}>
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
          </EMPBaseForm>
        );
      }}
    </Formik>
  );
};

export default EMPForm;
