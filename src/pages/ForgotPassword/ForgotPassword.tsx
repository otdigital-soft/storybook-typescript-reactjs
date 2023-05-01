import { Alert, Button, Form, Input } from 'antd';
import useResetPassword from './useResetPassword';
import Box, { Flexbox } from 'components/Box';
import * as yup from 'yup';
import { Formik } from 'formik';
import { PasswordReset } from 'api/schema';
import { useNavigate } from 'react-router-dom';
import { Title } from 'components/Typography';
import { PublicResult } from 'containers/Public/Public.styled';
import { useTheme } from 'styled-components';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Provide valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const { colors } = useTheme();
  const { mutateAsync: onPasswordReset, isPasswordResetEmailSent } =
    useResetPassword();
  const navigate = useNavigate();
  const initialValues: PasswordReset = {
    email: '',
  };
  const goToLogin = () => {
    navigate('/signin/');
  };

  if (isPasswordResetEmailSent) {
    return (
      <PublicResult
        status="success"
        title="Request sent."
        subTitle="We’ve received your request. You will be informed by e-mail shortly, how to change your password."
        extra={
          <Button type="primary" onClick={goToLogin}>
            Back to login
          </Button>
        }
      />
    );
  }

  return (
    <Box width="320px">
      <Box mt="27px">
        <Title level={3} color={colors.text.header} textAlign="center">
          Forgot your password?
        </Title>
      </Box>
      <Box mt="3px">
        <Title
          level={5}
          type="secondary"
          fontWeight="normal"
          textAlign="center"
        >
          Just fill in your email and we’ll send you a link to reset your
          password.
        </Title>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) =>
          onPasswordReset({ values, formikHelpers })
        }
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
          <Flexbox mt={status ? '38px' : '64px'} flexDirection="column">
            <Form layout="vertical">
              {status ? (
                <Box mb="10px">
                  <Alert message={status} type="error" showIcon />
                </Box>
              ) : undefined}
              <Form.Item
                label="Email"
                validateStatus={
                  errors.email && touched.email ? 'error' : undefined
                }
                help={errors.email && touched.email ? errors.email : undefined}
              >
                <Input
                  placeholder="Enter your email"
                  name="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
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
                  Send
                </Button>
                <Box mt={14}>
                  <Button block onClick={goToLogin}>
                    Cancel
                  </Button>
                </Box>
              </Form.Item>
            </Form>
          </Flexbox>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
