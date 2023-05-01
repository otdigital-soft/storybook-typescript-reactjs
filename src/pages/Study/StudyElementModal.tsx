import Modal from 'components/Modal';
import { Formik, FormikHelpers } from 'formik';
import StudyElementForm from 'pages/Study/StudyElementForm';
import { FormValues } from 'pages/Study/StudyElementForm/types';
import * as yup from 'yup';
import { useRef } from 'react';
import { FormikProps } from 'formik/dist/types';

interface StudyElementModalProps {
  initialValues: FormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: yup.ObjectSchema<any>;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => Promise<void>;
  title: string;
}

const StudyElementModal = ({
  initialValues,
  schema,
  visible,
  onCancel,
  onSubmit,
  title,
}: StudyElementModalProps) => {
  const formRef = useRef<FormikProps<FormValues>>(null);

  return (
    <Modal
      title={title}
      visible={visible}
      destroyOnClose={true}
      onOk={() => formRef.current?.submitForm()}
      onCancel={onCancel}
      width={1160}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
        innerRef={formRef}
        validateOnChange={false}
      >
        <StudyElementForm />
      </Formik>
    </Modal>
  );
};

export default StudyElementModal;
