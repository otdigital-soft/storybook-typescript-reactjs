import Divider from 'components/Divider';
import styled from 'styled-components';

export const UploadAvatarButton = styled.button`
  background: none;
  padding: 0;
  border: none;
  margin: 0;
  display: flex;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;

export const UploadAvatarDivider = styled(Divider)`
  height: 0;
  padding: 0;
  &.ant-divider-horizontal {
    margin: 4px 0;
  }
`;
