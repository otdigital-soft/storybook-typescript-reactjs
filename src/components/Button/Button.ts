import { Button as AntdButton } from 'antd';
import styled from 'styled-components';
import { ButtonProps, ButtonType } from 'antd/lib/button/button';
import { ComponentType } from 'react';

import { fontWeight, FontWeightProps } from 'styled-system';

type ButtonExtraProps = {
  type?: ButtonType | 'success';
} & FontWeightProps;

const Button = styled(AntdButton)<ButtonExtraProps>`
  &.ant-btn-success {
    &:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.green[12]};
      border-color: ${({ theme }) => theme.colors.green[12]};
      color: ${({ theme }) => theme.colors.white};
    }
  }
  ${fontWeight}
` as ComponentType<Omit<ButtonProps, 'type'> & ButtonExtraProps>;

export default Button;
