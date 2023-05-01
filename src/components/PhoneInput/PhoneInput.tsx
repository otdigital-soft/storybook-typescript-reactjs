import CountryPhoneInput from 'antd-country-phone-input';
import styled from 'styled-components';

const PhoneInput = styled(CountryPhoneInput)`
  && {
    padding: 0;
  }

  &.antd-country-phone-input .ant-select {
    min-width: 90px;
  }
`;

export default PhoneInput;
