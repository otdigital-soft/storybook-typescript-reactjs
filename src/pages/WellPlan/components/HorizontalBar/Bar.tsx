import { StyledBar } from './Bar.styled';
import * as React from 'react';
import { RenderFunction } from 'antd/lib/tooltip';
import { useTheme } from 'styled-components';
import { Tooltip } from 'antd';

interface BarProps {
  title: React.ReactNode | RenderFunction;
  width: string;
  backgroundColor: string;
}

const Bar = ({ width, title, backgroundColor }: BarProps) => {
  const { colors } = useTheme();
  return (
    <Tooltip title={title} placement="top" color={colors.white}>
      <StyledBar width={width} backgroundColor={backgroundColor} />
    </Tooltip>
  );
};

export default Bar;
