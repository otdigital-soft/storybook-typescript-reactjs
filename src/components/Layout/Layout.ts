import styled from 'styled-components';
import { Layout } from 'antd';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.blue[2]};
`;

export const Content = styled(Layout.Content)`
  background-color: ${({ theme }) => theme.colors.white};
`;
