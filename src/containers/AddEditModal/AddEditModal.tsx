import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useRef } from 'react';
import { FormikProps } from 'formik/dist/types';
import { Modal } from './AddEditModal.styled';

interface AddEditModalProps<FormValues> {
  initialValues: FormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: yup.ObjectSchema<any>;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => void;
  title: string;
  okText: string;
  children?: JSX.Element;
}

const AddEditModal = <FormValues extends Record<string, unknown>>({
  initialValues,
  schema,
  visible,
  onCancel,
  onSubmit,
  title,
  okText,
  children,
}: AddEditModalProps<FormValues>) => {
  const formRef = useRef<FormikProps<FormValues>>(null);

  return (
    <Modal
      title={title}
      visible={visible}
      destroyOnClose={true}
      okText={okText}
      onOk={() => formRef.current?.submitForm()}
      onCancel={onCancel}
      width={663}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
        innerRef={formRef}
        validateOnChange={false}
      >
        {children}
      </Formik>
    </Modal>
  );
};

export default AddEditModal;
