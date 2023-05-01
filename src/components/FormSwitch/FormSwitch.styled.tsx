import { Form } from 'antd';
import { Text } from 'components/Typography';
import styled from 'styled-components';

export const FormSwitchItem = styled(Form.Item)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .ant-form-item-control {
    text-align: right;
  }
`;

export const FormSwitchLabel = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[7]};
  margin-right: 10px;
`;
