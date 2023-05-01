import { Alert, Button, Form, Input, Spin } from 'antd';
import Box, { Flexbox } from 'components/Box';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from 'components/Typography';
import useChangeForgottenPassword from './useChangeForgottenPassword';
import usePasswordResetToken from './usePasswordResetToken';
import Center from 'components/Center';
import { PublicResult } from 'containers/Public/Public.styled';
import { useTheme } from 'styled-components';
import Logger from 'utils/logger';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  password_confirm: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export type ChangeForgottenPasswordFormValues = {
  password: string;
  password_confirm: string;
};

const ChangeForgottenPassword = () => {
  const { colors } = useTheme();
  const { mutateAsync: onPasswordChange, isPasswordChanged } =
    useChangeForgottenPassword();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const {
    isLoading: isLoadingPasswordResetToken,
    error: passwordResetTokenError,
    data: passwordResetTokenValid,
  } = usePasswordResetToken(token, uid);
  const navigate = useNavigate();
  const initialValues: ChangeForgottenPasswordFormValues = {
    password: '',
    password_confirm: '',
  };
  const goToLogin = () => {
    navigate('/signin/');
  };
  const goToPasswordReset = () => {
    navigate('/forgot-password/');
  };

  if (isLoadingPasswordResetToken) {
    return (
      <Center mt="248px">
        <Spin size="large" />
      </Center>
    );
  }

  if (passwordResetTokenError) {
    return (
      <PublicResult
        status="error"
        title="Verification error."
        subTitle="Your password reset link cannot be verified right now. Please try later."
      />
    );
  }

  if (isPasswordChanged) {
    return (
      <PublicResult
        status="success"
        title="Password changed successfully."
        subTitle="You can now login to your account with new credentials."
        extra={
          <Button type="primary" onClick={goToLogin}>
            Back to login
          </Button>
        }
      />
    );
  }

  if (!passwordResetTokenValid) {
    return (
      <PublicResult
        status="error"
        title="Your password reset link is not valid, or already used."
        subTitle="Please request a new password reset link."
        extra={
          <Button type="primary" onClick={goToPasswordReset}>
            Back to password reset
          </Button>
        }
      />
    );
  }

  return (
    <Box width="320px">
      <Box mt="27px">
        <Title level={3} color={colors.text.header} textAlign="center">
          Change password
        </Title>
      </Box>
      <Box mt="3px">
        <Title
          level={5}
          type="secondary"
          fontWeight="normal"
          textAlign="center"
        >
          Please enter your new password.
        </Title>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          if (!uid || !token) {
            Logger.error('Unable to change password. Missing uid or token', {
              uid,
              token,
            });
            return;
          }
          return onPasswordChange({ values, uid, token, formikHelpers });
        }}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          values,
          status,
          touched,
          submitForm,
          isSubmitting,
        }) => (
          <Flexbox mt={status ? '38px' : '88px'} flexDirection="column">
            <Form layout="vertical">
              {status ? (
                <Box mb="10px">
                  <Alert message={status} type="error" showIcon />
                </Box>
              ) : undefined}
              <Form.Item
                label="New password"
                validateStatus={
                  errors.password && touched.password ? 'error' : undefined
                }
                help={
                  errors.password && touched.password
                    ? errors.password
                    : undefined
                }
              >
                <Input
                  placeholder="Enter new password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
              </Form.Item>

              <Form.Item
                label="Repeat password"
                validateStatus={
                  errors.password_confirm && touched.password_confirm
                    ? 'error'
                    : undefined
                }
                help={
                  errors.password_confirm && touched.password_confirm
                    ? errors.password_confirm
                    : undefined
                }
              >
                <Input
                  placeholder="Enter new password"
                  name="password_confirm"
                  type="password"
                  value={values.password_confirm}
                  onChange={handleChange('password_confirm')}
                  onBlur={handleBlur('password_confirm')}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  block
                >
                  Change password
                </Button>
              </Form.Item>
            </Form>
          </Flexbox>
        )}
      </Formik>
    </Box>
  );
};

export default ChangeForgottenPassword;
