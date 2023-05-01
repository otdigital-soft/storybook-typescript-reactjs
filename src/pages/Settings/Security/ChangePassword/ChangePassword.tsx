import { Button, Input, Form } from 'antd';
import Box from 'components/Box';
import { Formik } from 'formik';
import * as yup from 'yup';
import useChangePassword from './useChangePassword';

const schema = yup.object().shape({
  old_password: yup.string().required('Current password is required'),
  new_password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
    .notOneOf(
      [yup.ref('old_password'), null],
      'New password can not be the same as the old one',
    ),
  repeat_new_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords do not match')
    .required('Repeat new password is required'),
});

export type ChangePasswordFormValues = {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
};

const ChangePassword = () => {
  const { mutateAsync: onChangePassword } = useChangePassword();

  return (
    <Box width={355}>
      <Formik
        validationSchema={schema}
        initialValues={{
          old_password: '',
          new_password: '',
          repeat_new_password: '',
        }}
        onSubmit={(values, formikHelpers) =>
          onChangePassword({ values, formikHelpers })
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          submitForm,
        }) => (
          <Form layout="vertical">
            <Form.Item
              validateStatus={
                errors.old_password && touched.old_password
                  ? 'error'
                  : undefined
              }
              help={
                errors.old_password && touched.old_password
                  ? errors.old_password
                  : undefined
              }
              label="Current password"
            >
              <Input
                type="password"
                placeholder="Enter old password"
                value={values.old_password}
                onChange={handleChange('old_password')}
                onBlur={handleBlur('old_password')}
              />
            </Form.Item>
            <Form.Item
              validateStatus={
                errors.new_password && touched.new_password
                  ? 'error'
                  : undefined
              }
              help={
                errors.new_password && touched.new_password
                  ? errors.new_password
                  : undefined
              }
              label="New password"
            >
              <Input
                type="password"
                placeholder="Enter new password"
                value={values.new_password}
                onChange={handleChange('new_password')}
                onBlur={handleBlur('new_password')}
              />
            </Form.Item>
            <Form.Item
              validateStatus={
                errors.repeat_new_password && touched.repeat_new_password
                  ? 'error'
                  : undefined
              }
              help={
                errors.repeat_new_password && touched.repeat_new_password
                  ? errors.repeat_new_password
                  : undefined
              }
              label="Repeat password"
            >
              <Input
                type="password"
                placeholder="Repeat new password"
                value={values.repeat_new_password}
                onChange={handleChange('repeat_new_password')}
                onBlur={handleBlur('repeat_new_password')}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={submitForm}
              disabled={isSubmitting}
              block
            >
              Change
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
