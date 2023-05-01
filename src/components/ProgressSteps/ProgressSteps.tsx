import { Progress, StepsProps } from 'antd';
import Box, { Flexbox } from 'components/Box';
import React, { ReactNode } from 'react';
import { Steps } from './ProgressSteps.styled';
import { useTheme } from 'styled-components';

const ProgressSteps = ({
  children,
  percent,
  ...props
}: Pick<StepsProps, 'className' | 'onChange'> & {
  children?: ReactNode;
  percent: number;
  current: number;
}) => {
  const { colors } = useTheme();
  return (
    <Flexbox alignItems="center">
      <Box marginRight={35}>
        <Progress
          type="circle"
          percent={percent}
          width={80}
          strokeColor={colors.turquoise['1']}
        />
      </Box>
      <Steps {...props}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                icons: {
                  finish: 1 + index,
                  error: 1 + index,
                },
              })
            : child,
        )}
      </Steps>
    </Flexbox>
  );
};

export default ProgressSteps;
