import { Steps as AntdSteps } from 'antd';
import styled from 'styled-components';

export const Steps = styled(AntdSteps)`
  &.ant-steps-horizontal:not(.ant-steps-label-vertical)
    .ant-steps-item-description {
    max-width: 100%;
  }
`;

export const Step = styled(AntdSteps.Step)`
  .ant-steps-item-icon {
    font-size: 14px;
  }

  .ant-steps-item-title {
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
  }

  .ant-steps-item-description {
    margin-top: 2px;
  }

  &.ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: ${({ theme }) => theme.colors.gray[6]};
  }

  &.ant-steps-item-wait,
  &.ant-steps-item-process {
    > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after {
      background-color: ${({ theme }) => theme.colors.blue[6]};
    }
  }

  &.ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: ${({ theme }) => theme.colors.gray[9]};
  }

  &.ant-steps-item-wait .ant-steps-item-icon {
    background-color: ${({ theme }) => theme.colors.blue[2]};
    border-color: ${({ theme }) => theme.colors.blue[2]};
  }

  &.ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${({ theme }) => theme.colors.turquoise[1]};
    border-color: ${({ theme }) => theme.colors.turquoise[1]};

    > .ant-steps-icon {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ onClick, disabled }) =>
    onClick && !disabled
      ? `
    cursor: pointer;
  `
      : null}
`;
