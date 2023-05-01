import { Alert, Button, Checkbox, Form, Input, Spin } from 'antd';
import useSignIn from './useSignIn';
import Box, { Flexbox } from 'components/Box';
import Link from 'components/Link';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Login } from 'api/schema';
import { PasswordItem } from './SignIn.styled';
import { Title } from 'components/Typography';
import CheckboxFormItem from 'components/CheckboxFormItem';
import { useTheme } from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { createRef } from 'react';
import useLocked from 'pages/SignIn/useLocked';
import Center from 'components/Center';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Provide valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  show_recaptcha: yup.boolean(),
  recaptcha: yup.string().when('show_recaptcha', {
    is: true,
    then: yup.string().required('You must solve captcha'),
  }),
});

export type InitialValues = Omit<Login, 'recaptcha'> & {
  recaptcha: string;
  show_recaptcha: boolean;
};

const SignIn = () => {
  const { colors } = useTheme();
  const { mutateAsync: onSignIn } = useSignIn();
  const { data: lockedData, isLoading: isLoadingLocked } = useLocked();
  const recaptchaRef = createRef<ReCAPTCHA>();
  const initialValues: InitialValues = {
    email: '',
    password: '',
    remember_me: false,
    recaptcha: '',
    show_recaptcha: lockedData ? lockedData.locked : true,
  };

  if (isLoadingLocked) {
    return (
      <Center mt="248px">
        <Spin size="large" />
      </Center>
    );
  }

  return (
    <Box width="320px">
      <Box mt="27px">
        <Title level={3} color={colors.text.header} textAlign="center">
          Login to your account
        </Title>
      </Box>
      <Box justifyContent="center" mt="3px">
        <Title
          level={5}
          type="secondary"
          fontWeight="normal"
          textAlign="center"
        >
          Welcome back! Please enter your details.
        </Title>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          const reCaptcha = recaptchaRef?.current;
          const resetCaptcha = () => {
            reCaptcha?.reset();
          };
          return onSignIn({
            values,
            formikHelpers,
            resetCaptcha,
          });
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
          setFieldValue,
        }) => (
          <Flexbox mt={status ? '38px' : '88px'} flexDirection="column">
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
              <PasswordItem
                label="Password"
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
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
              </PasswordItem>

              <CheckboxFormItem
                validateStatus={
                  errors.remember_me && touched.remember_me
                    ? 'error'
                    : undefined
                }
                help={
                  errors.remember_me && touched.remember_me
                    ? errors.remember_me
                    : undefined
                }
              >
                <Flexbox justifyContent="space-between" mt="14px">
                  <Checkbox
                    checked={values.remember_me}
                    onChange={(e) =>
                      setFieldValue('remember_me', e.target.checked)
                    }
                    name="remember_me"
                  >
                    Remember for 30 days
                  </Checkbox>

                  <Link to="/forgot-password/" strong>
                    Forgot password?
                  </Link>
                </Flexbox>
              </CheckboxFormItem>

              {values.show_recaptcha ? (
                <Box marginTop="31px">
                  <Form.Item
                    validateStatus={
                      errors.recaptcha && touched.recaptcha
                        ? 'error'
                        : undefined
                    }
                    help={
                      errors.recaptcha && touched.recaptcha
                        ? errors.recaptcha
                        : undefined
                    }
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={
                        process.env.REACT_APP_RECAPTCHA_SITE_KEY as string
                      }
                      onChange={(token) => {
                        setFieldValue('recaptcha', token || '');
                      }}
                    />
                  </Form.Item>
                </Box>
              ) : null}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  block
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </Flexbox>
        )}
      </Formik>
    </Box>
  );
};

export default SignIn;
