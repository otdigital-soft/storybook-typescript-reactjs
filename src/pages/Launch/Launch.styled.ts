import styled from 'styled-components';
import { Select as AntdSelect } from 'antd';
import Box from 'components/Box';

export const Separator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
`;

export const Select = styled(AntdSelect)`
  width: 153px;
`;

export const ContentContainer = styled(Box).attrs({
  marginLeft: '24px',
  marginRight: '24px',
  marginTop: '20px',
  marginBottom: '30px',
})``;

export const SeparatorContainer = styled(Box).attrs({
  marginLeft: '24px',
  marginRight: '24px',
})``;
