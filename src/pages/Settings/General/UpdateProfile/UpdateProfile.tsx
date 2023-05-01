import { Alert, Button, Form, Input, Spin } from 'antd';
import { CountryPhoneInputValue, defaultAreas } from 'antd-country-phone-input';
import Box from 'components/Box';
import Center from 'components/Center';
import PhoneInput from 'components/PhoneInput';
import { Formik } from 'formik';
import useMe from 'hooks/useMe';
import useMeUpdate, { MeUpdateFormData } from './useMeUpdate';
import * as yup from 'yup';

const getPhoneNumberShortCode = (phoneCode: number) => {
  const shortcode = defaultAreas.find((item) => item.phoneCode === phoneCode);
  return shortcode?.short;
};

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  company_name: yup.string().required('Company name is required'),
});

const UpdateProfile = () => {
  const { mutateAsync: onUpdateProfile } = useMeUpdate();
  const { data: meData, isLoading: isMeDataLoating } = useMe();

  if (isMeDataLoating || !meData) {
    return (
      <Center>
        <Spin size="small" />
      </Center>
    );
  }

  const initialValues: MeUpdateFormData = {
    first_name: meData.first_name,
    last_name: meData.last_name,
    company_name: meData.company_name,
    phone_number: {
      short: meData.phone_number
        ? getPhoneNumberShortCode(meData.phone_number.country_code)
        : 'NO',
      phone: meData.phone_number?.number,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, formikHelpers) => {
        return onUpdateProfile({ values, formikHelpers });
      }}
    >
      {({
        values,
        touched,
        handleChange,
        handleBlur,
        errors,
        setFieldValue,
        status,
        isSubmitting,
        submitForm,
      }) => (
        <Form layout="vertical">
          {status ? (
            <Box mb="10px">
              <Alert message={status} type="error" showIcon />
            </Box>
          ) : undefined}
          <Form.Item
            label="First Name"
            validateStatus={
              errors.first_name && touched.first_name ? 'error' : undefined
            }
            help={
              errors.first_name && touched.first_name
                ? errors.first_name
                : undefined
            }
          >
            <Input
              placeholder="Enter first name..."
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
              placeholder="Enter last name..."
              value={values.last_name}
              name="last_name"
              onChange={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
            />
          </Form.Item>
          <Form.Item
            label="Company Name"
            validateStatus={
              errors.company_name && touched.company_name ? 'error' : undefined
            }
            help={
              errors.company_name && touched.company_name
                ? errors.company_name
                : undefined
            }
          >
            <Input
              placeholder="Enter company name..."
              value={values.company_name}
              name="company_name"
              onChange={handleChange('company_name')}
              onBlur={handleBlur('company_name')}
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            validateStatus={
              errors.phone_number && touched.phone_number ? 'error' : undefined
            }
            help={
              errors.phone_number && touched.phone_number
                ? errors.phone_number
                : undefined
            }
          >
            <PhoneInput
              value={values.phone_number as CountryPhoneInputValue}
              onChange={(value) => {
                setFieldValue('phone_number', value);
              }}
              onBlur={handleBlur('phone_number')}
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
              Change
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfile;
