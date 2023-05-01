import { Alert, Button, Form, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Box, { Flexbox } from 'components/Box';
import CheckboxFormItem from 'components/CheckboxFormItem';
import { Title } from 'components/Typography';
import { PublicResult } from 'containers/Public/Public.styled';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import AcceptPrivacyPolicy from 'components/AcceptPrivacyPolicy';
import PhoneInput from 'components/PhoneInput';
import useSignUp, { TenantInvitationData } from './useSignUp';
import { useTheme } from 'styled-components';

interface SignUpProps {
  token: string;
}
const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  company_name: yup.string().required('Company name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  repeat_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  gdpr_consent: yup.bool().oneOf([true], "Regulation's consent is required"),
});

const SignUp = ({ token }: SignUpProps) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { mutateAsync: onSignUp, isSuccess } = useSignUp();
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  const initialValues: TenantInvitationData = {
    first_name: '',
    last_name: '',
    company_name: '',
    password: '',
    repeat_password: '',
    phone_number: { short: 'NO', phone: '' },
    gdpr_consent: false,
  };

  if (isSuccess) {
    return (
      <PublicResult
        status="success"
        title="Account has been created."
        subTitle="You can now log into your account."
        extra={
          <Button
            onClick={() => navigate('/signin/', { replace: true })}
            type="primary"
          >
            Back to login
          </Button>
        }
      />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) =>
        onSignUp({ values, token, formikHelpers })
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
        setFieldValue,
      }) =>
        openPrivacyPolicy ? (
          <AcceptPrivacyPolicy
            title="Privacy Policy"
            onAccept={() => {
              setFieldValue('gdpr_consent', true);
              setOpenPrivacyPolicy(false);
            }}
            onCancel={() => setOpenPrivacyPolicy(false)}
          />
        ) : (
          <Box width="320px">
            <Box mt="27px">
              <Title level={3} color={colors.text.header} textAlign="center">
                Create your account
              </Title>
            </Box>
            <Box justifyContent="center" mt="3px">
              <Title
                level={5}
                type="secondary"
                fontWeight="normal"
                textAlign="center"
              >
                Please enter your details.
              </Title>
            </Box>
            <Flexbox mt={status ? '38px' : '64px'} flexDirection="column">
              <Form layout="vertical">
                {status ? (
                  <Box mb="10px">
                    <Alert message={status} type="error" showIcon />
                  </Box>
                ) : null}
                <Form.Item
                  label="First Name"
                  validateStatus={
                    errors.first_name && touched.first_name
                      ? 'error'
                      : undefined
                  }
                  help={
                    errors.first_name && touched.first_name
                      ? errors.first_name
                      : undefined
                  }
                >
                  <Input
                    placeholder="Type your first name..."
                    value={values.first_name}
                    name="first_name"
                    onChange={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                  />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  validateStatus={
                    errors.last_name && touched.last_name ? 'error' : undefined
                  }
                  help={
                    errors.last_name && touched.last_name
                      ? errors.last_name
                      : undefined
                  }
                >
                  <Input
                    placeholder="Type your last name..."
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                  />
                </Form.Item>
                <Form.Item
                  label="Company Name"
                  validateStatus={
                    errors.company_name && touched.company_name
                      ? 'error'
                      : undefined
                  }
                  help={
                    errors.company_name && touched.company_name
                      ? errors.company_name
                      : undefined
                  }
                >
                  <Input
                    placeholder="Type company name..."
                    value={values.company_name}
                    onChange={handleChange('company_name')}
                    onBlur={handleBlur('company_name')}
                  />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  validateStatus={
                    errors.phone_number && touched.phone_number
                      ? 'error'
                      : undefined
                  }
                  help={
                    errors.phone_number && touched.phone_number
                      ? errors.phone_number
                      : undefined
                  }
                >
                  <PhoneInput
                    value={values.phone_number}
                    onChange={(value) => {
                      setFieldValue('phone_number', value);
                    }}
                    onBlur={handleBlur('phone_number')}
                  />
                </Form.Item>
                <Form.Item
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
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                </Form.Item>
                <Form.Item
                  label="Repeat Password"
                  validateStatus={
                    errors.repeat_password && touched.repeat_password
                      ? 'error'
                      : undefined
                  }
                  help={
                    errors.repeat_password && touched.repeat_password
                      ? errors.repeat_password
                      : undefined
                  }
                >
                  <Input
                    type="password"
                    placeholder="Repeat Password"
                    value={values.repeat_password}
                    onChange={handleChange('repeat_password')}
                    onBlur={handleBlur('repeat_password')}
                  />
                </Form.Item>
                <CheckboxFormItem
                  validateStatus={
                    errors.gdpr_consent && touched.gdpr_consent
                      ? 'error'
                      : undefined
                  }
                  help={
                    errors.gdpr_consent && touched.gdpr_consent
                      ? errors.gdpr_consent
                      : undefined
                  }
                >
                  <Checkbox
                    checked={values.gdpr_consent}
                    onChange={(e) => {
                      setFieldValue('gdpr_consent', false);
                      setOpenPrivacyPolicy(e.target.checked);
                    }}
                  >
                    I accept the regulations
                  </Checkbox>
                </CheckboxFormItem>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submitForm}
                    disabled={isSubmitting}
                    block
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={() => navigate('/signin/')} block>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Flexbox>
          </Box>
        )
      }
    </Formik>
  );
};

export default SignUp;
