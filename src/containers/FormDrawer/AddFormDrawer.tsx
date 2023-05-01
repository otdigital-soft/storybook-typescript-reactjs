import { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Formik, FormikHelpers } from 'formik';
import { FormikProps } from 'formik/dist/types';
import Drawer from './Drawer';
import {
  AddEditAction,
  useAddEditActions,
} from 'containers/AddEditActionsProvider';
import { useRef } from 'react';
import * as yup from 'yup';
import { DrawerProps } from 'antd/lib/drawer';
import Center from 'components/Center';
import { Spin } from 'antd';

interface AddFormDrawerProps<
  FormValues,
  SubmitReturnType,
  AddEditActionContextType,
> {
  title: string;
  isSubmitting: boolean;
  onSubmit: (data: {
    values: FormValues;
    formikHelpers: FormikHelpers<FormValues>;
  }) => Promise<SubmitReturnType>;
  initialValues: FormValues;
  validationSchema: yup.SchemaOf<FormValues>;
  children: React.ReactNode;
  width: number;
  footerExtra?: React.ReactNode;
  loading?: boolean;
  validateOnChange?: boolean;
  bodyStyle?: DrawerProps['bodyStyle'];
  context: AddEditActionContextType;
}

const AddFormDrawer = <
  FormValues extends Record<string, unknown>,
  SubmitReturnType,
  AddEditActionContextType extends string,
>({
  title,
  isSubmitting,
  onSubmit,
  initialValues,
  validationSchema,
  children,
  width,
  footerExtra,
  validateOnChange,
  bodyStyle,
  loading,
  context,
}: AddFormDrawerProps<
  FormValues,
  SubmitReturnType,
  AddEditActionContextType
>) => {
  const { action, onCloseDrawer } =
    useAddEditActions<AddEditActionContextType>(context);
  const formRef = useRef<FormikProps<FormValues>>(null);

  return (
    <Drawer
      title={title}
      visible={action === AddEditAction.Add}
      width={width}
      destroyOnClose={true}
      onClose={onCloseDrawer}
      bodyStyle={bodyStyle}
      footer={
        <Flexbox gap={8}>
          <Button onClick={onCloseDrawer}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            onClick={() => formRef.current?.submitForm()}
          >
            Add
          </Button>
          {footerExtra}
        </Flexbox>
      }
    >
      {loading ? (
        <Center paddingY={20}>
          <Spin />
        </Center>
      ) : (
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          innerRef={formRef}
          validateOnChange={validateOnChange}
          onSubmit={(values, formikHelpers) => {
            onSubmit({
              values,
              formikHelpers,
            });
          }}
        >
          {children}
        </Formik>
      )}
    </Drawer>
  );
};

export default AddFormDrawer;
