import { Col } from 'antd';
import { Flexbox } from 'components/Box';
import { ReactNode } from 'react';

interface DetailsColProps {
  span: number;
  title: string;
  children: ReactNode;
}

const DetailsCol = ({ title, children, span }: DetailsColProps) => {
  return (
    <Col span={span}>
      <Flexbox flexDirection="column">
        <strong>{title}</strong>
        {children}
      </Flexbox>
    </Col>
  );
};

export default DetailsCol;
