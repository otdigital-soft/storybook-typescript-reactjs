import { Flexbox } from 'components/Box';
import React from 'react';

interface HorizontalBarProps {
  children: React.ReactNode;
}

const HorizontalBar = ({ children }: HorizontalBarProps) => {
  return <Flexbox height={31}>{children}</Flexbox>;
};

export default HorizontalBar;
