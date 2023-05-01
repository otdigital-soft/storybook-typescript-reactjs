import { Text } from 'components/Typography';
import React from 'react';

interface HorizontalBarTitleProps {
  title: string;
  description: React.ReactNode;
}

const HorizontalBarTitle = ({
  title,
  description,
}: HorizontalBarTitleProps) => {
  return (
    <>
      <Text fontSize={12} lineHeight={1.25} color="blue.6" strong>
        {title}
      </Text>
      <br />
      <Text fontSize={8} lineHeight={1.875} color="blue.6" strong>
        {description}
      </Text>
    </>
  );
};

export default HorizontalBarTitle;
