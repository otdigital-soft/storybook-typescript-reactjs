import Box, { Flexbox, BoxProps } from 'components/Box';
import styled from 'styled-components';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ReactComponent as UpdatedOutlined } from 'assets/icons/UpdatedOutlined.svg';

type CardProps = BoxProps & {
  active?: boolean;
};

export const Card = styled(Flexbox)<CardProps>`
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.green[6] : theme.colors.gray[5]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: column;
  position: relative;
`;

export const CardSection = styled(Flexbox)`
  padding: 16px 24px;
  width: 100%;
`;

export const CardHeader = styled(CardSection)`
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};

  .ant-skeleton-title {
    margin: 0;
  }
`;

export const CardHeaderColor = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 8px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ color }) => color};
`;

export const CardHeaderIcon = styled(Box)`
  line-height: 1em;
  color: ${({ theme }) => theme.colors.red[6]};
  font-size: 32px;
`;

export const CardHeaderArrowRight = styled(ArrowRightOutlined)<{
  color?: string;
}>`
  font-size: 24px;
  color: ${({ theme, color }) => (color ? color : theme.colors.purple[7])};
`;

export const CardFooter = styled(CardSection)`
  align-items: center;
  margin-top: auto;

  .ant-skeleton-title {
    margin: 0;
  }
`;

export const CardFooterUpdatedAtIcon = styled(UpdatedOutlined)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.purple[7]};
`;

export const CardBody = styled(CardSection)`
  flex-grow: 1;
  .ant-skeleton-paragraph {
    margin: 0;
  }
`;

export const TagContainer = styled.div`
  position: absolute;
  left: 24px;
  transform: translateY(-50%);
  z-index: 1;
`;
