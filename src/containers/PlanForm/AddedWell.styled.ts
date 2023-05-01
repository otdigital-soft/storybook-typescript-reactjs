import Box, { Flexbox } from 'components/Box';
import FormInputNumber from 'components/FormInputNumber';
import styled, { css } from 'styled-components';

export const WellFormInput = styled(FormInputNumber)`
  .ant-form-item-label {
    padding-bottom: 2px;

    > label {
      font-size: 10px;
      color: ${({ theme }) => theme.colors.gray[7]};
    }
  }

  &.ant-form-item {
    margin-bottom: 0;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
  }
`;

export const Timeline = styled(Flexbox)<{
  isFirst: boolean;
  isLast: boolean;
  dotPosition: number;
}>`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.blue[6]};
  position: absolute;
  left: 4px;
  z-index: 0;
  height: calc(100% + 20px);
  ${({ isFirst, dotPosition }) =>
    isFirst
      ? css`
          top: ${dotPosition}px;
          height: calc(100% - ${dotPosition}px);
        `
      : undefined}
  ${({ isLast, dotPosition }) =>
    isLast ? `height: ${dotPosition}px` : undefined}
`;

export const TimelineDotContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9px;
  height: 21px;
  margin-right: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TimelineDotIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple[6]};
`;

export const WellContainer = styled(Flexbox)`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;
