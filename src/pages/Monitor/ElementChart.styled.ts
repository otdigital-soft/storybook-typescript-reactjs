import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';

export const DownloadIcon = styled(DownloadOutlined)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.red[6]};
`;
